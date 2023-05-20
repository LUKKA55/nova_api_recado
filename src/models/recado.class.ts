import { v4 } from 'uuid';
import { IRecado } from '../interfaces/recado.interface';
import newDate from '../services/newDate';

export class Recado implements IRecado {
	id: string;
	status: boolean;
	create_at: string;
	update_at: string;
	constructor(
		public title: string,
		public text: string,
		public user_id: string
	) {
		this.id = v4();
		this.title = title;
		this.text = text;
		this.user_id = user_id;
		this.status = true;
		this.create_at = newDate();
		this.update_at = newDate();
	}
}
