# RDS Postgres in private subnets for ECS app
resource "aws_db_subnet_group" "default" {
  name       = "${var.environment}-app-db-subnets"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

resource "aws_db_instance" "postgres" {
  identifier     = "${var.environment}-nest-postgres"
  engine         = "postgres"
  engine_version = "15"
  instance_class = "db.t3.micro"
  allocated_storage = 20

  db_name  = "nestdb"
  username = "nestadmin" # "admin" is reserved by Postgres on RDS
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.default.name
  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = false

  skip_final_snapshot       = true
  deletion_protection       = false

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}
