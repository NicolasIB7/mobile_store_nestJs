import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";





@Injectable()

export class ProductService{
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger){}

    async findProduct(){
    
    }




}

