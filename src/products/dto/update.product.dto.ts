import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from '@nestjs/class-transformer';
import { UpdateSpecsDto } from "./update.specs.dto";
import { UpdateStockDto } from "./update.stock.dto";

export class UpdateProductDto{


    @IsOptional()
    brand: string;
  

    @IsOptional()
    model: string;
  

    @IsOptional()
    price: number;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateStockDto)
    stocks: UpdateStockDto;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateSpecsDto)
    specs: UpdateSpecsDto;
}