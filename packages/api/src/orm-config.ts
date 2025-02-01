import env from './env'

export const config = {
  type: 'postgres',
  host: env.db.host,
  port: Number(env.db.port),
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  // eslint-disable-next-line
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  cli: {
    migrationsDir: env.app.dirs.migrationsDir,
  },
}
