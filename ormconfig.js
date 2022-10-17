module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || "aslan",
  password: process.env.DATABASE_PASSWORD || "Aslan2001!!",
  database: process.env.DATABASE_NAME || "comm",
  entities: ["dist/**/*.entity{ .ts,.js}"],
  migrations: ["dist/src/migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
  bigNumberStrings: false,
  cli: {
    migrationsDir: "src/migrations",
  }
}
