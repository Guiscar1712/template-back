import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeeds1744054123928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public.users (user_id, "name", "password", created_at, status, document) VALUES
        ('21d4be6b-85ad-4b5a-9c9b-41c8777003e1'::uuid, 'teste', '$2a$10$JtzQ3cF6S1V2ZJ0SIhCfgOM5JgjRhO461lXeyprv4rvYRVcyRpjJO', '2025-04-07 15:48:49.481', 'ACTIVE', '38826621071');
    `);

    await queryRunner.query(`
      INSERT INTO public.phones (phone_id, phone, user_id, created_at) VALUES
        ('4c1a5421-325b-4d9c-b959-1d6265f0484c'::uuid, '41293127338', '21d4be6b-85ad-4b5a-9c9b-41c8777003e1'::uuid, '2025-04-07 15:52:06.427');
    `);

    await queryRunner.query(`
      INSERT INTO public.emails (email_id, email, user_id, created_at) VALUES
        ('7bf8f8d2-c05b-4497-9a94-0942a99d5986'::uuid, 'teste@gmail.com', '21d4be6b-85ad-4b5a-9c9b-41c8777003e1'::uuid, '2025-04-07 15:51:32.604');
    `);

    await queryRunner.query(`
      INSERT INTO public.addresses (address_id, street, city, state, country, postal_code, user_id, created_at) VALUES
        ('3582423f-b138-4a17-b677-0d1f79fad537'::uuid, 'Te', 'tete', 'tetet', 'tete', '3213123', '21d4be6b-85ad-4b5a-9c9b-41c8777003e1'::uuid, '2025-04-07 15:50:44.837');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Apagar nas tabelas dependentes primeiro
    await queryRunner.query(`
      DELETE FROM public.addresses WHERE address_id = '3582423f-b138-4a17-b677-0d1f79fad537';
    `);

    await queryRunner.query(`
      DELETE FROM public.emails WHERE email_id = '7bf8f8d2-c05b-4497-9a94-0942a99d5986';
    `);

    await queryRunner.query(`
      DELETE FROM public.phones WHERE phone_id = '4c1a5421-325b-4d9c-b959-1d6265f0484c';
    `);

    await queryRunner.query(`
      DELETE FROM public.users WHERE user_id = '21d4be6b-85ad-4b5a-9c9b-41c8777003e1';
    `);
  }
}
