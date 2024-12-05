import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto{

    @IsString()
    brand: string;
  
    @IsString()
    model: string;
  
    @IsNumber()
    price: number;
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

    @IsNumber()
    total_stock: number;
}