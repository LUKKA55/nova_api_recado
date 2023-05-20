import { pgHelper } from '../pg-helper';

export class RecadoRepository {
	public manager = pgHelper.client.manager;
}
