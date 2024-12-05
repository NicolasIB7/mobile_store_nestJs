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
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findProduct(id: string):Promise<Product[]> {
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

  async findProducts(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();

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

  async updateProduct(id: string, updateProductDto: UpdateProductDto):Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { uuid: id },
        relations: ['stocks', 'specs'],
      });

      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      Object.assign(product, updateProductDto);

      return await this.productRepository.save(updateProductDto);
    } catch (error) {
      this.logger.error(`Error al actualizar el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProduct(productDto: ProductDto):Promise<Product> {
    try {
      return await this.productRepository.save(productDto);
    } catch (error) {
      this.logger.error(`Error al crear el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
