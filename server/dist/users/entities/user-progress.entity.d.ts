import { User } from '../../auth/entities/user.entity';
export declare class UserProgress {
    id: number;
    userId: number;
    user: User;
    minigame1Progress: {
        completedQuestions: Array<{
            questionId: number;
            completed: boolean;
            attempts: number;
            timestamp: string;
        }>;
        currentQuestionIndex: number;
        totalCompleted: number;
    } | null;
    minigame2Progress: {
        completedQuestions: Array<{
            questionId: number;
            completed: boolean;
            attempts: number;
            timestamp: string;
        }>;
        currentQuestionIndex: number;
        totalCompleted: number;
    } | null;
    minigame3Progress: {
        completedQuestions: Array<{
            questionId: number;
            completed: boolean;
            attempts: number;
            timestamp: string;
        }>;
        currentQuestionIndex: number;
        totalCompleted: number;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}
