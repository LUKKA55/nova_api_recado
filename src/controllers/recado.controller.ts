import { Request, Response } from 'express';
import { RecadoService } from '../services/recado.service';
import { IRecado } from '../interfaces/recado.interface';
import { ParsedQs } from 'qs';

export class RecadoController {
	constructor(public service: RecadoService) {
		this.service = service;
	}
	insertRecado_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const { title, text } = req.body;
		const response = this.service.insertRecado_execute({
			title,
			text,
			user_id,
		} as IRecado);

		if (response) {
			return res.status(200).json({ ok: true, data: response });
		}

		return res.status(404).send('Recado não cadastrada.');
	}
	getAllRecado_handle(req: Request, res: Response) {
		const response = this.service.getAllRecado_execute();
		if (!response.length) {
			return res.status(200).send('Sem recados.');
		}
		return res.status(200).json({ data: response });
	}
	getAllRecadoByUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = this.service.getAllRecadoByUser_execute(user_id as string);
		if (!response.length) {
			return res.status(200).send('Usuário sem recados.');
		}
		return res.status(200).json({ data: response });
	}
	getAllRecadoById_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = this.service.getAllRecadoById_execute(recado_id as string);
		if (!response) {
			return res.status(404).send('Este recado não existe.');
		}
		return res.status(200).json({ data: response });
	}
	deleteOneRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = this.service.deleteOneRecado_execute(recado_id);
		if (!response) {
			return res.status(404).send('Recado não existe.');
		}
		return res.status(200).json({ message: 'Deletado com sucesso.', response });
	}
	updateRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const { title, text } = req.body;
		const response = this.service.updateRecado_execute({
			recado_id,
			title,
			text,
		});
		if (!response) {
			return res.status(404).send('Recado não existe.');
		}
		return res
			.status(200)
			.json({ update: 'sucesso', data: response.allRecados });
	}
	arquivaRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = this.service.arquivaRecado_execute(recado_id);
		if (!response) {
			return res.status(404).send('Recado não existe.');
		}
		return res.status(200).json({ message: 'Arquivado', data: response });
	}
	desarquivarRecado_handle(req: Request, res: Response) {
		const recado_id = req.params.recado_id;
		const response = this.service.desarquivarRecado_execute(recado_id);
		if (!response) {
			return res.status(404).send('Recado não existe.');
		}
		return res.status(200).json({ message: 'Desarquivado', data: response });
	}
	getAllRecadoByUserStatusTrue_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = this.service.getAllRecadoByUserStatusTrue_execute(
			user_id as string
		);
		if (!response.length) {
			return res.status(200).send('Usuário sem recados ativos.');
		}
		return res.status(200).json({ data: response });
	}
	getAllRecadoByUserStatusFalse_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const response = this.service.getAllRecadoByUserStatusFalse_execute(
			user_id as string
		);
		if (!response.length) {
			return res.status(200).send('Usuário sem recados arquivados.');
		}
		return res.status(200).json({ data: response });
	}
	getAllRecadoFilterTrueUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const title = req.query.title;
		const response = this.service.getAllRecadoFilterTrueUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).send('Nenhum recado encontrado.');
		}
		return res.status(200).json({ data: response });
	}
	getAllRecadoFilterFalseUser_handle(req: Request, res: Response) {
		const user_id = req.params.user_id;
		const title = req.query.title;
		const response = this.service.getAllRecadoFilterFalseUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).send('Nenhum recado encontrado.');
		}
		return res.status(200).json({ data: response });
	}
}
