import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { User } from '@/domain/entities/user';

@injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';
  private readonly expiresIn = '1d';

  public async generateToken(
    user: User,
  ): Promise<{ token: string; expiresIn: number }> {
    const payload = {
      user_id: user.user_id,
      name: user.name,
    };

    const expiresInSeconds = this.convertToSeconds(this.expiresIn);

    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });

    return {
      token,
      expiresIn: expiresInSeconds,
    };
  }

  public async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }

  private convertToSeconds(time: string): number {
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1), 10);

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 60 * 60 * 24;
      default:
        return 86400;
    }
  }
}
