import { IsEmail, IsString } from 'class-validator';

export class ProductDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}