module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/**/migration/*.js'],
  cli: { migrationDir: 'migration' },
};
