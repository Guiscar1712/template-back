import { User } from '@/domain/entities/user';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.user_id,
      name: user.name,
      status: user.status,
      phones: (user.phones || []).map((phone) => phone.phone),
      emails: (user.emails || []).map((email) => email.email),
      addresses: (user.addresses || []).map((addr) => ({
        street: addr.street,
        city: addr.city,
        state: addr.state,
        country: addr.country,
        postalCode: addr.postal_code,
      })),
      // roles: (user.roles || []).map((ur) => ur.role?.role_name ?? ''),
    };
  }
}
