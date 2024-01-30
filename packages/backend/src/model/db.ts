import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export interface Database {

}

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL
    })
})

export const db = new Kysely<Database>({
    dialect
});