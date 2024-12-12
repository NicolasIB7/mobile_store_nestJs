import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { SpecDto } from './spec.dto';
import { StockDto } from './stock.dto';
import { Type } from '@nestjs/class-transformer';
import { InventoryDto } from './inventory.dto';

export class ProductDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  price: number;

  @ValidateNested()
  @Type(() => StockDto)
  stocks: StockDto;

  @ValidateNested()
  @Type(() => SpecDto)
  specs: SpecDto;

  @ValidateNested()
  @Type(() => InventoryDto)
  inventories: InventoryDto[];


}


  // luego usar el create en el service para ir armando las instancias, probar e investigar en la docu.