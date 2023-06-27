import { RecadoRepository } from '../recado.repository';
import { IRecado } from '../../../models/interfaces/recado.interface';
import { CacheRepository } from '../../cache/cache';
import { Recado } from '../../../models/recado.class';

export class RecadoService {
	constructor(public database: RecadoRepository) {
		this.database = database;
	}

	async insertRecado_execute({ title, text, user_id }: IRecado) {
		const cacheRepository = new CacheRepository();
		const createRecado = await this.database.addRecado({
			title,
			text,
			user_id,
		});
		await cacheRepository.del(`all-recado-${user_id}`);
		await cacheRepository.del('all-recado');
		await cacheRepository.del(`all-recado-true-${user_id}`);

		return createRecado;
	}

	async getAllRecado_execute() {
		const cacheRepository = new CacheRepository();
		const cacheAllRecado = await cacheRepository.get('all-recado');
		if (cacheAllRecado) {
			return cacheAllRecado as Recado[];
		}
		const allRecado = await this.database.findAllRecado();
		await cacheRepository.set('all-recado', allRecado);
		return allRecado;
	}

	async getAllRecadoByUser_execute(user_id: string) {
		const cacheRepository = new CacheRepository();
		const cacheRecadoByUser = await cacheRepository.get(
			`all-recado-${user_id}`
		);
		if (cacheRecadoByUser) {
			return cacheRecadoByUser as Recado[];
		}
		const result = await this.database.findRecadoByUser(user_id);
		await cacheRepository.set(`all-recado-${user_id}`, result);
		return result;
	}

	async getAllRecadoById_execute(recado_id: string) {
		const cacheRepository = new CacheRepository();
		const cacheRecadoById = await cacheRepository.get(`recado-${recado_id}`);
		if (cacheRecadoById) {
			return cacheRecadoById as Recado;
		}
		const result = await this.database.findOneRecadoById(recado_id);
		await cacheRepository.set(`recado-${recado_id}`, result as Recado);
		return result;
	}

	async updateRecado_execute({ id, title, text }: IRecado, user_id: string) {
		const cacheRepository = new CacheRepository();
		const result = await this.database.updateRecado({
			id,
			title,
			text,
		} as IRecado);
		await cacheRepository.set(`recado-${id}`, result as Recado);
		await cacheRepository.del('all-recado');
		await cacheRepository.del(`all-recado-${user_id}`);
		await cacheRepository.del(`all-recado-true-${user_id}`);

		return result;
	}

	async deleteOneRecado_execute(recado_id: string, user_id: string) {
		const cacheRepository = new CacheRepository();
		const result = await this.database.deleteRecado(recado_id);
		await cacheRepository.del(`recado-${recado_id}`);
		await cacheRepository.del('all-recado');
		await cacheRepository.del(`all-recado-${user_id}`);
		await cacheRepository.del(`all-recado-true-${user_id}`);
		await cacheRepository.del(`all-recado-false-${user_id}`);

		return result;
	}

	async arquivaRecado_execute(recado_id: string, user_id: string) {
		const cacheRepository = new CacheRepository();
		const result = await this.database.arquivaRecado(recado_id);
		await cacheRepository.set(`recado-${recado_id}`, result as Recado);
		await cacheRepository.del('all-recado');
		await cacheRepository.del(`all-recado-${user_id}`);
		await cacheRepository.del(`all-recado-true-${user_id}`);
		await cacheRepository.del(`all-recado-false-${user_id}`);

		return result;
	}

	async desarquivarRecado_execute(recado_id: string, user_id: string) {
		const cacheRepository = new CacheRepository();
		const result = await this.database.desarquivaRecado(recado_id);
		await cacheRepository.set(`recado-${recado_id}`, result as Recado);
		await cacheRepository.del('all-recado');
		await cacheRepository.del(`all-recado-${user_id}`);
		await cacheRepository.del(`all-recado-true-${user_id}`);
		await cacheRepository.del(`all-recado-false-${user_id}`);

		return result;
	}

	async getAllRecadoByUserStatusTrue_execute(user_id: string) {
		const cacheRepository = new CacheRepository();
		const cacheRecadoByUserTrue = await cacheRepository.get(
			`all-recado-true-${user_id}`
		);
		if (cacheRecadoByUserTrue) {
			return cacheRecadoByUserTrue as Recado[];
		}
		const result = await this.database.findRecadoStatusTrueByUser(user_id);
		await cacheRepository.set(`all-recado-true-${user_id}`, result);
		return result;
	}

	async getAllRecadoByUserStatusFalse_execute(user_id: string) {
		const cacheRepository = new CacheRepository();
		const cacheRecadoByUserFalse = await cacheRepository.get(
			`all-recado-false-${user_id}`
		);
		if (cacheRecadoByUserFalse) {
			return cacheRecadoByUserFalse as Recado[];
		}
		const result = await this.database.findRecadoStatusFalseByUser(user_id);
		await cacheRepository.set(`all-recado-false-${user_id}`, result);
		return result;
	}

	async getAllRecadoFilterTrueUser_execute(user_id: string, title: string) {
		const result = await this.database.searchRecadoTrueByUser(user_id, title);
		return result;
	}

	async getAllRecadoFilterFalseUser_execute(user_id: string, title: string) {
		const result = await this.database.searchRecadoFalseByUser(user_id, title);
		return result;
	}
}
