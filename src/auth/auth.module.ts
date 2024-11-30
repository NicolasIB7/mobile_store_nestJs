import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {jwtConstants} from "./constants"
import {JwtModule} from "@nestjs/jwt"
import {AuthController} from "./auth.controller"
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/users/users.module';

@Module({
  imports:[UserModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
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


