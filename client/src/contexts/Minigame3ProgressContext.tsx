import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuestionProgress {
    questionId: number;
    completed: boolean;
    attempts: number;
    timestamp: string;
}

interface Minigame3Progress {
    completedQuestions: QuestionProgress[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface Minigame3ProgressContextType {
    progress: Minigame3Progress;
    markQuestionCompleted: (questionId: number, attempts: number) => void;
    resetProgress: () => void;
    getCurrentQuestionIndex: () => number;
    moveToNextQuestion: () => void;
    resetQuestionIndex: () => void;
}

const Minigame3ProgressContext = createContext<Minigame3ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'talkie_town_minigame3_progress';
const SESSION_KEY = 'talkie_town_session_id';

const getInitialProgress = (): Minigame3Progress => {
    const currentSessionId = sessionStorage.getItem(SESSION_KEY);

    if (!currentSessionId) {
        const newSessionId = Date.now().toString();
        sessionStorage.setItem(SESSION_KEY, newSessionId);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('talkie_town_minigame_progress'); // Limpiar minijuego 1
        localStorage.removeItem('talkie_town_minigame2_progress'); // Limpiar minijuego 2
        console.log('Nueva sesión detectada (Minijuego 3), todos los progresos reseteados');
        return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            console.log('Cargando progreso de sesión existente (Minijuego 3)');
            return JSON.parse(stored);
        } catch {
            return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
        }
    }
    return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
};

export const Minigame3ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loadInitialProgress = (): Minigame3Progress => {
        const savedProgress = localStorage.getItem('minigame3Progress');

        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                console.log('Cargando progreso guardado del minijuego 3:', parsed);
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

    const [progress, setProgress] = useState<Minigame3Progress>(loadInitialProgress);

    useEffect(() => {
        console.log('Progreso guardado (temporal) - Minijuego 3:', progress);
        localStorage.setItem('minigame3Progress', JSON.stringify(progress));
    }, [progress]);

    const markQuestionCompleted = (questionId: number, attempts: number) => {
        console.log('Marcando pregunta completada (Minijuego 3):', questionId, 'con intentos:', attempts);

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

            console.log('Nuevo progreso (Minijuego 3):', newProgress);
            return newProgress;
        });
    };

    const moveToNextQuestion = () => {
        console.log('Moviendo a siguiente pregunta (Minijuego 3)');
        setProgress(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
    };

    const getCurrentQuestionIndex = () => progress.currentQuestionIndex;

    const resetProgress = () => {
        console.log('Reseteando progreso completamente (Minijuego 3)');
        const emptyProgress = { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
        setProgress(emptyProgress);
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_KEY);
    };

    const resetQuestionIndex = () => {
        console.log('Reseteando índice de pregunta a 0 (Minijuego 3)');
        setProgress(prev => ({
            ...prev,
            currentQuestionIndex: 0,
        }));
    };

    return (
        <Minigame3ProgressContext.Provider
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
        </Minigame3ProgressContext.Provider>
    );
};

export const useMinigame3Progress = () => {
    const context = useContext(Minigame3ProgressContext);
    if (!context) {
        throw new Error('useMinigame3Progress must be used within Minigame3ProgressProvider');
    }
    return context;
};
