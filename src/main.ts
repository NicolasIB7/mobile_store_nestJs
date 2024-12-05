import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // gracias a esto no tengo que poner explicitamente en el controlador el ValidationPpie para ejecutar las validaciones en el dto.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
