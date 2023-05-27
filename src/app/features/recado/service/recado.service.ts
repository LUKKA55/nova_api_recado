import { RecadoRepository } from '../recado.repository';
import { IRecado } from '../../../models/interfaces/recado.interface';

export class RecadoService {
	constructor(public database: RecadoRepository) {
		this.database = database;
	}

	insertRecado_execute({ title, text, user_id }: IRecado) {
		return this.database.addRecado({ title, text, user_id });
	}

	getAllRecado_execute() {
		return this.database.findAllRecado();
	}
	getAllRecadoByUser_execute(user_id: string) {
		const result = this.database.findRecadoByUser(user_id);
		return result;
	}
	getAllRecadoById_execute(recado_id: string) {
		const result = this.database.findOneRecadoById(recado_id);
		return result;
	}
	updateRecado_execute({ id, title, text }: IRecado) {
		const result = this.database.updateRecado({ id, title, text } as IRecado);
		return result;
	}

	deleteOneRecado_execute(recado_id: string) {
		const result = this.database.deleteRecado(recado_id);
		return result;
	}
	arquivaRecado_execute(recado_id: string) {
		const result = this.database.arquivaRecado(recado_id);
		return result;
	}
	desarquivarRecado_execute(recado_id: string) {
		const result = this.database.desarquivaRecado(recado_id);
		return result;
	}
	getAllRecadoByUserStatusTrue_execute(user_id: string) {
		const result = this.database.findRecadoStatusTrueByUser(user_id);
		return result;
	}
	getAllRecadoByUserStatusFalse_execute(user_id: string) {
		const result = this.database.findRecadoStatusFalseByUser(user_id);
		return result;
	}
	getAllRecadoFilterTrueUser_execute(user_id: string, title: string) {
		const result = this.database.searchRecadoTrueByUser(user_id, title);
		return result;
	}
	getAllRecadoFilterFalseUser_execute(user_id: string, title: string) {
		const result = this.database.searchRecadoFalseByUser(user_id, title);
		return result;
	}
}
