import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL || process.env.DATABASE_WRITE_URL || '';
const sslRequired = url.includes('sslmode=require') || url.includes('ssl=true');

// drizzle-kit does not support ssl option in URL mode ({ url }),
// so we parse the URL and use explicit credentials when SSL is needed
const parsed = sslRequired ? new URL(url) : null;

export default defineConfig({
    schema: './libs/shared/src/core/infrastructure/database/schema/index.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: parsed
        ? {
              host: parsed.hostname,
              port: Number(parsed.port) || 5432,
              user: decodeURIComponent(parsed.username),
              password: decodeURIComponent(parsed.password),
              database: parsed.pathname.slice(1),
              ssl: 'require',
          }
        : { url },
});
