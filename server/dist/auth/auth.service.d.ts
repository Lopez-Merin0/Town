import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
interface RegisterDto {
    username: string;
    email: string;
    password: string;
}
interface LoginDto {
    email: string;
    password: string;
}
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(registerDto: RegisterDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
}
export {};
