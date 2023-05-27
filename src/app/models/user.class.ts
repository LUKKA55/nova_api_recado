import { v4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import newDate from '../utils/newDate';

export class User implements IUser {
	constructor(
		public name: string,
		public email: string,
		public password: string,
		public id?: string,
		public create_at?: string,
		public update_at?: string
	) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.id = id ? id : v4();
		this.create_at = create_at ? create_at : newDate();
		this.update_at = update_at ? update_at : newDate();
	}
}
