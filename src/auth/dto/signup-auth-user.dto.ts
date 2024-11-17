import { IsDateString, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  country: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  password: string;
}
