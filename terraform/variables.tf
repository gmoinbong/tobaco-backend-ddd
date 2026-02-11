variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "environment" {
  description = "Environment name (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones_count" {
  description = "Number of AZs when availability_zones is not set"
  type        = number
  default     = 2
}

variable "availability_zones" {
  description = "List of AZ names. Default avoids ec2:DescribeAvailabilityZones. For other regions set e.g. [\"us-east-1a\", \"us-east-1b\"]"
  type        = list(string)
  default     = ["eu-central-1a", "eu-central-1b"]
}

variable "db_password" {
  description = "Master password for RDS Postgres"
  type        = string
  sensitive   = true
}
