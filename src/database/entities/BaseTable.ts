import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export abstract class BaseTable {
	@PrimaryColumn()
	uid!: string;

	@Column()
	created_at!: Date;

	@Column()
	updated_at!: Date;

	@BeforeInsert()
	beforeInsert() {
		this.uid = v4();
		this.created_at = new Date();
		this.updated_at = new Date();
	}

	@BeforeUpdate()
	beforeUpdate() {
		this.updated_at = new Date();
	}
}
