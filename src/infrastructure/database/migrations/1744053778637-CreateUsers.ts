import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUsers1744053778637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users Table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'ACTIVE'",
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          {
            name: 'user_role_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['role_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Tabela users_roles
    const tableUsersRoles = await queryRunner.getTable('users_roles');
    const fkUser = tableUsersRoles?.foreignKeys.find((fk) =>
      fk.columnNames.includes('user_id'),
    );
    const fkRole = tableUsersRoles?.foreignKeys.find((fk) =>
      fk.columnNames.includes('role_id'),
    );

    if (fkUser) await queryRunner.dropForeignKey('users_roles', fkUser);
    if (fkRole) await queryRunner.dropForeignKey('users_roles', fkRole);
    await queryRunner.dropTable('users_roles');

    await queryRunner.dropTable('users');
  }
}
