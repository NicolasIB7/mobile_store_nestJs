import { IsString } from "class-validator";


export class SpecDto{
    @IsString()
    storage: string;
  
    @IsString()
    memory_ram: string;
  
    @IsString()
    screen_size: string;
  
    @IsString()
    batery: string;
  
    @IsString()
    color: string;
  
    @IsString()
    weight: string;
  
    @IsString()
    processor: string;
}