import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),

        new winston.transports.File({
          filename: 'combined.log',
          level: 'info',
        }),
      ],
    }),
  ],
})
export class AppModule {}

// VER VIDEO DE CUSTOMIZAR LOS TRANSPORTS, APLICAR LOGGER A CODIGO, TESTEAR
