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
    minigameId?: string; // Identificador del minijuego
}

interface MinigameProgressContextType {
    progress: MinigameProgress;
    markQuestionCompleted: (questionId: number, attempts: number) => void;
    resetProgress: () => void;
    getCurrentQuestionIndex: () => number;
    moveToNextQuestion: () => void;
    resetQuestionIndex: () => void;
    setMinigameId: (id: string) => void;
    getProgressForMinigame: (id: string) => MinigameProgress;
}

const MinigameProgressContext = createContext<MinigameProgressContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'talkie_town_minigame_progress_';
const SESSION_KEY = 'talkie_town_session_id';

const getStorageKey = (minigameId: string) => `${STORAGE_KEY_PREFIX}${minigameId}`;

const getInitialProgress = (minigameId: string = 'default'): MinigameProgress => {
    const currentSessionId = sessionStorage.getItem(SESSION_KEY);
    
    if (!currentSessionId) {
        const newSessionId = Date.now().toString();
        sessionStorage.setItem(SESSION_KEY, newSessionId);
        console.log('🆕 Nueva sesión detectada, progreso reseteado');
        return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0, minigameId };
    }

    const stored = localStorage.getItem(getStorageKey(minigameId));
    if (stored) {
        try {
            console.log('📂 Cargando progreso de sesión existente para minijuego:', minigameId);
            return JSON.parse(stored);
        } catch {
            return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0, minigameId };
        }
    }
    return { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0, minigameId };
};

export const MinigameProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentMinigameId, setCurrentMinigameId] = useState<string>('default');
    const [progress, setProgress] = useState<MinigameProgress>(() => getInitialProgress(currentMinigameId));

    useEffect(() => {
        if (progress.minigameId) {
            localStorage.setItem(getStorageKey(progress.minigameId), JSON.stringify(progress));
            console.log('Progreso guardado (temporal) para:', progress.minigameId, progress);
        }
    }, [progress]);

    const setMinigameId = (id: string) => {
        console.log('🎮 Cambiando a minijuego:', id);
        setCurrentMinigameId(id);
        setProgress(getInitialProgress(id));
    };

    const getProgressForMinigame = (id: string): MinigameProgress => {
        return getInitialProgress(id);
    };

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
        console.log('🔄 Reseteando progreso completamente');
        const emptyProgress = { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0, minigameId: currentMinigameId };
        setProgress(emptyProgress);
        if (currentMinigameId) {
            localStorage.removeItem(getStorageKey(currentMinigameId));
        }
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
                setMinigameId,
                getProgressForMinigame,
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