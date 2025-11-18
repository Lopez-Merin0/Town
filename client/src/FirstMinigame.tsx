import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_QUESTIONS, Option } from './MiniData-1';
import LoadingScreen from './LoadingScreen';
import { useMinigameProgress } from './contexts/MinigameProgressContext';

const KAWAI_COLORS = {
    bgLight: '#FBF0DF',
    bgMedium: '#f7e7d4',
    bgDark: '#A58B79',
    panelLight: '#F7F0E6',
    panelBorder: '#8B7360',
    textDark: '#4A3C32',
    textMedium: '#F7F0E6',
    textGreen: '#2E6F40',
    accentGreen: '#B2D8BB',
    accentPink: '#FFC0CB',
    shadowLight: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.3)',
    accentRed: '#FF6347',
    borderRed: '#CC0000',
};

const KAWAI_FONTS = {
    comfortaa: "'Comfortaa', cursive, Arial, sans-serif",
    mali: "'Mali', cursive, Arial, sans-serif",
};

const KAWAI_TEXTURES = {
    texturePaper: 'url("https://www.transparenttextures.com/patterns/white-paperboard.png")',
};

const MINIGAME_BACKGROUND = './firstGame.jpg';

interface FirstMinigameProps {
    userName: string;
}

const ExitConfirmationPopup: React.FC<{ onConfirm: () => void; onCancel: () => void; }> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{ fontFamily: KAWAI_FONTS.comfortaa, pointerEvents: 'auto' }}>
        <div className="p-6 rounded-xl shadow-2xl text-center relative"
            style={{
                backgroundColor: KAWAI_COLORS.panelLight,
                border: `5px solid ${KAWAI_COLORS.panelBorder}`,
                boxShadow: `0 8px 0 0 ${KAWAI_COLORS.bgDark}`,
                maxWidth: '350px',
                paddingTop: '2rem',
            }}>

            <p className="text-xl font-bold mb-5" style={{ color: KAWAI_COLORS.textDark }}>
                ¿Estás segura de regresar al mapa?
            </p>
            <p className="text-sm mb-6" style={{ color: KAWAI_COLORS.textDark }}>
                Perderás el progreso de tu partida actual.
            </p>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onConfirm}
                    className="py-2 px-4 font-bold transition-transform transform hover:scale-105"
                    style={{
                        backgroundColor: KAWAI_COLORS.accentPink,
                        color: KAWAI_COLORS.textDark,
                        border: `3px solid ${KAWAI_COLORS.panelBorder}`,
                        boxShadow: `0 4px 0 0 ${KAWAI_COLORS.bgDark}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontFamily: KAWAI_FONTS.mali,
                    }}
                >
                    Confirmar
                </button>
                <button
                    onClick={onCancel}
                    className="py-2 px-4 font-bold transition-transform transform hover:scale-105"
                    style={{
                        backgroundColor: KAWAI_COLORS.bgMedium,
                        color: KAWAI_COLORS.textDark,
                        border: `3px solid ${KAWAI_COLORS.panelBorder}`,
                        boxShadow: `0 4px 0 0 ${KAWAI_COLORS.bgDark}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontFamily: KAWAI_FONTS.mali,
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
);


const FirstMinigame: React.FC<FirstMinigameProps> = ({ userName }) => {
    const navigate = useNavigate();
    const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex, resetQuestionIndex } = useMinigameProgress();

    const [showIntro, setShowIntro] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showStory, setShowStory] = useState(true);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [hoveredOptionId, setHoveredOptionId] = useState<number | null>(null);

    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);

    const currentQuestionIndex = getCurrentQuestionIndex();
    const currentQuestion = MINIGAME_QUESTIONS[currentQuestionIndex];

    console.log('Componente renderizado - Índice:', currentQuestionIndex, 'Pregunta:', currentQuestion?.id);
    console.log('Progreso al iniciar:', progress);

    // Verificar si ya completó todos los minijuegos
    const allQuestionsCompleted = progress.totalCompleted >= MINIGAME_QUESTIONS.length;

    React.useEffect(() => {
        if (allQuestionsCompleted && !showCompletionMessage) {
            console.log('Ya completó todos los minijuegos anteriormente');
            setShowIntro(false);
            setShowCompletionMessage(true);
        }
    }, [allQuestionsCompleted, showCompletionMessage]);

    // si ya no hay mas preguntitas
    if (!currentQuestion && !showCompletionMessage && !allQuestionsCompleted) {
        setShowCompletionMessage(true);
    }

    const isLocked = isAnswered;

    const isGameOver = (isAnswered && currentQuestion && feedback.includes(currentQuestion.dialogue.correctFeedback.split(',')[0])) || (attempts >= 2);

    const { word, options, rules, dialogue } = currentQuestion || MINIGAME_QUESTIONS[0];

    const isIntroArray = Array.isArray(dialogue.introGreeting);
    const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
    const isLastDialog = currentDialogIndex >= totalDialogs - 1;

    const KAWAI_STYLES = {
        header: { fontFamily: KAWAI_FONTS.mali, color: KAWAI_COLORS.textDark, fontSize: '1.25rem', marginBottom: '5px' },
        instruction: { color: KAWAI_COLORS.textDark, fontSize: '0.8rem', marginBottom: '5px' },
        word: { fontSize: '1.2rem', color: KAWAI_COLORS.textGreen },
        feedbackCorrect: { fontWeight: 'bold' as 'bold', color: KAWAI_COLORS.textGreen, marginTop: '10px' },
        feedbackIncorrect: { fontWeight: 'bold' as 'bold', color: KAWAI_COLORS.accentRed, marginTop: '10px' },
    };

    const baseStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 10,
        overflow: 'hidden',
        backgroundImage: `url(${MINIGAME_BACKGROUND}), ${KAWAI_TEXTURES.texturePaper}`,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay',
        fontFamily: KAWAI_FONTS.comfortaa,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: KAWAI_COLORS.textDark,
    };

    const dialogBoxStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '600px',
        minHeight: '70px',
        padding: '15px 25px',
        backgroundColor: 'rgba(247, 240, 230, 0.8)',
        backgroundImage: KAWAI_TEXTURES.texturePaper,
        borderRadius: '20px',
        boxShadow: `8px 8px 0px ${KAWAI_COLORS.panelBorder}`,
        border: `6px solid ${KAWAI_COLORS.panelBorder}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left',
        fontSize: '1rem',
        zIndex: 15,
    };

    const nextButtonStyle: React.CSSProperties = {
        alignSelf: 'flex-end',
        marginTop: '10px',
        padding: '10px 30px',
        fontFamily: KAWAI_FONTS.mali,
        backgroundColor: KAWAI_COLORS.accentGreen,
        color: KAWAI_COLORS.textDark,
        border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transition: 'all 0.2s ease-in-out',
    };

    const logoutButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '10px 20px',
        fontFamily: KAWAI_FONTS.mali,
        backgroundColor: KAWAI_COLORS.accentPink,
        color: KAWAI_COLORS.textDark,
        border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
        fontSize: '1rem',
        fontWeight: 'bold',
        zIndex: 20,
        transition: 'all 0.2s ease-in-out',
    };

    const optionsContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexWrap: 'wrap',
        width: 'fit-content',
        maxWidth: '450px',
        gap: '10px',
        zIndex: 12,
        justifyContent: 'center',
    };

    const getOptionButtonStyle = (option: Option, isSelected: boolean): React.CSSProperties => {
        let borderColor = KAWAI_COLORS.panelBorder;
        let boxShadow = `3px 3px 0px ${KAWAI_COLORS.shadowLight}`;
        let cursor: React.CSSProperties['cursor'] = isLocked ? 'default' : 'pointer';

        if (isGameOver && option.isCorrect) {
            borderColor = KAWAI_COLORS.accentGreen;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.accentGreen}`;
        }
        else if (isAnswered && isSelected && !option.isCorrect) {
            borderColor = KAWAI_COLORS.borderRed;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.borderRed}`;
        }

        const style: React.CSSProperties = {
            padding: '8px',
            backgroundColor: KAWAI_COLORS.panelLight,
            border: `4px solid ${borderColor}`,
            borderRadius: '10px',
            cursor: cursor,
            boxShadow: boxShadow,
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease-in-out',
        };

        return style;
    };

    const formatFeedback = (text: string, selectedId: number) =>
        text.replace(/{user}/g, userName)
            .replace(/{word}/g, word)
            .replace(/{id}/g, String(selectedId));

    const getCurrentIntroText = () => {
        let text = '';
        if (isIntroArray) {
            text = dialogue.introGreeting[currentDialogIndex] || '';
        } else {
            text = dialogue.introGreeting as string;
        }
        return formatFeedback(text, 0);
    };

    const handleAnswer = (isCorrect: boolean, selectedId: number) => {
        if (isAnswered) return;

        setSelectedOptionId(selectedId);

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);

        if (isCorrect) {
            setFeedback(formatFeedback(dialogue.correctFeedback, selectedId));
            console.log('Respuesta correcta! Pregunta ID:', currentQuestion.id, 'Intentos:', newAttempts);
            console.log('Antes de marcar - Progreso actual:', progress);
            markQuestionCompleted(currentQuestion.id, newAttempts);
        } else {
            if (newAttempts < 2) {
                setFeedback(formatFeedback(dialogue.wrongAttempt1, selectedId));
                console.log('Respuesta incorrecta - Intento', newAttempts, 'de 2');
            } else {
                setFeedback(formatFeedback(dialogue.wrongAttempt2, selectedId));
                console.log('Falló después de 2 intentos en pregunta:', currentQuestion.id);
            }
        }
    };

    const resetAnswerState = () => {
        setIsAnswered(false);
        setFeedback('');
        setSelectedOptionId(null);
    }

    const handleExitClick = () => {
        setShowExitConfirmation(true);
    };

    const handleConfirmExit = () => {
        console.log('Saliendo del minijuego, reseteando índice');
        resetQuestionIndex();
        setShowExitConfirmation(false);
        navigate(-1);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    const handleNext = () => {
        if (showStory) {
            if (currentDialogIndex < totalDialogs - 1) {
                setCurrentDialogIndex(currentDialogIndex + 1);
            } else {
                setShowStory(false);
                setCurrentDialogIndex(0);
            }
        } else if (isAnswered) {
            const isCorrectFeedback = feedback.includes(dialogue.correctFeedback.split(',')[0]);

            if (isCorrectFeedback) {
                console.log('Pregunta correcta confirmada');
                console.log('Estado actual - Índice:', currentQuestionIndex, 'Total preguntas:', MINIGAME_QUESTIONS.length);
                console.log('Progreso guardado:', progress);

                if (currentQuestionIndex < MINIGAME_QUESTIONS.length - 1) {
                    console.log('⏭Hay más preguntas, avanzando...');
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

    const isCorrectFeedback = feedback.includes(dialogue.correctFeedback.split(',')[0]);
    let buttonText = '...';

    if (showStory) {
        buttonText = isLastDialog ? "¡Empecemos el Desafío!" : "Continuar";
    } else if (isAnswered) {
        if (isCorrectFeedback) {
            if (currentQuestionIndex < MINIGAME_QUESTIONS.length - 1) {
                buttonText = "Siguiente Pregunta";
            } else {
                buttonText = "¡Completado! Cerrar";
            }
        } else if (attempts < 2) {
            buttonText = "Siguiente Intento";
        } else {
            buttonText = "Cerrar y Salir";
        }
    } else {
        buttonText = '...';
    }

    const OptionButton = ({ option }: { option: Option }) => {
        const isSelected = selectedOptionId === option.id;
        const isHovered = hoveredOptionId === option.id;
        const style = getOptionButtonStyle(option, isSelected);

        let hoverStyle = {};
        if (!isAnswered && !showExitConfirmation) {
            if (isHovered) {
                hoverStyle = {
                    transform: 'scale(1.05)',
                    boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
                };
            }
        }

        return (
            <button
                key={option.id}
                onClick={() => handleAnswer(option.isCorrect, option.id)}
                disabled={isAnswered || showExitConfirmation}
                onMouseEnter={() => setHoveredOptionId(option.id)}
                onMouseLeave={() => setHoveredOptionId(null)}
                style={{
                    ...style,
                    ...hoverStyle,
                }}
            >
                <img
                    src={option.imagePath}
                    alt={`Opción ${option.id}`}
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        imageRendering: 'pixelated',
                    }}
                />
            </button>
        );
    };


    const introText = (
        <>
            <h3 style={KAWAI_STYLES.header}>{dialogue.introTitle}</h3>
            <p style={{ color: KAWAI_COLORS.textDark, fontSize: '0.9rem' }}>
                {getCurrentIntroText()}
                {isLastDialog && (
                    <>
                        <br /><br />
                        Reglas: {rules} <br />
                        Bonus: Tienes 2 oportunidades para adivinar.
                    </>
                )}
            </p>
            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                Presiona {buttonText} para seguir la conversación.
            </p>
        </>
    );

    const questionText = (
        <>
            <p style={KAWAI_STYLES.instruction}>
                {dialogue.instruction}
            </p>
            <h3 style={{ margin: 0, color: KAWAI_COLORS.textDark }}>
                {dialogue.questionHeader} <span style={KAWAI_STYLES.word}>{word}</span>
            </h3>
            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                ¡Este es tu intento {attempts + 1} de 2!
            </p>
        </>
    );

    if (showIntro && !allQuestionsCompleted) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    // completado todo
    if (showCompletionMessage || allQuestionsCompleted) {
        console.log('Pantalla de completado - Progreso:', progress);
        console.log('Preguntas completadas:', progress.completedQuestions);
        console.log('LocalStorage:', localStorage.getItem('talkie_town_minigame_progress'));

        return (
            <div style={baseStyle}>
                <div style={{
                    ...dialogBoxStyle,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}>
                    <h2 style={{ ...KAWAI_STYLES.header, fontSize: '1.5rem', marginBottom: '15px' }}>
                        🎉 ¡Felicidades {userName}! 🎉
                    </h2>
                    <p style={{ color: KAWAI_COLORS.textDark, fontSize: '1rem', marginBottom: '10px' }}>
                        {allQuestionsCompleted && !showCompletionMessage
                            ? 'Ya has completado todos los desafíos del Rincón del Café anteriormente.'
                            : 'Has completado todos los desafíos del Rincón del Café.'}
                    </p>
                    <p style={{ color: KAWAI_COLORS.textGreen, fontSize: '0.9rem', marginBottom: '20px' }}>
                        Preguntas completadas: {progress.totalCompleted} de {MINIGAME_QUESTIONS.length}
                    </p>
                    <p style={{ color: KAWAI_COLORS.textDark, fontSize: '0.8rem', marginBottom: '20px' }}>
                        IDs completados: {progress.completedQuestions.map(q => q.questionId).join(', ')}
                    </p>
                    <button
                        onClick={() => {
                            console.log('Volviendo al mapa sin resetear progreso');
                            resetQuestionIndex();
                            navigate(-1);
                        }}
                        style={nextButtonStyle}
                    >
                        Volver al Mapa
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={{
                ...baseStyle,
                pointerEvents: showExitConfirmation ? 'none' : 'auto',
            }}>

                <button
                    onClick={handleExitClick}
                    disabled={showExitConfirmation}
                    style={logoutButtonStyle}
                >
                    Regresar al Mapa
                </button>

                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px 15px',
                    backgroundColor: KAWAI_COLORS.panelLight,
                    border: `3px solid ${KAWAI_COLORS.panelBorder}`,
                    borderRadius: '15px',
                    fontFamily: KAWAI_FONTS.mali,
                    fontSize: '0.9rem',
                    zIndex: 20,
                }}>
                    Pregunta {currentQuestionIndex + 1} de {MINIGAME_QUESTIONS.length}
                </div>

                {!showStory && (
                    <div style={optionsContainerStyle}>
                        {options.map((option: Option) => (
                            <OptionButton key={option.id} option={option} />
                        ))}
                    </div>
                )}

                <div style={dialogBoxStyle}>
                    <div>
                        {showStory ? introText : (isAnswered ?
                            <p style={isCorrectFeedback ? KAWAI_STYLES.feedbackCorrect : KAWAI_STYLES.feedbackIncorrect}>
                                {feedback}
                            </p>
                            : questionText)}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={(!showStory && !isAnswered && attempts < 2) || showExitConfirmation}
                        style={{
                            ...nextButtonStyle,
                            backgroundColor: ((!showStory && !isAnswered && attempts < 2) || showExitConfirmation) ? KAWAI_COLORS.bgMedium : KAWAI_COLORS.accentGreen,
                            cursor: ((!showStory && !isAnswered && attempts < 2) || showExitConfirmation) ? 'default' : 'pointer',
                        } as React.CSSProperties}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>

            {showExitConfirmation && (
                <ExitConfirmationPopup
                    onConfirm={handleConfirmExit}
                    onCancel={handleCancelExit}
                />
            )}
        </>
    );
};

export default FirstMinigame;