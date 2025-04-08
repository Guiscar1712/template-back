import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import { IHashedPassword } from '@/domain/interfaces/hashed-password.interface';

@injectable()
export class HashedPassword implements IHashedPassword {
  private readonly saltRounds = 10;

  public async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  public async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }
}
