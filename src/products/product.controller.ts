import { Body, Controller, Delete, Get, Param, Put, Request } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";


@Controller('product')
export class ProductController{
    constructor(private productService:ProductService){}

    @Get(':id')

    async getProduct(@Param('id') id:string ):Promise<any>{ //evitar any
        await this.productService.findProduct(id)
    }

    @Get()

    async getProducts():Promise<any>{ //evitar any
        await this.productService.findProducts() //agregar filtrado, paginado.

    }


    @Delete(':id')
    async deleteProduct(@Param('id') id:string):Promise<any>{ //evitar any
        await this.productService.removeProduct(id) // ver eliminación de todo el producto de todas las tablas.

    }

    @Put(':id')
    async updateProduct(@Param('id') id:string, @Body() productDto: ProductDto):Promise<any>{ //evitar any
        await this.productService.updateProduct(id, productDto) // VER SI ACTUALIZA BIEN TODO POR MÁS QUE HAYA DIF TABLAS.

    }



    




// VER COMO IMPLEMENTAR KAFKA 
// UTILIZAR TRANSACCIONES PARA HACER TODO DE UNA Y SI FALLA REVERTIR, POR EJEMPLO EN EL CASO DE AGREGAR PROUDCTO Y MODIFICAR TODAS LAS OTRAS TABLAS.
// EXISTE EL ENTITYMANAGER PARA HACER AUTOMATICO O QUERY RUNNER QUE ES MAS MANUAL, INVESTIGAR ENTITY


}