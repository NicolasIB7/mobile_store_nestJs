import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';


@Module({
  imports: [DbModule, AuthModule, UserModule ],
})
export class AppModule {}
