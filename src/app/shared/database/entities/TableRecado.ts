import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { TableUser } from './TableUser';
import { v4 } from 'uuid';
import newDate from '../../../utils/newDate';

@Entity({ name: 'recado' })
export class TableRecado extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	title!: string;

	@Column()
	text!: string;

	@Column()
	status!: boolean;

	@Column()
	user_id!: string;

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@ManyToOne(() => TableUser, (user) => user.recados)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'uid' })
	user?: TableUser;

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
