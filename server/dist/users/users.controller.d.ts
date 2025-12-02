import { UsersService } from './users.service';
import { SaveProgressDto } from './dto/save-progress.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    saveProgress(saveProgressDto: SaveProgressDto): Promise<{
        message: string;
        data: import("./entities/user-progress.entity").UserProgress;
        error?: undefined;
    } | {
        message: any;
        error: boolean;
        data?: undefined;
    }>;
    getProgress(userId: number): Promise<{
        message: string;
        data: import("./entities/user-progress.entity").UserProgress | null;
        error?: undefined;
    } | {
        message: any;
        error: boolean;
        data?: undefined;
    }>;
}
