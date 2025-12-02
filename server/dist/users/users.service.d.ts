import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UserProgress } from './entities/user-progress.entity';
import { SaveProgressDto } from './dto/save-progress.dto';
export declare class UsersService {
    private usersRepository;
    private userProgressRepository;
    constructor(usersRepository: Repository<User>, userProgressRepository: Repository<UserProgress>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    saveProgress(saveProgressDto: SaveProgressDto): Promise<UserProgress>;
    getProgress(userId: number): Promise<UserProgress | null>;
}
