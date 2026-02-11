output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs (for ALB, bastion, etc.)"
  value       = module.vpc.public_subnets
}

output "private_subnet_ids" {
  description = "Private subnet IDs (for ECS, RDS, etc.)"
  value       = module.vpc.private_subnets
}

output "nat_gateway_public_ips" {
  description = "NAT Gateway public IPs (outbound from private subnets)"
  value       = module.vpc.nat_public_ips
}

# App / ECS
output "ecr_repository_url" {
  description = "ECR repository URL for nest-app (push image here, then deploy)"
  value       = aws_ecr_repository.app.repository_url
}

output "alb_dns_name" {
  description = "ALB DNS name (HTTP endpoint for the app)"
  value       = aws_lb.alb.dns_name
}

output "alb_zone_id" {
  description = "ALB Route53 zone ID (for alias record if needed)"
  value       = aws_lb.alb.zone_id
}

# RDS (for local/dev connection or app env)
output "rds_endpoint" {
  description = "RDS instance endpoint (host only, no port)"
  value       = aws_db_instance.postgres.address
}

output "rds_port" {
  description = "RDS port"
  value       = aws_db_instance.postgres.port
}
