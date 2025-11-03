// se configuran las conexiones y módulos principales

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    // desde el archivo .env
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get<string>('POSTGRES_HOST')!, 
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
