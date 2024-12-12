import { IsOptional, IsString } from "class-validator";


export class UpdateSpecsDto{
    @IsString()
    @IsOptional()
    storage: string;
  
    @IsString()
    @IsOptional()
    memory_ram: string;
  
    @IsString()
    @IsOptional()
    screen_size: string;
  
    @IsString()
    @IsOptional()
    batery: string;
  
    @IsString()
    @IsOptional()
    color: string;
  
    @IsString()
    @IsOptional()
    weight: string;
  
    @IsString()
    @IsOptional()
    processor: string;
}