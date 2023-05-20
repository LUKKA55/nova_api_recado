import { RecadoEntity } from '../database/entity/recado.entity';
import { pgHelper } from '../pg-helper';

export class RecadoRepository {
	public manager = pgHelper.client.manager;
}
