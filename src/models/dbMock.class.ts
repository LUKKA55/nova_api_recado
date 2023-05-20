import { IRecado } from '../interfaces/recado.interface';
import { IUser } from '../interfaces/user.interface';
import newDate from '../services/newDate';

export class dbMock {
	private userlist: IUser[] = [];
	private recadolist: IRecado[] = [];
	get userAll() {
		return this.userlist;
	}
	get recadoAll() {
		return this.recadolist;
	}
	addUser(user: IUser): void {
		this.userlist.push(user);
	}
	findUser(id: string) {
		const user = this.userlist.find((user) => user.id === id);
		return user;
	}
	removeOneUser(id: string) {
		const removeUser = this.userlist.findIndex((user) => user.id === id);
		if (removeUser < 0) {
			return null;
		}
		this.userlist.splice(removeUser, 1);
		return this.userlist;
	}
	updateUser({ id, name, email, password }: IUser) {
		const index = this.userlist.findIndex((user) => user.id === id);
		if (index < 0) {
			return null;
		}

		const updateUser = {
			name: name ? name : this.userlist[index].name,
			email: email ? email : this.userlist[index].email,
			password: password ? password : this.userlist[index].password,
			id,
		};

		this.userlist.splice(index, 1, updateUser);
		return updateUser;
	}
	logiUser({ name, email, password }: IUser) {
		const findUser = this.userlist.find(
			(user) =>
				user.name === name && user.email === email && user.password === password
		);
		return findUser;
	}

	//-----------------------------------------------------------------------------------------------------------------------------------------------

	addRecado(recado: IRecado): void {
		this.recadolist.push(recado);
	}
	findRecadoByUser(user_id: string) {
		const recadolist = this.recadolist.filter(
			(recado) => recado.user_id === user_id
		);
		return recadolist;
	}
	findOneRecadoById(recado_id: string) {
		const recado = this.recadolist.find((recado) => recado.id === recado_id);
		return recado;
	}
	updateRecado(data: { recado_id: string; title: any; text: any }) {
		const index = this.recadolist.findIndex(
			(recado) => recado.id === data.recado_id
		);
		if (index < 0) {
			return null;
		}
		const newRecado = {
			id: this.recadolist[index].id,
			title: data.title ? data.title : this.recadolist[index].title,
			text: data.text ? data.text : this.recadolist[index].text,
			user_id: this.recadolist[index].user_id,
			status: this.recadolist[index].status,
			create_at: this.recadolist[index].create_at,
			update_at: newDate(),
		};

		this.recadolist.splice(index, 1, newRecado);
		return {
			newRecado,
			allRecados: this.recadolist.filter(
				(t) => t.user_id === this.recadolist[index].user_id
			),
		};
	}
	deleteOneRecado(recado_id: string) {
		const recado = this.recadolist.findIndex((t) => t.id === recado_id);
		if (recado < 0) {
			return null;
		}
		const removeRecado = this.recadolist[recado];

		this.recadolist.splice(recado, 1);

		return { removed: removeRecado, data: this.recadolist };
	}
	arquivaRecado(recado_id: string) {
		const recado = this.recadolist.find((recado) => recado.id === recado_id);
		if (recado === undefined) {
			return null;
		}
		recado.status = false;
		return recado;
	}
	desarquivarRecado(recado_id: string) {
		const recado = this.recadolist.find((recado) => recado.id === recado_id);
		if (recado === undefined) {
			return null;
		}
		recado.status = true;
		return recado;
	}
	findRecadoByUserStatusTrue(user_id: string) {
		const recadoslistTrue = this.recadolist.filter(
			(recado) => recado.user_id === user_id && recado.status === true
		);
		return recadoslistTrue;
	}
	findRecadoByUserStatusFalse(user_id: string) {
		const recadolistFalse = this.recadolist.filter(
			(recado) => recado.user_id === user_id && recado.status === false
		);
		return recadolistFalse;
	}
	recadoFilterTrueUser(user_id: string, title: string) {
		const recado = this.recadolist.filter(
			(recado) => recado.user_id === user_id && recado.status === true
		);
		const recadoFilter = recado.filter((recado) => {
			return recado.title.toLowerCase().includes(title.toLowerCase());
		});
		return recadoFilter;
	}
	recadoFilterFalseUser(user_id: string, title: string) {
		const recado = this.recadolist.filter(
			(recado) => recado.user_id === user_id && recado.status === false
		);
		const recadoFilter = recado.filter((recado) => {
			return recado.title.toLowerCase().includes(title.toLowerCase());
		});
		return recadoFilter;
	}
}

export const database = new dbMock();
