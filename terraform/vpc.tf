# VPC with 2 public + 2 private subnets, IGW, single NAT Gateway for private outbound (npm, etc.)
locals {
  azs = length(var.availability_zones) > 0 ? var.availability_zones : slice(data.aws_availability_zones.available[0].names, 0, var.availability_zones_count)
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.environment}-tobaco-vpc"
  cidr = var.vpc_cidr

  azs             = local.azs
  public_subnets  = [for k in range(length(local.azs)) : cidrsubnet(var.vpc_cidr, 8, k)]
  private_subnets = [for k in range(length(local.azs)) : cidrsubnet(var.vpc_cidr, 8, k + 16)]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }

  tags = {
    Environment = var.environment
    Project     = "tobaco-backend"
  }
}

data "aws_availability_zones" "available" {
  count  = length(var.availability_zones) > 0 ? 0 : 1
  state  = "available"
}
