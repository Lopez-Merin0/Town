import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuestionProgress {
    questionId: number;
    completed: boolean;
    attempts: number;
    timestamp: string;
}

interface Minigame2Progress {
    completedQuestions: QuestionProgress[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface Minigame2ProgressContextType {
    progress: Minigame2Progress;
    markQuestionCompleted: (questionId: number, attempts: number) => void;
    resetProgress: () => void;
    getCurrentQuestionIndex: () => number;
    moveToNextQuestion: () => void;
    resetQuestionIndex: () => void;
}

const Minigame2ProgressContext = createContext<Minigame2ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'talkie_town_minigame2_progress';
const SESSION_KEY = 'talkie_town_session_id';

export const Minigame2ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const loadInitialProgress = (): Minigame2Progress => {
    const savedProgress = localStorage.getItem('minigame2Progress');
    
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        console.log('Cargando progreso guardado del minijuego 2:', parsed);
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

  const [progress, setProgress] = useState<Minigame2Progress>(loadInitialProgress);

  useEffect(() => {
    console.log('Progreso guardado (temporal) - Minijuego 2:', progress);
    localStorage.setItem('minigame2Progress', JSON.stringify(progress));
  }, [progress]);

  const markQuestionCompleted = (questionId: number, attempts: number) => {
    console.log('Marcando pregunta completada (Minijuego 2):', questionId, 'con intentos:', attempts);

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

      console.log('Nuevo progreso (Minijuego 2):', newProgress);
      return newProgress;
    });
  };

  const moveToNextQuestion = () => {
    console.log('Moviendo a siguiente pregunta (Minijuego 2)');
    setProgress(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const getCurrentQuestionIndex = () => progress.currentQuestionIndex;

  const resetProgress = () => {
    console.log('Reseteando progreso completamente (Minijuego 2)');
    const emptyProgress = { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
    setProgress(emptyProgress);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const resetQuestionIndex = () => {
    console.log('Reseteando índice de pregunta a 0 (Minijuego 2)');
    setProgress(prev => ({
      ...prev,
      currentQuestionIndex: 0,
    }));
  };

  return (
    <Minigame2ProgressContext.Provider
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
    </Minigame2ProgressContext.Provider>
  );
};

export const useMinigame2Progress = () => {
  const context = useContext(Minigame2ProgressContext);
  if (!context) {
    throw new Error('useMinigame2Progress must be used within Minigame2ProgressProvider');
  }
  return context;
};
