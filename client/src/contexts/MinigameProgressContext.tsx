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

export const MinigameProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loadInitialProgress = (): MinigameProgress => {
        const savedProgress = localStorage.getItem('minigameProgress');

        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                console.log('Cargando progreso guardado del minijuego 1:', parsed);
                return parsed;
            } catch (error) {
                console.error('Error al parsear el progreso guardado', error);
            }
        }

        console.log('No hay progreso guardado, iniciando desde cero');
        return {
            completedQuestions: [],
            currentQuestionIndex: 0,
            totalCompleted: 0,
        };
    };

    const [progress, setProgress] = useState<MinigameProgress>(loadInitialProgress);

    useEffect(() => {
        console.log('Progreso guardado (temporal):', progress);
        localStorage.setItem('minigameProgress', JSON.stringify(progress));
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