import { IRecado } from '../interfaces/recado.interface';
import { dbMock } from '../models/dbMock.class';
import { Recado } from '../models/recado.class';

export class RecadoService {
	constructor(public database: dbMock) {
		this.database = database;
	}

	insertRecado_execute({ title, text, user_id }: IRecado) {
		const newRecado = new Recado(title, text, user_id);
		this.database.addRecado(newRecado);
		return newRecado;
	}

	getAllRecado_execute() {
		return this.database.recadoAll;
	}
	getAllRecadoByUser_execute(user_id: string) {
		const result = this.database.findRecadoByUser(user_id);
		return result;
	}
	getAllRecadoById_execute(recado_id: string) {
		const result = this.database.findOneRecadoById(recado_id);
		return result;
	}
	updateRecado_execute(data: { recado_id: string; title: any; text: any }) {
		const result = this.database.updateRecado(data);
		return result;
	}

	deleteOneRecado_execute(recado_id: string) {
		const result = this.database.deleteOneRecado(recado_id);
		return result;
	}
	arquivaRecado_execute(recado_id: string) {
		const result = this.database.arquivaRecado(recado_id);
		return result;
	}
	desarquivarRecado_execute(recado_id: string) {
		const result = this.database.desarquivarRecado(recado_id);
		return result;
	}
	getAllRecadoByUserStatusTrue_execute(user_id: string) {
		const result = this.database.findRecadoByUserStatusTrue(user_id);
		return result;
	}
	getAllRecadoByUserStatusFalse_execute(user_id: string) {
		const result = this.database.findRecadoByUserStatusFalse(user_id);
		return result;
	}
	getAllRecadoFilterTrueUser_execute(user_id: string, title: string) {
		const result = this.database.recadoFilterTrueUser(user_id, title);
		return result;
	}
	getAllRecadoFilterFalseUser_execute(user_id: string, title: string) {
		const result = this.database.recadoFilterFalseUser(user_id, title);
		return result;
	}
}
