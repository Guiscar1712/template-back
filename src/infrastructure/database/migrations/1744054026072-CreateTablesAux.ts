import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablesAux1744054026072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Email Table
    await queryRunner.createTable(
      new Table({
        name: 'emails',
        columns: [
          {
            name: 'email_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'emails',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Phone Table
    await queryRunner.createTable(
      new Table({
        name: 'phones',
        columns: [
          {
            name: 'phone_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'phones',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Address Table
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'address_id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'postal_code',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableAddresses = await queryRunner.getTable('addresses');
    const fkAddrUser = tableAddresses?.foreignKeys.find((fk) =>
      fk.columnNames.includes('user_id'),
    );
    if (fkAddrUser) await queryRunner.dropForeignKey('addresses', fkAddrUser);
    await queryRunner.dropTable('addresses');

    const tablePhones = await queryRunner.getTable('phones');
    const fkPhoneUser = tablePhones?.foreignKeys.find((fk) =>
      fk.columnNames.includes('user_id'),
    );
    if (fkPhoneUser) await queryRunner.dropForeignKey('phones', fkPhoneUser);
    await queryRunner.dropTable('phones');

    const tableEmails = await queryRunner.getTable('emails');
    const fkEmailUser = tableEmails?.foreignKeys.find((fk) =>
      fk.columnNames.includes('user_id'),
    );
    if (fkEmailUser) await queryRunner.dropForeignKey('emails', fkEmailUser);
    await queryRunner.dropTable('emails');
  }
}
