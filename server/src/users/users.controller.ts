import { Controller, Post, Get, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SaveProgressDto } from './dto/save-progress.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('save-progress')
  async saveProgress(@Body() saveProgressDto: SaveProgressDto) {
    try {
      const progress = await this.usersService.saveProgress(saveProgressDto);
      return {
        message: 'Progreso guardado exitosamente',
        data: progress,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al guardar el progreso',
        error: true,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('progress/:userId')
  async getProgress(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const progress = await this.usersService.getProgress(userId);
      return {
        message: 'Progreso obtenido exitosamente',
        data: progress,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al obtener el progreso',
        error: true,
      };
    }
  }
}
