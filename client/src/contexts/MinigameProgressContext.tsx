import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuestionProgress {
    questionId: number;
    completed: boolean;
    attempts: number;
    timestamp: string;
}

interface MinigameProgress {
    completedQuestions: QuestionProgress[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface MinigameProgressContextType {
    progress: MinigameProgress;
    markQuestionCompleted: (questionId: number, attempts: number) => void;
    resetProgress: () => void;
    getCurrentQuestionIndex: () => number;
    moveToNextQuestion: () => void;
    resetQuestionIndex: () => void;
}

const MinigameProgressContext = createContext<MinigameProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'talkie_town_minigame_progress';
const SESSION_KEY = 'talkie_town_session_id';

const getInitialProgress = (): MinigameProgress => {
    const currentSessionId = sessionStorage.getItem(SESSION_KEY);

    if (!currentSessionId) {
        const newSessionId = Date.now().toString();
        sessionStorage.setItem(SESSION_KEY, newSessionId);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('talkie_town_minigame2_progress'); // Limpiar minijuego 2
        localStorage.removeItem('talkie_town_minigame3_progress'); // Limpiar minijuego 3
        console.log('Nueva sesión detectada, todos los progresos reseteados');
        return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
    }

    // en progreso
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            console.log('Cargando progreso de sesión existente');
            return JSON.parse(stored);
        } catch {
            return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
        }
    }
    return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
};

export const MinigameProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<MinigameProgress>(getInitialProgress);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        console.log('Progreso guardado (temporal):', progress);
    }, [progress]);

    const markQuestionCompleted = (questionId: number, attempts: number) => {
        console.log('Marcando pregunta completada:', questionId, 'con intentos:', attempts);

        setProgress(prev => {
            const existingIndex = prev.completedQuestions.findIndex(q => q.questionId === questionId);
            const newQuestion: QuestionProgress = {
                questionId,
                completed: true,
                attempts,
                timestamp: new Date().toISOString(),
            };

            let updatedQuestions = [...prev.completedQuestions];
            if (existingIndex >= 0) {
                updatedQuestions[existingIndex] = newQuestion;
            } else {
                updatedQuestions.push(newQuestion);
            }

            const newProgress = {
                ...prev,
                completedQuestions: updatedQuestions,
                totalCompleted: updatedQuestions.length,
            };

            console.log('Nuevo progreso:', newProgress);
            return newProgress;
        });
    };

    const moveToNextQuestion = () => {
        console.log('Moviendo a siguiente pregunta');
        setProgress(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
    };

    const getCurrentQuestionIndex = () => progress.currentQuestionIndex;

    const resetProgress = () => {
        console.log('Reseteando progreso completamente');
        const emptyProgress = { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
        setProgress(emptyProgress);
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_KEY);
    };

    const resetQuestionIndex = () => {
        console.log('Reseteando índice de pregunta a 0');
        setProgress(prev => ({
            ...prev,
            currentQuestionIndex: 0,
        }));
    };

    return (
        <MinigameProgressContext.Provider
            value={{
                progress,
                markQuestionCompleted,
                resetProgress,
                getCurrentQuestionIndex,
                moveToNextQuestion,
                resetQuestionIndex,
            }}
        >
            {children}
        </MinigameProgressContext.Provider>
    );
};

export const useMinigameProgress = () => {
    const context = useContext(MinigameProgressContext);
    if (!context) {
        throw new Error('useMinigameProgress must be used within MinigameProgressProvider');
    }
    return context;
};