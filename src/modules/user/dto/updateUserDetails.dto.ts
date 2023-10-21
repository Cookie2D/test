import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class updateCurrentUserDetaisDto {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}

export class UpdateUserDetailsDto extends updateCurrentUserDetaisDto {
  @IsOptional()
  @IsNumber()
  roleId: number;
}
