import {
  IsArray,
  IsString,
  ValidateNested,
  IsUUID,
  IsEmpty,
  IsOptional,
} from 'class-validator';
import { Address } from '@/domain/entities/address';
import { Email } from '@/domain/entities/emails';
import { Phone } from '@/domain/entities/phones';
import { Type } from 'class-transformer';

export class UserRequestDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Phone)
  phones: Phone[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses: Address[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  emails: Email[];

  // @IsArray()
  // @IsEmpty()
  // roles: string[];
}
