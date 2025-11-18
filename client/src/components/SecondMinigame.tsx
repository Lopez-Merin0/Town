import React from 'react';
import { MINIGAME_2_QUESTIONS } from '../MiniData-2';
import { useMinigame2Progress } from '../contexts/Minigame2ProgressContext';

export const useSecondMinigameLogic = (attempts: number) => {
    const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex, resetQuestionIndex } = useMinigame2Progress();
    const currentIndex = getCurrentQuestionIndex();
    const currentQuestion = MINIGAME_2_QUESTIONS[currentIndex];

    const handleCorrectAnswer = () => {
        if (!currentQuestion) return;

        markQuestionCompleted(currentQuestion.id, attempts);

        if (currentIndex < MINIGAME_2_QUESTIONS.length - 1) {
            setTimeout(() => {
                moveToNextQuestion();
            }, 2000);
        } else {
            console.log('Minijuego 2 completado');
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
