// server/src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

// DTOs (Data Transfer Objects) simples para las peticiones
interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, email, password } = registerDto;

    // 1. Verificar si el usuario o correo ya existen
    const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new BadRequestException('El email o nombre de usuario ya está registrado.');
    }

    // 2. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Crear y guardar el nuevo usuario
    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    // Retorna solo la información segura del usuario
    return { 
      id: newUser.id, 
      username: newUser.username, 
      email: newUser.email 
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    // 1. Buscar el usuario por email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas (email)');
    }

    // 2. Comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas (contraseña)');
    }

    // ¡Aquí iría la generación de un JWT! Por ahora, solo devolvemos datos seguros.
    return { 
      id: user.id, 
      username: user.username, 
      email: user.email 
    };
  }
}