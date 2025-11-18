import React from 'react';
import { MINIGAME_QUESTIONS } from '../MiniData-1';
import { useMinigameProgress } from '../contexts/MinigameProgressContext';

export const useFirstMinigameLogic = (attempts: number) => {
    const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex } = useMinigameProgress();
    const currentIndex = getCurrentQuestionIndex();
    const currentQuestion = MINIGAME_QUESTIONS[currentIndex];

    const handleCorrectAnswer = () => {
        if (!currentQuestion) return;

        markQuestionCompleted(currentQuestion.id, attempts);

        if (currentIndex < MINIGAME_QUESTIONS.length - 1) {
            setTimeout(() => {
                moveToNextQuestion();
            }, 2000);
        } else {
            console.log('Todas las preguntas completadas');
        }
    };

    return {
        progress,
        currentQuestion,
        currentIndex,
        handleCorrectAnswer,
    };
};
