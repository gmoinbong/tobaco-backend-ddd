# Terraform: VPC for tobaco-backend

VPC with 2 public + 2 private subnets, Internet Gateway, one NAT Gateway (private subnets can reach internet for npm, etc.).

## Prerequisites

- Terraform >= 1.0
- AWS CLI: `aws configure` or env vars `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`. If you use named profiles: `export AWS_PROFILE=your-profile-name` before running Terraform.
- IAM: пользователю (например `cli-user`) нужны права на создание VPC, подсетей, IGW, NAT и т.д. В консоли AWS: IAM → Users → cli-user → Add permissions → Create inline policy (или Attach policy). Для минимальных прав приложен `iam-policy-vpc.json`. Либо прикрепи managed policy **AmazonVPCFullAccess** (проще, но шире по правам).

## Usage

**Важно:** все команды Terraform нужно выполнять из каталога `terraform/`, а не из корня проекта. Иначе будет "No configuration files".

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

Optional: copy `terraform.tfvars.example` to `terraform.tfvars` and adjust.

## Outputs

- `vpc_id` — for ECS, RDS, ALB
- `public_subnet_ids` — for ALB, bastion
- `private_subnet_ids` — for ECS tasks, RDS
- `nat_gateway_public_ips` — outbound IP of NAT (e.g. for allowlists)

## Cost note

One NAT Gateway is used (`single_nat_gateway = true`) to reduce cost. For HA across AZs set `single_nat_gateway = false` in `vpc.tf`.
