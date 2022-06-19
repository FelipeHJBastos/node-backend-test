import 'dotenv/config'
import Sequelize from 'sequelize';

const credentials = {
  pgDatabase: process.env.PG_DB,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
  pgHost: process.env.PG_HOST,
  pgPort: process.env.PG_PORT
}

const sequelize = new Sequelize(credentials.pgDatabase, credentials.pgUser, credentials.pgPassword, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  host: credentials.pgHost,
  port: credentials.pgPort,
});

export { sequelize };