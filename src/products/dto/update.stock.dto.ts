import { IsNumber, IsOptional } from "class-validator";

export class UpdateStockDto{
    @IsNumber()
    @IsOptional()
    total_stock: number;
}