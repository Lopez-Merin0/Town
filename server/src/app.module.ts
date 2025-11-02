// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    // 1. Configura la carga global de variables de entorno (.env)
    ConfigModule.forRoot({ isGlobal: true }),
    
    // 2. Configura TypeORM de forma asíncrona para usar ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST')!, // Asumimos que existe
        
        // CORRECCIÓN AQUÍ: Usamos '!' después de .get() para asegurar que es 'string' y no 'undefined'
        port: parseInt(configService.get<string>('POSTGRES_PORT')!, 10), 
        
        username: configService.get<string>('POSTGRES_USER')!,
        password: configService.get<string>('POSTGRES_PASSWORD')!,
        database: configService.get<string>('POSTGRES_DATABASE')!,
        
        entities: [User], 
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}