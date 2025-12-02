import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_2_QUESTIONS } from './MiniData-2';
import { useMinigame2Progress } from '../contexts/Minigame2ProgressContext';

export const useMinigameLogic = (userName: string) => {
    const navigate = useNavigate();
    const { 
        progress, 
        markQuestionCompleted, 
        moveToNextQuestion, 
        getCurrentQuestionIndex, 
        resetQuestionIndex 
    } = useMinigame2Progress();

    const [showIntro, setShowIntro] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showStory, setShowStory] = useState(true);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [hoveredOptionId, setHoveredOptionId] = useState<number | null>(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);

    const currentQuestionIndex = getCurrentQuestionIndex();
    const currentQuestion = MINIGAME_2_QUESTIONS[currentQuestionIndex];

    const isCurrentQuestionCompleted = currentQuestion && 
        progress.completedQuestions.some(q => q.questionId === currentQuestion.id);

    const allQuestionsCompleted = progress.totalCompleted >= MINIGAME_2_QUESTIONS.length;

    useEffect(() => {
        if (isCurrentQuestionCompleted && currentQuestionIndex < MINIGAME_2_QUESTIONS.length - 1 && !isAnswered) {
            console.log('Pregunta ya completada, avanzando automáticamente...');
            moveToNextQuestion();
        }
    }, [isCurrentQuestionCompleted, currentQuestionIndex, isAnswered, moveToNextQuestion]);

    useEffect(() => {
        if (allQuestionsCompleted && !showCompletionMessage) {
            console.log('Ya completó todos los minijuegos 2 anteriormente');
            setShowIntro(false);
            setShowCompletionMessage(true);
        }
    }, [allQuestionsCompleted, showCompletionMessage]);

    if (!currentQuestion && !showCompletionMessage && !allQuestionsCompleted) {
        setShowCompletionMessage(true);
    }

    const formatFeedback = (text: string, selectedId: number) => {
        if (!currentQuestion) return text;

        const selectedOptionText = currentQuestion.options.find(opt => opt.id === selectedId)?.text || '';
        const correctOptionText = currentQuestion.options.find(opt => opt.isCorrect)?.text || '';

        return text
            .replace(/{user}/g, userName)
            .replace(/{word}/g, correctOptionText)
            .replace(/{text}/g, selectedOptionText)
            .replace(/{id}/g, String(selectedId));
    };

    const getCurrentIntroText = () => {
        if (!currentQuestion) return '';
        
        const { dialogue } = currentQuestion;
        const isIntroArray = Array.isArray(dialogue.introGreeting);
        
        let text = '';
        if (isIntroArray) {
            text = dialogue.introGreeting[currentDialogIndex] || '';
        } else {
            text = dialogue.introGreeting as string;
        }
        return formatFeedback(text, 0);
    };

    const handleAnswer = (isCorrect: boolean, selectedId: number) => {
        if (isAnswered || showExitConfirmation || !currentQuestion) return;

        setSelectedOptionId(selectedId);

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);
        setIsCorrectAnswer(isCorrect);

        if (isCorrect) {
            setFeedback(formatFeedback(currentQuestion.dialogue.correctFeedback, selectedId));
            console.log('Respuesta correcta! Pregunta ID:', currentQuestion.id, 'Intentos:', newAttempts);
            markQuestionCompleted(currentQuestion.id, newAttempts);
        } else {
            const feedbackText = newAttempts < 2 
                ? currentQuestion.dialogue.wrongAttempt1 
                : currentQuestion.dialogue.wrongAttempt2;
            setFeedback(formatFeedback(feedbackText, selectedId));
            console.log(newAttempts < 2 ? 'Respuesta incorrecta' : 'Falló después de 2 intentos');
        }
    };

    const resetAnswerState = () => {
        setIsAnswered(false);
        setFeedback('');
        setSelectedOptionId(null);
        setIsCorrectAnswer(false);
    };

    const handleExitClick = () => {
        setShowExitConfirmation(true);
    };

    const handleConfirmExit = () => {
        console.log('Saliendo del minijuego 2');
        if (progress.totalCompleted === 0) {
            resetQuestionIndex();
        }
        setShowExitConfirmation(false);
        navigate(-1);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    const handleNext = () => {
        if (showExitConfirmation || !currentQuestion) return;

        const { dialogue } = currentQuestion;
        const isIntroArray = Array.isArray(dialogue.introGreeting);
        const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;

        if (showStory) {
            if (currentDialogIndex < totalDialogs - 1) {
                setCurrentDialogIndex(currentDialogIndex + 1);
            } else {
                setShowStory(false);
                setCurrentDialogIndex(0);
            }
        } else if (isAnswered) {
            if (isCorrectAnswer) {
                console.log('Pregunta correcta confirmada');
                console.log('Estado actual - Índice:', currentQuestionIndex, 'Total preguntas:', MINIGAME_2_QUESTIONS.length);

                if (currentQuestionIndex < MINIGAME_2_QUESTIONS.length - 1) {
                    console.log('Hay más preguntas, avanzando...');
                    moveToNextQuestion();
                    setShowStory(true);
                    setCurrentDialogIndex(0);
                    resetAnswerState();
                    setAttempts(0);
                } else {
                    console.log('¡Todas las preguntas completadas!');
                    setShowCompletionMessage(true);
                }
            } else if (attempts >= 2) {
                console.log('Saliendo por fallos');
                handleConfirmExit();
            } else {
                console.log('Reintentar');
                resetAnswerState();
            }
        }
    };

    const handleBackToMap = () => {
        console.log('Completado, reseteando índice y volviendo al mapa');
        resetQuestionIndex();
        navigate(-1);
    };

    const getButtonText = () => {
        if (!currentQuestion) return '...';

        const { dialogue } = currentQuestion;
        const isIntroArray = Array.isArray(dialogue.introGreeting);
        const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
        const isLastDialog = currentDialogIndex >= totalDialogs - 1;

        if (showStory) {
            return isLastDialog ? "¡Empecemos el Desafío!" : "Continuar";
        } else if (isAnswered) {
            if (isCorrectAnswer) {
                if (currentQuestionIndex < MINIGAME_2_QUESTIONS.length - 1) {
                    return "Siguiente Pregunta";
                } else {
                    return "¡Completado! Cerrar";
                }
            } else if (attempts < 2) {
                return "Siguiente Intento";
            } else {
                return "Cerrar y Salir";
            }
        }
        return '...';
    };

    return {
        showIntro,
        setShowIntro,
        isAnswered,
        feedback,
        showStory,
        currentDialogIndex,
        attempts,
        selectedOptionId,
        hoveredOptionId,
        setHoveredOptionId,
        isCorrectAnswer,
        showExitConfirmation,
        showCompletionMessage,
        currentQuestionIndex,
        currentQuestion,
        allQuestionsCompleted,
        progress,
        handleAnswer,
        handleExitClick,
        handleConfirmExit,
        handleCancelExit,
        handleNext,
        handleBackToMap,
        getCurrentIntroText,
        getButtonText,
        formatFeedback,
    };
};
