// manejar el registro y el login de los usuarios

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // encriptar las contraseñas

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
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, email, password } = registerDto;

    const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new BadRequestException('El email o nombre de usuario ya está registrado.');
    }

    // contraseña hasheada
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({ 
      username, 
      email, 
      password: hashedPassword 
    });
    
    await this.usersRepository.save(newUser);

    // Generar token JWT
    const payload = { sub: newUser.id, email: newUser.email, username: newUser.username };
    const access_token = this.jwtService.sign(payload);

    return { 
      access_token,
      user: {
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email 
      }
    };
  }


  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto; 

    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'username', 'email', 'password'] // tiene la contraseña encriptada para comparar
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { 
      access_token,
      user: {
        id: user.id, 
        username: user.username, 
        email: user.email 
      }
    };
  }
}
