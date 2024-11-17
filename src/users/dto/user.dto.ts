import {IsDateString, IsOptional, IsPhoneNumber, IsString} from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsDateString()
    birthDate: string;
}