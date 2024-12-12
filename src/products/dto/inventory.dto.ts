import { IsNumber, IsString } from "class-validator";

export class InventoryDto{
    @IsString()
    movement_type: string;
  
    @IsNumber()
    stock_quantity: number;
}