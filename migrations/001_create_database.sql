-- Create database if it doesn't exist
-- Run this script connected to 'postgres' database (default database)
-- psql -U postgres -f migrations/001_create_database.sql

SELECT 'CREATE DATABASE tobacco'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tobacco')\gexec
