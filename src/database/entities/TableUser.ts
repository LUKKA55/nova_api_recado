import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { TableRecado } from './TableRecado';
import { v4 } from 'uuid';
import newDate from '../../services/newDate';

@Entity({ name: 'user' })
export class TableUser extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	name!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@OneToMany(() => TableRecado, (e) => e.user)
	recados?: TableRecado[];

	// @BeforeInsert()
	// beforeInsert() {
	// 	this.uid = v4();
	// 	this.created_at = newDate();
	// 	this.updated_at = newDate();
	// }

	// @BeforeUpdate()
	// beforeUpdate() {
	// 	this.updated_at = newDate();
	// }
}
