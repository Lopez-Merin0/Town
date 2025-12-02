import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UserProgress } from './entities/user-progress.entity';
import { SaveProgressDto } from './dto/save-progress.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async saveProgress(saveProgressDto: SaveProgressDto): Promise<UserProgress> {
    const { userId, minigame1Progress, minigame2Progress, minigame3Progress } = saveProgressDto;

    // Verificar que el usuario existe
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Buscar si ya existe un progreso para este usuario
    let userProgress = await this.userProgressRepository.findOne({ where: { userId } });

    if (userProgress) {
      // Actualizar progreso existente
      if (minigame1Progress !== undefined) {
        userProgress.minigame1Progress = minigame1Progress;
      }
      if (minigame2Progress !== undefined) {
        userProgress.minigame2Progress = minigame2Progress;
      }
      if (minigame3Progress !== undefined) {
        userProgress.minigame3Progress = minigame3Progress;
      }
    } else {
      // Crear nuevo progreso
      userProgress = this.userProgressRepository.create({
        userId,
        minigame1Progress: minigame1Progress || null,
        minigame2Progress: minigame2Progress || null,
        minigame3Progress: minigame3Progress || null,
      });
    }

    return this.userProgressRepository.save(userProgress);
  }

  async getProgress(userId: number): Promise<UserProgress | null> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    return this.userProgressRepository.findOne({ where: { userId } });
  }
}
