import { Request, Response } from 'express';
import { RecadoService } from '../service/recado.service';
import { IRecado } from '../../../models/interfaces/recado.interface';

export class RecadoController {
	constructor(public service: RecadoService) {
		this.service = service;
	}

	async insertRecado_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const { title, text } = req.body;
		const response = await this.service.insertRecado_execute({
			title,
			text,
			user_id,
		} as IRecado);

		if (!response) {
			return res.status(404).json({ message: 'Recado não cadastrado.' });
		}
		return res.status(200).json({ ok: true, data: response });
	}

	async getAllRecado_handle(req: Request, res: Response) {
		const response = await this.service.getAllRecado_execute();
		if (!response) {
			return res.status(200).json({ message: 'Sem recados.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoByUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = await this.service.getAllRecadoByUser_execute(
			user_id as string
		);
		if (!response) {
			return res.status(200).json({ message: 'Usuário sem recados.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoById_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = await this.service.getAllRecadoById_execute(
			recado_id as string
		);
		if (!response) {
			return res.status(404).json({ message: 'Este recado não existe.' });
		}
		return res.status(200).json({ data: response });
	}

	async deleteOneRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = await this.service.deleteOneRecado_execute(recado_id);
		if (!response) {
			return res.status(404).json({ message: 'Recado não existe.' });
		}
		return res.status(200).json({ message: 'Deletado com sucesso.', response });
	}

	async updateRecado_handle(req: Request, res: Response) {
		const id = req.params.recado_id;
		const { title, text } = req.body;
		const response = await this.service.updateRecado_execute({
			id,
			title,
			text,
		} as IRecado);
		if (!response) {
			return res.status(404).json({ message: 'Recado não existe.' });
		}
		return res.status(200).json({ update: 'sucesso', data: response });
	}

	async arquivaRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = await this.service.arquivaRecado_execute(recado_id);
		if (!response) {
			return res.status(404).json({ message: 'Recado não existe.' });
		}
		return res.status(200).json({ message: 'Arquivado', data: response });
	}

	async desarquivarRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = await this.service.desarquivarRecado_execute(recado_id);
		if (!response) {
			return res.status(404).json({ message: 'Recado não existe.' });
		}
		return res.status(200).json({ message: 'Desarquivado', data: response });
	}

	async getAllRecadoByUserStatusTrue_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = await this.service.getAllRecadoByUserStatusTrue_execute(
			user_id as string
		);
		if (!response.length) {
			return res.status(200).json({ message: 'Usuário sem recados ativos.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoByUserStatusFalse_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = await this.service.getAllRecadoByUserStatusFalse_execute(
			user_id as string
		);
		if (!response.length) {
			return res
				.status(200)
				.json({ message: 'Usuário sem recados arquivados.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoFilterTrueUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const title = req.query.title;
		const response = await this.service.getAllRecadoFilterTrueUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).json({ message: 'Nenhum recado encontrado.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoFilterFalseUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const title = req.query.title;
		const response = await this.service.getAllRecadoFilterFalseUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).json({ message: 'Nenhum recado encontrado.' });
		}
		return res.status(200).json({ data: response });
	}
}
