import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/modules/shared/core/infrastructure/database/schema/index.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || process.env.DATABASE_WRITE_URL || '',
    },
});
