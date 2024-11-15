import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UserController } from './users.controller';


@Module({
  providers: [UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}