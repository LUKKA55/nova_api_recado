import { v4 } from 'uuid';
import { IRecado } from './interfaces/recado.interface';
import newDate from '../utils/newDate';

export class Recado implements IRecado {
	constructor(
		public title: string,
		public text: string,
		public user_id: string,
		public status?: boolean,
		public id?: string,
		public create_at?: string,
		public update_at?: string
	) {
		this.title = title;
		this.text = text;
		this.user_id = user_id;
		this.status = status ? true : status;
		this.id = id ? id : v4();
		this.create_at = create_at ? create_at : newDate();
		this.update_at = update_at ? update_at : newDate();
	}
}
