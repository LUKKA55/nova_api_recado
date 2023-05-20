import { DataSource } from 'typeorm/data-source';
import config from './ormconfig';

export const dataSource = new DataSource(config);
