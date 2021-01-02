// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `env/${(process.env.NODE_ENV || 'local').toLowerCase()}.env`,
});

module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: (process.env.NODE_ENV || 'local').toLowerCase() !== 'production',
  migrationsRun: false,
  entities: [process.env.ENTITIES_PATH],
  migrations: ['dist/database/migrations/**/*.js'],
  subscribers: ['dist/database/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'database/migrations',
    subscribersDir: 'database/subscriber',
  },
};
