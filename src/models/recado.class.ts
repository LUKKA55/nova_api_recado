import { v4 } from 'uuid';
import { IRecado } from '../interfaces/recado.interface';
import newDate from '../services/newDate';

export class Recado implements IRecado {
	id: string;
	status: boolean;
	create_date: string;
	update_date: string;
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
		this.create_date = newDate();
		this.update_date = newDate();
	}
}
