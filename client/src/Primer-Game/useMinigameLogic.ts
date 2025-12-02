import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_QUESTIONS } from './MiniData-1';
import { useMinigameProgress } from '../contexts/MinigameProgressContext';

export const useMinigameLogic = (userName: string) => {
    const navigate = useNavigate();
    const { 
        progress, 
        markQuestionCompleted, 
        moveToNextQuestion, 
        getCurrentQuestionIndex, 
        resetQuestionIndex 
    } = useMinigameProgress();

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
    const currentQuestion = MINIGAME_QUESTIONS[currentQuestionIndex];

    const isCurrentQuestionCompleted = currentQuestion && 
        progress.completedQuestions.some(q => q.questionId === currentQuestion.id);

    const allQuestionsCompleted = progress.totalCompleted >= MINIGAME_QUESTIONS.length;

    // Auto-avanzar si la pregunta ya está completada
    useEffect(() => {
        if (isCurrentQuestionCompleted && currentQuestionIndex < MINIGAME_QUESTIONS.length - 1 && !isAnswered) {
            console.log('Pregunta ya completada, avanzando automáticamente...');
            moveToNextQuestion();
        }
    }, [isCurrentQuestionCompleted, currentQuestionIndex, isAnswered, moveToNextQuestion]);

    // Verificar si ya completó todos los minijuegos
    useEffect(() => {
        if (allQuestionsCompleted && !showCompletionMessage) {
            console.log('Ya completó todos los minijuegos anteriormente');
            setShowIntro(false);
            setShowCompletionMessage(true);
        }
    }, [allQuestionsCompleted, showCompletionMessage]);

    // Si no hay pregunta actual y no está completado, mostrar mensaje de completado
    if (!currentQuestion && !showCompletionMessage && !allQuestionsCompleted) {
        setShowCompletionMessage(true);
    }

    const formatFeedback = (text: string, selectedId: number) => {
        const word = currentQuestion?.word || MINIGAME_QUESTIONS[0].word;
        return text
            .replace(/{user}/g, userName)
            .replace(/{word}/g, word)
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
        if (isAnswered || !currentQuestion) return;

        setSelectedOptionId(selectedId);

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);
        setIsCorrectAnswer(isCorrect);

        if (isCorrect) {
            setFeedback(formatFeedback(currentQuestion.dialogue.correctFeedback, selectedId));
            console.log('Respuesta correcta! Pregunta ID:', currentQuestion.id, 'Intentos:', newAttempts);
            console.log('Antes de marcar - Progreso actual:', progress);
            markQuestionCompleted(currentQuestion.id, newAttempts);
        } else {
            if (newAttempts < 2) {
                setFeedback(formatFeedback(currentQuestion.dialogue.wrongAttempt1, selectedId));
                console.log('Respuesta incorrecta - Intento', newAttempts, 'de 2');
            } else {
                setFeedback(formatFeedback(currentQuestion.dialogue.wrongAttempt2, selectedId));
                console.log('Falló después de 2 intentos en pregunta:', currentQuestion.id);
            }
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
        console.log('Saliendo del minijuego');
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
        if (!currentQuestion) return;

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
                console.log('Estado actual - Índice:', currentQuestionIndex, 'Total preguntas:', MINIGAME_QUESTIONS.length);
                console.log('Progreso guardado:', progress);

                if (currentQuestionIndex < MINIGAME_QUESTIONS.length - 1) {
                    console.log('Hay más preguntas, avanzando...');
                    moveToNextQuestion();
                    setShowStory(true);
                    setCurrentDialogIndex(0);
                    resetAnswerState();
                    setAttempts(0);
                } else {
                    console.log('¡Todas las preguntas completadas!');
                    console.log('Progreso final:', {
                        total: progress.totalCompleted,
                        preguntas: progress.completedQuestions
                    });
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
        console.log('Volviendo al mapa sin resetear progreso');
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
                if (currentQuestionIndex < MINIGAME_QUESTIONS.length - 1) {
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
        // Estado
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
        
        // Funciones
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
