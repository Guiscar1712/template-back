import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { User } from '@/domain/entities/user';

@injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';
  private readonly expiresIn = '1d';

  public async generateToken(user: User): Promise<string> {
    const payload = {
      user_id: user.user_id,
      name: user.name,
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  public async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
