import {IsString} from 'class-validator'

export class SignUpDto{
    @IsString()
    username:string;

    @IsString()
    name: string;
  
    @IsString()
    lastname: string;
  
    @IsString()
    phone: string;
  
    @IsString()
    country: string;

    @IsString()
    birthDate: string;

    @IsString()
    password:string;
}