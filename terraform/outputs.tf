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
