// se configuran las conexiones y módulos principales

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './auth/entities/user.entity';
import { UserProgress } from './users/entities/user-progress.entity';

@Module({
  imports: [
    // desde el archivo .env
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get<string>('POSTGRES_HOST') || 'localhost', 
        port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10), 
        username: configService.get<string>('POSTGRES_USER')!, 
        password: configService.get<string>('POSTGRES_PASSWORD')!, 
        database: configService.get<string>('POSTGRES_DATABASE')!, 
        entities: [User, UserProgress], 
        synchronize: true, 
      }),
      inject: [ConfigService], 
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
