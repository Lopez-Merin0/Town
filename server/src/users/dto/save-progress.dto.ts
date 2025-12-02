import { IsNumber, IsOptional, ValidateNested, IsArray, IsBoolean, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class CompletedQuestionDto {
  @IsNumber()
  questionId: number;

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  attempts: number;

  @IsString()
  timestamp: string;
}

class MinigameProgressDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompletedQuestionDto)
  completedQuestions: CompletedQuestionDto[];

  @IsNumber()
  currentQuestionIndex: number;

  @IsNumber()
  totalCompleted: number;
}

export class SaveProgressDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => MinigameProgressDto)
  minigame1Progress?: MinigameProgressDto | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => MinigameProgressDto)
  minigame2Progress?: MinigameProgressDto | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => MinigameProgressDto)
  minigame3Progress?: MinigameProgressDto | null;
}
