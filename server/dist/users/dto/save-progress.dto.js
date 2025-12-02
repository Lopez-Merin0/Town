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
exports.SaveProgressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CompletedQuestionDto {
    questionId;
    completed;
    attempts;
    timestamp;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CompletedQuestionDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompletedQuestionDto.prototype, "completed", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CompletedQuestionDto.prototype, "attempts", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompletedQuestionDto.prototype, "timestamp", void 0);
class MinigameProgressDto {
    completedQuestions;
    currentQuestionIndex;
    totalCompleted;
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CompletedQuestionDto),
    __metadata("design:type", Array)
], MinigameProgressDto.prototype, "completedQuestions", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MinigameProgressDto.prototype, "currentQuestionIndex", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MinigameProgressDto.prototype, "totalCompleted", void 0);
class SaveProgressDto {
    userId;
    minigame1Progress;
    minigame2Progress;
    minigame3Progress;
}
exports.SaveProgressDto = SaveProgressDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SaveProgressDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MinigameProgressDto),
    __metadata("design:type", Object)
], SaveProgressDto.prototype, "minigame1Progress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MinigameProgressDto),
    __metadata("design:type", Object)
], SaveProgressDto.prototype, "minigame2Progress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MinigameProgressDto),
    __metadata("design:type", Object)
], SaveProgressDto.prototype, "minigame3Progress", void 0);
//# sourceMappingURL=save-progress.dto.js.map