# Database Migrations

## Setup

1. Install drizzle-kit:
```bash
npm install -D drizzle-kit
```

2. Create database (if it doesn't exist):
```bash
# Connect to default 'postgres' database and create 'tobacco' database
psql -U postgres -c "CREATE DATABASE tobacco;"

# Or if you have a different superuser
psql -U your_user -d postgres -c "CREATE DATABASE tobacco;"
```

3. Apply migration:
```bash
# Make sure DATABASE_URL points to the 'tobacco' database
# Example: postgresql://user:password@localhost:5432/tobacco

# Using psql
psql $DATABASE_URL -f migrations/0000_create_tobacco_table.sql

# Or using drizzle-kit push (after database is created)
npm run db:push
```

## Migration Scripts

- `db:generate` - Generate new migration from schema changes
- `db:migrate` - Apply migrations
- `db:push` - Push schema changes directly to database (dev only)
- `db:studio` - Open Drizzle Studio to browse database

## Troubleshooting

If you get "database does not exist" error:
1. First create the database (see step 2 above)
2. Make sure your `DATABASE_URL` environment variable points to the correct database
3. Example DATABASE_URL: `postgresql://user:password@localhost:5432/tobacco`
