import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './entities/product.entity';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create.inventory.dto';
import { PaginateQueryRaw } from './helpers/paginateRaw.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.findProduct(id);
  }

  @Get()
  async getProducts(@Query() query: PaginateQueryRaw): Promise<Product[]> {
    return await this.productService.findProducts(query);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    await this.productService.removeProduct(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    //evitar any
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Post()
  async createProduct(@Body() productDto: ProductDto): Promise<Product> {
    //evitar any
    return await this.productService.createProduct(productDto);
  }

  @Post('inventory')
  async addInventory(
    @Body() InventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    //evitar any
    return await this.productService.addDataInventory(InventoryDto);
  }

  @Get('inventory/:id')
  async getInventories(@Param('id') id: string): Promise<Inventory[]> {
    return await this.productService.findInventories(id);
  }
}
