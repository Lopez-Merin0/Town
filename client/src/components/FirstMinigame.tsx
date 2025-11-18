import { MINIGAME_QUESTIONS } from '../MiniData-1';
import { useMinigameProgress } from '../contexts/MinigameProgressContext';

const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex } = useMinigameProgress();
const currentIndex = getCurrentQuestionIndex();
const currentQuestion = MINIGAME_QUESTIONS[currentIndex];

const handleCorrectAnswer = () => {
    markQuestionCompleted(currentQuestion.id, attempts);
    
    if (currentIndex < MINIGAME_QUESTIONS.length - 1) {
        setTimeout(() => {
            moveToNextQuestion();
        }, 2000);
    } else {
    }
};
