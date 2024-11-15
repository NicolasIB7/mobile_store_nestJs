import {
    Controller,
    Get,
    Body,
    Param,
    Post,
    ParseIntPipe,
    Request,
    Delete,
  } from '@nestjs/common';
import {UserService} from "./user.service"



  @Controller('user')
  export class UserController{
    constructor(private userService:UserService){}

    // @Get()

  }


 // VER INFORMACION DEL UnsupportedMediaTypeException, POR EJEMPLO EL PERFIL MIO
 // ACTUALIZAR CIERTOS CAMPOS DE MI PERFIL.
 // VER COMO SOLO PERMITIR EDITAR O BORRAR CIERTOS DATOS MENOS EL EMAIL, USERNAME Y CONTRASEÑA.
 