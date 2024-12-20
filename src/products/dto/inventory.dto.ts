import { IsNumber, IsString } from 'class-validator';

export enum MovementType {
  ENTRADA = 'Entrada',
  SALIDA = 'Salida',
}

export class InventoryDto {
  @IsString()
  movement_type: MovementType;

  @IsNumber()
  stock_quantity: number;
}
