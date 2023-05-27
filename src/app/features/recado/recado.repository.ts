import { v4 } from 'uuid';
import { IRecado } from '../../models/interfaces/recado.interface';
import { TableRecado } from '../../shared/database/entities/TableRecado';
import { pgHelper } from '../../../main/pg-helper';
import newDate from '../../utils/newDate';
import { Recado } from '../../models/recado.class';
import { DeleteResult, Like } from 'typeorm';
import { TableUser } from '../../shared/database/entities/TableUser';

export class RecadoRepository {
	async addRecado({ title, text, user_id }: IRecado): Promise<IRecado | null> {
		const findUser = await pgHelper.client
			.getRepository(TableUser)
			.findOne({ where: { uid: user_id } });

		if (findUser === null) {
			return null;
		}
		const createRecado = pgHelper.client.getRepository(TableRecado).create({
			title: title,
			text: text,
			user_id: user_id,
			uid: v4(),
			status: true,
			created_at: newDate(),
			updated_at: newDate(),
		});

		const save = await pgHelper.client
			.getRepository(TableRecado)
			.save(createRecado);
		const compileRecado = new Recado(
			save.title,
			save.text,
			save.user_id,
			save.status,
			save.uid,
			save.created_at,
			save.updated_at
		);
		return compileRecado;
	}

	async findAllRecado() {
		const recadoListAll = await pgHelper.client
			.getRepository(TableRecado)
			.find();

		const compileRecado = recadoListAll.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}

	async findRecadoByUser(user_id: string): Promise<IRecado[]> {
		const recadoList = await pgHelper.client
			.getRepository(TableRecado)
			.find({ where: { user_id: user_id } });

		const compileRecado = recadoList.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}

	async findOneRecadoById(recado_id: string): Promise<IRecado | null> {
		const recado = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: recado_id } });

		if (recado === null) {
			return null;
		}
		const compileRecado = new Recado(
			recado.title,
			recado.text,
			recado.user_id,
			recado.status,
			recado.uid,
			recado.created_at,
			recado.updated_at
		);
		return compileRecado;
	}

	async updateRecado({ id, title, text }: IRecado): Promise<IRecado | null> {
		const findRecado = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecado === null) {
			return null;
		}
		await pgHelper.client.getRepository(TableRecado).update(
			{ uid: id },
			{
				title: title ? title : undefined,
				text: text ? text : undefined,
				updated_at: newDate(),
			}
		);
		const findRecadoUpdate = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecadoUpdate === null) {
			return null;
		}
		const compileRecado = new Recado(
			findRecadoUpdate.title,
			findRecadoUpdate.text,
			findRecadoUpdate.user_id,
			findRecadoUpdate.status,
			findRecadoUpdate.uid,
			findRecadoUpdate.created_at,
			findRecadoUpdate.updated_at
		);
		return compileRecado;
	}

	async deleteRecado(id: string): Promise<null | DeleteResult> {
		const findRecado = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecado === null) {
			return null;
		}
		const deleteRecado = await pgHelper.client
			.getRepository(TableRecado)
			.delete({ uid: id });
		return deleteRecado;
	}

	async arquivaRecado(id: string): Promise<null | IRecado> {
		const findRecado = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecado === null) {
			return null;
		}
		await pgHelper.client.getRepository(TableRecado).update(
			{ uid: id },
			{
				status: false,
			}
		);
		const findRecadoUpdate = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecadoUpdate === null) {
			return null;
		}
		const compileRecado = new Recado(
			findRecadoUpdate.title,
			findRecadoUpdate.text,
			findRecadoUpdate.user_id,
			findRecadoUpdate.status,
			findRecadoUpdate.uid,
			findRecadoUpdate.created_at,
			findRecadoUpdate.updated_at
		);
		return compileRecado;
	}

	async desarquivaRecado(id: string): Promise<null | IRecado> {
		const findRecado = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecado === null) {
			return null;
		}
		await pgHelper.client.getRepository(TableRecado).update(
			{ uid: id },
			{
				status: true,
			}
		);
		const findRecadoUpdate = await pgHelper.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id } });
		if (findRecadoUpdate === null) {
			return null;
		}
		const compileRecado = new Recado(
			findRecadoUpdate.title,
			findRecadoUpdate.text,
			findRecadoUpdate.user_id,
			findRecadoUpdate.status,
			findRecadoUpdate.uid,
			findRecadoUpdate.created_at,
			findRecadoUpdate.updated_at
		);
		return compileRecado;
	}

	async findRecadoStatusTrueByUser(id: string): Promise<IRecado[]> {
		const findRecadoByUser = await pgHelper.client
			.getRepository(TableRecado)
			.find({ where: { user_id: id, status: true } });

		const compileRecado = findRecadoByUser.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}

	async findRecadoStatusFalseByUser(id: string): Promise<IRecado[]> {
		const findRecadoByUser = await pgHelper.client
			.getRepository(TableRecado)
			.find({ where: { user_id: id, status: false } });

		const compileRecado = findRecadoByUser.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}

	async searchRecadoTrueByUser(id: string, title: string) {
		const searchRecadoTrue = await pgHelper.client
			.getRepository(TableRecado)
			.find({
				where: { user_id: id, title: Like(`%${title}%`), status: true },
			});
		const compileRecado = searchRecadoTrue.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}

	async searchRecadoFalseByUser(id: string, title: string) {
		const searchRecadoFalse = await pgHelper.client
			.getRepository(TableRecado)
			.find({
				where: { user_id: id, title: Like(`%${title}%`), status: false },
			});
		const compileRecado = searchRecadoFalse.map((recado) => {
			return new Recado(
				recado.title,
				recado.text,
				recado.user_id,
				recado.status,
				recado.uid,
				recado.created_at,
				recado.updated_at
			);
		});
		return compileRecado;
	}
}

export const recado_repository = new RecadoRepository();
