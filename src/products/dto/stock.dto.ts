import { IsNumber } from "class-validator";

export class StockDto{
    @IsNumber()
    total_stock: number;
}