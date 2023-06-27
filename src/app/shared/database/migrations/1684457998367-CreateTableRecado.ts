import { Column, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRecado1684457998367 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'recado',
				columns: [
					{ name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
					{ name: 'title', type: 'varchar', length: '50', isNullable: false },
					{ name: 'text', type: 'varchar', isNullable: false },
					{ name: 'status', type: 'boolean', default: true },
					{ name: 'user_id', type: 'uuid', isNullable: false },
					{
						name: 'created_at',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'updated_at',
						type: 'varchar',
						isNullable: false,
					},
				],
				foreignKeys: [
					{
						name: 'fk_recado_user',
						columnNames: ['user_id'],
						referencedColumnNames: ['uid'],
						referencedTableName: 'user',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('recado', true, true, true);
	}
}
