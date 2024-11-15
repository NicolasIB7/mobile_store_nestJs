import { Module } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import {jwtConstants} from "./constants"
import {JwtModule} from "@nestjs/jwt"
import {AuthController} from "./auth.controller"
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[UserService, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],  
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers:[AuthController],
  exports: [AuthService]
})
export class AuthModule {}



// HABILITAR PARA REGISTRO DE USUARIOS Y CAMBIAR CONTRASEÑA.