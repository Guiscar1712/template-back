import { inject, injectable } from 'inversify';
import { AuthService } from '@/domain/services/auth/auth-service';
import { UserService } from '@/domain/services/user/user-service';
import { compare } from 'bcryptjs';
import { TYPES } from '@/infrastructure/container/types-container';

@injectable()
export class AuthLoginUseCase {
  constructor(
    @inject(TYPES.AuthService)
    private authService: AuthService,
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userService.findByParams({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return this.authService.generateToken(user);
  }
}
