import { Controller, Get, Param, Request } from "@nestjs/common";
import { ProductService } from "./product.service";


@Controller('product')
export class ProductController{
    constructor(private productService:ProductService){}

    @Get(':id')

    async getProduct(@Param('id') id:string ):Promise<any>{ //evitar any
        await this.productService.findProduct(id)
    }

    
// Buscar productos, paginado, filtrado
// buscar producto por id
// actualizar producto(ver que pasa si recibo propiedad de la tabla spec me deberia actualizar igual)
// Borrar producto en cascada
// si agrego producto debe pasar algo en las tablas de stock y de inventario.
// VER COMO IMPLEMENTAR KAFKA 
// UTILIZAR TRANSACCIONES PARA HACER TODO DE UNA Y SI FALLA REVERTIR, POR EJEMPLO EN EL CASO DE AGREGAR PROUDCTO Y MODIFICAR TODAS LAS OTRAS TABLAS.
// EXISTE EL ENTITYMANAGER PARA HACER AUTOMATICO O QUERY RUNNER QUE ES MAS MANUAL, INVESTIGAR ENTITY


}