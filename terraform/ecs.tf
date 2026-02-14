# ECS Fargate cluster, task definition and service
resource "aws_ecs_cluster" "app" {
  name = "${var.environment}-nest-cluster"

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "nest-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "nest-app"
    image     = "${aws_ecr_repository.app.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
    # App expects DATABASE_WRITE_URL (and optional DATABASE_READ_REPLICA_URLS), not DB_HOST/DB_PORT/...
    # If db_password contains @ # : / etc., use a password without them or URL-encode manually
    environment = [
      { name = "DATABASE_WRITE_URL", value = "postgresql://${aws_db_instance.postgres.username}:${var.db_password}@${aws_db_instance.postgres.address}:${aws_db_instance.postgres.port}/${aws_db_instance.postgres.db_name}?sslmode=require" },
      { name = "DATABASE_READ_REPLICA_URLS", value = "" }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])

  execution_role_arn = aws_iam_role.ecs_execution.arn
  task_role_arn      = aws_iam_role.ecs_task.arn

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

resource "aws_ecs_service" "app" {
  name            = "nest-service"
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn
    container_name   = "nest-app"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.http]
}

# CloudWatch log group for ECS tasks
resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/${var.environment}-nest-app"
  retention_in_days = 7

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

# IAM: ECS task execution (pull image, write logs)
resource "aws_iam_role" "ecs_execution" {
  name = "${var.environment}-nest-ecs-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# IAM: ECS task role (for app, e.g. AWS SDK if needed later)
resource "aws_iam_role" "ecs_task" {
  name = "${var.environment}-nest-ecs-task"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}
