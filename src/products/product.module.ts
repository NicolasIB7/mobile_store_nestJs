// USARE PIPES VALIDAROES PARA VALIDAR LA DATA QUE ME LLEGA, SI BIEN EXISTEN LOS DTO, ESTOS NO SON VALIDADORES, UNA PERSONA ME PUEDE ENVIAR OTRA 
//PROPIEDAD CON OTRO TIPADO IGUALMENTE.


import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RolesGuard } from 'src/users/roles.guard';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [ProductController],
//   exports: []
})
export class UserModule {}