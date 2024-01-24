import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;



// {
//   type: 'postgres',
//     host: process.env.POSTGRES_HOST,
//   port: parseInt(<string>process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   autoLoadEntities: true,
//   synchronize: true,
//   entities: ['/../dist/**/*.entity.js'],
//   // migrations: ['dist/src/db/migrations/*.js'],
//   // cli: {
//   //   migrationsDir: 'src/db/migrations'
//   // },
// }

// commands
// npm run migration:generate --db/migrations/NewMigration
//npm run migration:run
