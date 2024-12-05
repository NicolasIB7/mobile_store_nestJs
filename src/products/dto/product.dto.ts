import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { SpecDto } from './spec.dto';
import { StockDto } from './stock.dto';
import { Type } from '@nestjs/class-transformer';

export class ProductDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  price: number;

  @ValidateNested()
  @Type(() => StockDto)
  stock: StockDto;

  @ValidateNested()
  @Type(() => SpecDto)
  specs: SpecDto;

}


  // luego usar el create en el service para ir armando las instancias, probar e investigar en la docu.