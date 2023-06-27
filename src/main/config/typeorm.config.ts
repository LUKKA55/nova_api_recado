import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateTableRecado1684457998367 } from '../../app/shared/database/migrations/1684457998367-CreateTableRecado';
import { CreateTableUser1684457976753 } from '../../app/shared/database/migrations/1684457976753-CreateTableUser';
import { TableUser } from '../../app/shared/database/entities/TableUser';
import { TableRecado } from '../../app/shared/database/entities/TableRecado';
import { envs } from '../../app/envs/envs';
import { TestMigration1687181421064 } from '../../../tests/app/shared/migrations/1687181421064-TestMigration';

let config: DataSourceOptions = {
	type: 'postgres',
	url: envs.DATABASE_URL,
	synchronize: false,
	logging: true,
	entities: [TableUser, TableRecado],
	migrations: [CreateTableUser1684457976753, CreateTableRecado1684457998367],
	schema: 'public',
	ssl: {
		rejectUnauthorized: false,
	},
};

if (process.env.NODE_ENV === 'test') {
	config = {
		type: 'sqlite',
		database: './dbtest.sqlite',
		logging: false,
		synchronize: false,
		entities: [TableUser, TableRecado],
		migrations: [TestMigration1687181421064],
	};
}
export const dataSource = new DataSource(config);
export { config };
