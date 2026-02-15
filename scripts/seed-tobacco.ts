import 'dotenv/config';
import { Pool } from 'pg';

const TOTAL_RECORDS = 50_000;
const BATCH_SIZE = 2000;

const BRANDS = [
    'Dunhill', 'Marlboro', 'Camel', 'Lucky Strike', 'Winston',
    'Parliament', 'Kent', 'Benson', 'Pall Mall', 'Chesterfield',
];

const MODELS = [
    'Classic', 'Gold', 'Silver', 'Blue', 'Red',
    'Menthol', 'Light', 'Ultra', 'Smooth', 'Original',
];

const DESCRIPTIONS = [
    'Smooth and mild tobacco blend',
    'Rich full-bodied flavor',
    'Light and refreshing taste',
    'Classic American blend',
    'Premium quality tobacco',
];

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateBatch(offset: number, count: number) {
    const rows: Array<[string, string, string, number, number, number]> = [];
    for (let i = 0; i < count; i++) {
        rows.push([
            pick(BRANDS),
            pick(MODELS),
            pick(DESCRIPTIONS),
            Math.floor(Math.random() * 20) + 1, // nicotine_content 1-20
            Math.floor(Math.random() * 10) + 1, // throat_hit 1-10
            Math.floor(Math.random() * 5) + 1,   // required_experience 1-5
        ]);
    }
    return rows;
}

async function main() {
    const url = process.env.DATABASE_URL ?? process.env.DATABASE_WRITE_URL;
    if (!url) {
        throw new Error('DATABASE_URL or DATABASE_WRITE_URL required');
    }

    const pool = new Pool({ connectionString: url });

    console.log(`Seeding ${TOTAL_RECORDS} records in batches of ${BATCH_SIZE}...`);

    const start = Date.now();
    let inserted = 0;

    for (let offset = 0; offset < TOTAL_RECORDS; offset += BATCH_SIZE) {
        const count = Math.min(BATCH_SIZE, TOTAL_RECORDS - offset);
        const batch = generateBatch(offset, count);

        const params = batch.flat();
        const placeholders = batch
            .map((_, i) => {
                const b = i * 6;
                return `($${b + 1}, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5}, $${b + 6})`;
            })
            .join(', ');

        await pool.query(
            `INSERT INTO tobacco (brand, model, description, nicotine_content, throat_hit, required_experience)
             VALUES ${placeholders}`,
            params,
        );

        inserted += count;
        process.stdout.write(`\rInserted ${inserted}/${TOTAL_RECORDS}`);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nDone. ${TOTAL_RECORDS} records in ${elapsed}s`);

    await pool.end();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
