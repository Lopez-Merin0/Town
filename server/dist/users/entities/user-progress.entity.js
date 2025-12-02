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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
let UserProgress = class UserProgress {
    id;
    userId;
    user;
    minigame1Progress;
    minigame2Progress;
    minigame3Progress;
    createdAt;
    updatedAt;
};
exports.UserProgress = UserProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], UserProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, default: null }),
    __metadata("design:type", Object)
], UserProgress.prototype, "minigame1Progress", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, default: null }),
    __metadata("design:type", Object)
], UserProgress.prototype, "minigame2Progress", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, default: null }),
    __metadata("design:type", Object)
], UserProgress.prototype, "minigame3Progress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserProgress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserProgress.prototype, "updatedAt", void 0);
exports.UserProgress = UserProgress = __decorate([
    (0, typeorm_1.Entity)('user_progress')
], UserProgress);
//# sourceMappingURL=user-progress.entity.js.map