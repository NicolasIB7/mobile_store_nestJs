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

//PASOS:
// CREAR DTOS PARA USUARIOS
// COMPLETAR ENDPOINTS FALTANTES DE USUARIO GET, UPDATE, DELETE.
// AGREGAR HTTPEXCEPTION y excepciones personalizadas por ejemplo cuando un usuario quiera registrarse con un email usado.
// AGREGAR O IMPLEMENTAR WINSTON.
// VER TESTING

 