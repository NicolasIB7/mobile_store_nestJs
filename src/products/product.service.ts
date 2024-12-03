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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findProduct(id: string) {
    try {
      const product = await this.productRepository.findBy({ uuid:id });

      if (!product) {
        this.logger.error('El producto no fue encontrado');
        throw new NotFoundException('El producto no fue encontrado');
      }
    } catch (error) {
      this.logger.error(`Error al encontrar producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async findProducts() {
    try {
      const products = await this.productRepository.find();

      if (!products) {
        this.logger.error('Los productos no se encontraron.');
        throw new NotFoundException('Los productos no se encontraron.');
      }
    } catch (error) {
      this.logger.error(`Error al encontrar los productos`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async removeProduct(id:string) {
    try {
      await this.productRepository.delete({uuid:id});

    } catch (error) {
      this.logger.error(`Error al remover el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProduct(id:string, updateDto:UpdateDto) {
    try {
      await this.productRepository.update({uuid:id}, updateDto);

    } catch (error) {
      this.logger.error(`Error al remover el producto`, error);
      throw new HttpException(
        `Ha ocurrido un error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }



}
