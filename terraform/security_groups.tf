# RDS: allow Postgres from VPC; optionally from external CIDRs (e.g. your IP for migrations)
resource "aws_security_group" "db" {
  name   = "${var.environment}-db-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

# ALB: allow HTTP from internet
resource "aws_security_group" "alb" {
  name   = "${var.environment}-nest-alb-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

# ECS: allow traffic from ALB to container port 3000
resource "aws_security_group" "ecs" {
  name   = "${var.environment}-nest-ecs-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

# Bastion: SSM Session Manager only, no SSH ingress needed
resource "aws_security_group" "bastion" {
  name   = "${var.environment}-bastion-sg"
  vpc_id = module.vpc.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}
