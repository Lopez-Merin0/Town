"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const user_progress_entity_1 = require("./entities/user-progress.entity");
let UsersService = class UsersService {
    usersRepository;
    userProgressRepository;
    constructor(usersRepository, userProgressRepository) {
        this.usersRepository = usersRepository;
        this.userProgressRepository = userProgressRepository;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async create(userData) {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }
    async saveProgress(saveProgressDto) {
        const { userId, minigame1Progress, minigame2Progress, minigame3Progress } = saveProgressDto;
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }
        let userProgress = await this.userProgressRepository.findOne({ where: { userId } });
        if (userProgress) {
            if (minigame1Progress !== undefined) {
                userProgress.minigame1Progress = minigame1Progress;
            }
            if (minigame2Progress !== undefined) {
                userProgress.minigame2Progress = minigame2Progress;
            }
            if (minigame3Progress !== undefined) {
                userProgress.minigame3Progress = minigame3Progress;
            }
        }
        else {
            userProgress = this.userProgressRepository.create({
                userId,
                minigame1Progress: minigame1Progress || null,
                minigame2Progress: minigame2Progress || null,
                minigame3Progress: minigame3Progress || null,
            });
        }
        return this.userProgressRepository.save(userProgress);
    }
    async getProgress(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }
        return this.userProgressRepository.findOne({ where: { userId } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_progress_entity_1.UserProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map