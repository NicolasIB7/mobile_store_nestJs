import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
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


// armar 3 dto por cada uno y agregar esto en el dto principal:   @ValidateNested()
  // @Type(() => StockDto)
  // stock: StockDto;

  // @ValidateNested()
  // @Type(() => SpecDto)
  // specs: SpecDto;

  // luego usar el create en el service para ir armando las instancias, probar e investigar en la docu.