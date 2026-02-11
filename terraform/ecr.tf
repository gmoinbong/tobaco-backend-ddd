# ECR repository for Nest app image (push image, then deploy ECS)
resource "aws_ecr_repository" "app" {
  name = "nest-app"

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}
