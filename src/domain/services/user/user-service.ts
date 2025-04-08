import { AppDataSource } from '@/data-source';
import { Address } from '@/domain/entities/address';
import { Email } from '@/domain/entities/emails';
import { Phone } from '@/domain/entities/phones';
import { User } from '@/domain/entities/user';
import { AbstractRepository } from '@/domain/repositories/abstract.repository';
import { AddressRepository } from '@/domain/repositories/address-repository';
import { EmailRepository } from '@/domain/repositories/email-repository';
import { PhoneRepository } from '@/domain/repositories/phone-repository';
// import { UserRole } from '@/domain/entities/user-role';
import { UserRepository } from '@/domain/repositories/user-repository';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
// import { UserRoleRepository } from '@/domain/repositories/user-role-repository';

export class UserService {
  private userRepository: UserRepository;
  private phoneRepository: PhoneRepository;
  private emailRepository: EmailRepository;
  private addressRepository: AddressRepository;

  constructor() {
    this.userRepository = new UserRepository(AppDataSource.getRepository(User));
    this.phoneRepository = new PhoneRepository(
      AppDataSource.getRepository(Phone),
    );
    this.emailRepository = new EmailRepository(
      AppDataSource.getRepository(Email),
    );
    this.addressRepository = new AddressRepository(
      AppDataSource.getRepository(Address),
    );
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findById({
        where: { user_id: id, is_deleted: false },
        relations: ['phones', 'addresses', 'emails'],
      });

      if (!user) {
        throw new Error('User not found');
      }

      user.name = data.name ?? user.name;
      user.status = data.status ?? user.status;
      user.password = data.password ?? user.password;

      await this.userRepository.update(id, {
        name: user.name,
        status: user.status,
        password: user.password,
      });

      if (data.phones) {
        await this.phoneRepository.delete(id);
        const newPhones = data.phones.map((p) => ({ ...p, user }));
        for (const phone of newPhones) {
          await this.phoneRepository.save(phone);
        }
      }

      if (data.addresses) {
        await this.addressRepository.delete(id);
        const newAddresses = data.addresses.map((a) => ({ ...a, user }));
        for (const address of newAddresses) {
          await this.addressRepository.save(address);
        }
      }

      if (data.emails) {
        await this.emailRepository.delete(id);
        const newEmails = data.emails.map((e) => ({ ...e, user }));
        for (const email of newEmails) {
          await this.emailRepository.save(email);
        }
      }

      return this.userRepository.findById({
        where: { user_id: id },
        relations: ['phones', 'addresses', 'emails'],
      });
    } catch (error) {
      throw new AppError(
        `User update failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }

  async findByParams(params: any): Promise<User> {
    const query = {} as any;

    if (params.email) {
      query.email = params.email;
    }

    if (params.document) {
      query.document = params.document;
    }

    query.is_deleted = false;

    return this.userRepository.findById({
      where: query,
      relations: ['phones', 'addresses', 'emails'],
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById({
      where: { user_id: id as string, is_deleted: false },
      relations: ['phones', 'addresses', 'emails'],
    });
  }

  async find(query: any): Promise<User[]> {
    return this.userRepository.findAll({
      where: { is_deleted: false },
      relations: ['phones', 'addresses', 'emails'],
    });
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.update(id, { is_deleted: true });
  }

  // async addRolesToUser(userId: string, roleIds: string[]): Promise<void> {
  //   const userRoles = roleIds.map((roleId) => {
  //     return {
  //       user_id: userId,
  //       role_id: roleId,
  //     };
  //   });

  //   for (const role of userRoles) {
  //     await this.userRoleRepository.save(role as Partial<UserRole>);
  //   }
  // }
}
