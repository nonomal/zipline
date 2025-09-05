import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { join } from 'path';
import { log } from '@/lib/logger';

const logger = log('db').c('drizzle');

async function drizzleBootstrap(client: pg.Client) {
  await client.query('CREATE SCHEMA IF NOT EXISTS "drizzle"');

  await client.query(`
    CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
      id SERIAL PRIMARY KEY,
      hash text NOT NULL,
      created_at numeric
    )
  `);
}

async function migrateExistingPrisma(client: pg.Client) {
  // check if there is a _prisma_migrations table
  // if there is then we continue with prisma -> drizzle.

  const resPrisma = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = '_prisma_migrations'
    )
  `);

  const existsPrisma = resPrisma.rows[0]?.exists;
  if (!existsPrisma) {
    logger.debug('no existing prisma migrations found, skipping prisma -> drizzle migration step');
    return;
  }

  logger.debug('existing prisma migrations found, migrating to drizzle');

  // at this point, there should already be a __drizzle_migrations table
  // now looking for the first migration so we can manually insert it if needed.

  const firstMigration = 1756926875085;

  const res = await client.query(
    `
      SELECT COUNT(*) FROM drizzle.__drizzle_migrations WHERE created_at = $1
    `,
    [firstMigration],
  );

  const count = parseInt(res.rows[0]?.count || '0', 10);

  logger.debug('finding existing first migrations', { count });

  if (count === 0) {
    logger.debug('inserting first migration manually');

    await client.query(
      `
        INSERT INTO drizzle.__drizzle_migrations (created_at, hash)
        VALUES ($1, $2)
      `,
      [firstMigration, 'manual'],
    );
  }
}

export async function runDrizzleMigrations() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const db = drizzle(client);

  // ensure drizzle migrations table exists
  await drizzleBootstrap(client);

  // migrate from prisma to drizzle
  await migrateExistingPrisma(client);

  // now we can run migrations with drizzle
  await migrate(db, {
    migrationsFolder: join(process.cwd(), 'src', 'drizzle'),
  });

  logger.info('migrations complete');
}
