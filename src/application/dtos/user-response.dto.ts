import { RoleEnum } from '@/domain/enums/role.enum';

export interface UserResponseDto {
  id: string;
  document: string;
  name: string;
  status: string;
  phones: string[];
  emails: string[];
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }[];
  role: RoleEnum;
}
