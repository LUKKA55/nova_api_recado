import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUser1684457976753 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user',
				columns: [
					{ name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
					{ name: 'name', type: 'varchar', isNullable: false },
					{ name: 'email', type: 'varchar', isNullable: false, isUnique: true },
					{ name: 'password', type: 'varchar', isNullable: false },
					{
						name: 'created_at',
						type: 'timestamp',
						isNullable: false,
						default: 'current_timestamp',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						isNullable: false,
						default: 'current_timestamp',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user', true, true, true);
	}
}
