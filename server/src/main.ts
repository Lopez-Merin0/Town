// jala NestJS y configura cosas globales como CORS, validación y prefijos de rutas

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Puerto del cliente Vite
    credentials: true,
  });

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(5000);
  console.log('🚀 Servidor corriendo en http://localhost:5000');
}

bootstrap();
