// jala NestJS y configura cosas globales como CORS, validación y prefijos de rutas

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // permite peticiones desde el front
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // envia cookies o credenciales si es necesario
  });

  // validación global para los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // borra propiedades que no estén definidas en el DTO
      forbidNonWhitelisted: true, // error por campos de más
      transform: true, // convierte los datos recibidos a la clase del DTO
    }),
  );

  await app.listen(3001);
  console.log(`Backend corriendo en: ${await app.getUrl()}/api`);
}

bootstrap();
