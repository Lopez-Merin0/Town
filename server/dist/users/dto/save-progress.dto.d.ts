declare class CompletedQuestionDto {
    questionId: number;
    completed: boolean;
    attempts: number;
    timestamp: string;
}
declare class MinigameProgressDto {
    completedQuestions: CompletedQuestionDto[];
    currentQuestionIndex: number;
    totalCompleted: number;
}
export declare class SaveProgressDto {
    userId: number;
    minigame1Progress?: MinigameProgressDto | null;
    minigame2Progress?: MinigameProgressDto | null;
    minigame3Progress?: MinigameProgressDto | null;
}
export {};
