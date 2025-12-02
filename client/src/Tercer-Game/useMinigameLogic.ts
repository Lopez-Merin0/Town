import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_3_QUESTIONS } from './MiniData-3';
import { useMinigame3Progress } from '../contexts/Minigame3ProgressContext';

export const useMinigameLogic = (userName: string, audioRef?: React.RefObject<HTMLAudioElement>) => {
    const navigate = useNavigate();
    const { 
        progress, 
        markQuestionCompleted, 
        moveToNextQuestion, 
        getCurrentQuestionIndex, 
        resetQuestionIndex 
    } = useMinigame3Progress();

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
    const currentQuestion = MINIGAME_3_QUESTIONS[currentQuestionIndex];

    const isCurrentQuestionCompleted = currentQuestion && 
        progress.completedQuestions.some(q => q.questionId === currentQuestion.id);

    const allQuestionsCompleted = progress.totalCompleted >= MINIGAME_3_QUESTIONS.length;

    useEffect(() => {
        if (isCurrentQuestionCompleted && currentQuestionIndex < MINIGAME_3_QUESTIONS.length - 1 && !isAnswered) {
            console.log('Pregunta ya completada, avanzando automáticamente...');
            moveToNextQuestion();
        }
    }, [isCurrentQuestionCompleted, currentQuestionIndex, isAnswered, moveToNextQuestion]);

    useEffect(() => {
        if (allQuestionsCompleted && !showCompletionMessage) {
            console.log('Ya completó todos los minijuegos 3 anteriormente');
            setShowIntro(false);
            setShowCompletionMessage(true);
        }
    }, [allQuestionsCompleted, showCompletionMessage]);

    if (!currentQuestion && !showCompletionMessage && !allQuestionsCompleted) {
        setShowCompletionMessage(true);
    }

    const formatFeedback = (text: string, selectedId: number) => {
        const word = currentQuestion?.word || MINIGAME_3_QUESTIONS[0].word;
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
        if (audioRef?.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        console.log('Saliendo del minijuego 3');
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
                console.log('Estado actual - Índice:', currentQuestionIndex, 'Total preguntas:', MINIGAME_3_QUESTIONS.length);

                if (currentQuestionIndex < MINIGAME_3_QUESTIONS.length - 1) {
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
                if (currentQuestionIndex < MINIGAME_3_QUESTIONS.length - 1) {
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
