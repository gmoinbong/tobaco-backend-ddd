# Terraform: VPC + ECR + RDS + ECS Fargate for tobaco-backend

VPC (2 public + 2 private subnets, IGW, one NAT), ECR repo, RDS Postgres, ECS Fargate service за ALB.

## Prerequisites

- Terraform >= 1.0
- AWS CLI: `aws configure` или env `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`. Для профиля: `export AWS_PROFILE=...` перед Terraform.
- IAM: права на VPC, EC2 (SG), ECR, RDS, ECS, ALB, IAM roles. Для минимальных прав приложен `iam-policy-vpc.json`; для полного деплоя нужны дополнительные права (ECR, RDS, ECS, Elastic Load Balancing, CloudWatch Logs).

## Usage

**Важно:** команды выполнять из каталога `terraform/`.

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # отредактировать, добавить db_password
terraform init
terraform plan
terraform apply
```

Пароль БД обязателен: в `terraform.tfvars` задать `db_password = "..."` или передать через `TF_VAR_db_password=...` (в tfvars не коммитить).

После apply: вывестится `ecr_repository_url` (например `191894217743.dkr.ecr.eu-central-1.amazonaws.com/nest-app`). Собрать образ, залогиниться в ECR, сделать push, затем обновить ECS service (или перезапустить задачи), чтобы подтянуть новый образ.

## Outputs

- `vpc_id`, `public_subnet_ids`, `private_subnet_ids`, `nat_gateway_public_ips`
- `ecr_repository_url` — URL репозитория для push образа nest-app
- `alb_dns_name` — HTTP-адрес приложения (ALB)
- `rds_endpoint`, `rds_port` — хост и порт Postgres (доступны из VPC)

## Cost note

Один NAT Gateway (`single_nat_gateway = true`) для снижения затрат. RDS db.t3.micro и Fargate 0.25 vCPU / 512 MiB — минимальные тарифы; для HA можно включить несколько NAT и при необходимости Multi-AZ для RDS.
