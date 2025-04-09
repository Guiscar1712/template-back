import {
  IsArray,
  IsString,
  ValidateNested,
  IsUUID,
  IsEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Address } from '@/domain/entities/address';
import { Email } from '@/domain/entities/emails';
import { Phone } from '@/domain/entities/phones';
import { Type } from 'class-transformer';
import { RoleEnum } from '@/domain/enums/role.enum';

export class UserUpdateRequestDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  document: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Phone)
  @IsOptional()
  phones: Phone[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  @IsOptional()
  addresses: Address[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  @IsOptional()
  emails: Email[];

  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
