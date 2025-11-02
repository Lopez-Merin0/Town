// server/src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // La ruta base será /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // POST a /auth/register
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register({ username, email, password });
  }

  @Post('login') // POST a /auth/login
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login({ email, password });
  }
}