import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Inventory, MovementType } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create.inventory.dto';
import { Stock } from './entities/stock.entity';
import { PaginateQueryRaw } from './helpers/paginateRaw.interface';
import { formatPage } from './helpers/formatPage';
import { formatTake } from './helpers/formatTake';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findProduct(id: string): Promise<Product[]> {
    try {
      const product = await this.productRepository.findBy({ uuid: id });

      if (!product) {
        this.logger.error('El producto no fue encontrado');
        throw new NotFoundException('El producto no fue encontrado');
      }
      return product;
    } catch (error) {
      this.logger.error(`Error al encontrar producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findProducts(query: PaginateQueryRaw): Promise<Product[]> {
    try {
      const take = formatTake(query.take);
      const page = formatPage(query.page);
      const skip = take * page - take;

      const [products, total] = await this.productRepository.findAndCount({
        take,
        skip,
        relations: ['stocks', 'specs'],
      });

      if (!products) {
        this.logger.error('Los productos no se encontraron.');
        throw new NotFoundException('Los productos no se encontraron.');
      }
      return products;
    } catch (error) {
      this.logger.error(`Error al encontrar los productos`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeProduct(id: string) {
    try {
      await this.productRepository.delete({ uuid: id });
    } catch (error) {
      this.logger.error(`Error al remover el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { uuid: id },
        relations: ['stocks', 'specs'],
      });

      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      if (updateProductDto.stocks) {
        Object.assign(product.stocks, updateProductDto.stocks);
      }
      if (updateProductDto.specs) {
        Object.assign(product.specs, updateProductDto.specs);
      }

      Object.assign(product, {
        ...updateProductDto,
        stocks: product.stocks,
        specs: product.specs,
      });

      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error(`Error al actualizar el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProduct(productDto: ProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.save(productDto);

      await this.inventoryRepository.save({
        product_id: product.stocks.product_id,
        stock_quantity: productDto.stocks.total_stock,
        movement_type: MovementType.ENTRADA,
      });
      return product;
    } catch (error) {
      this.logger.error(`Error al crear el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //--------------------------------------------------------------------------------//

  async addDataInventory(inventoryDto: CreateInventoryDto): Promise<Inventory> {
    try {
      const stock = await this.stockRepository.findOne({
        where: { product_id: inventoryDto.product_id },
      });

      if (!stock) {
        throw new Error('El producto no tiene un stock registrado');
      }

      let updatedStock = stock.total_stock;

      if (inventoryDto.movement_type === 'Entrada') {
        updatedStock += inventoryDto.stock_quantity;
      } else if (inventoryDto.movement_type === 'Salida') {
        if (stock.total_stock < inventoryDto.stock_quantity) {
          throw new Error('No hay suficiente stock para realizar la salida');
        }
        updatedStock -= inventoryDto.stock_quantity;
      }

      await this.stockRepository.update(
        { product_id: inventoryDto.product_id },
        { total_stock: updatedStock },
      );

      return await this.inventoryRepository.save(inventoryDto);
    } catch (error) {
      this.logger.error(`Error al registrar un movimiento`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findInventories(id: string): Promise<Inventory[]> {
    try {
      const inventory = await this.inventoryRepository.find({
        where: { product_id: id },
      });

      if (!inventory) {
        this.logger.error('El inventario no fue encontrado');
        throw new NotFoundException('El inventario no fue encontrado');
      }
      return inventory;
    } catch (error) {
      this.logger.error(`Error al encontrar inventario`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
