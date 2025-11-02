// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🔑 Habilita CORS
  app.enableCors({
    // Permite peticiones desde el puerto de desarrollo de Vite/React
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Establece un prefijo global para todos los endpoints (ej. /api/auth/login)
  app.setGlobalPrefix('api'); 
  
  await app.listen(3000); 
  console.log(`🚀 Backend corriendo en: http://localhost:3000/api`);
}
bootstrap();