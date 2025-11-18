import React from 'react';
import { MINIGAME_3_QUESTIONS } from '../MiniData-3';
import { useMinigame3Progress } from '../contexts/Minigame3ProgressContext';

export const useThirdMinigameLogic = (attempts: number) => {
    const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex, resetQuestionIndex } = useMinigame3Progress();
    const currentIndex = getCurrentQuestionIndex();
    const currentQuestion = MINIGAME_3_QUESTIONS[currentIndex];

    const handleCorrectAnswer = () => {
        if (!currentQuestion) return;

        markQuestionCompleted(currentQuestion.id, attempts);

        if (currentIndex < MINIGAME_3_QUESTIONS.length - 1) {
            setTimeout(() => {
                moveToNextQuestion();
            }, 2000);
        } else {
            console.log('Minijuego 3 completado');
        }
    };

    const handleExit = () => {
        resetQuestionIndex();
    };

    return {
        progress,
        currentQuestion,
        currentIndex,
        handleCorrectAnswer,
        handleExit,
    };
};
