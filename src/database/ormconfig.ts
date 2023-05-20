import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { CreateTableRecado1684457998367 } from './migrations/1684457998367-CreateTableRecado';
import { CreateTableUser1684457976753 } from './migrations/1684457976753-CreateTableUser';
import { TableUser } from './entities/TableUser';
import { TableRecado } from './entities/TableRecado';

const config: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
	entities: [TableUser, TableRecado],
	migrations: [CreateTableRecado1684457998367, CreateTableUser1684457976753],
	ssl: {
		rejectUnauthorized: false,
	},
};

export default config;