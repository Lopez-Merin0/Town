import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_3_QUESTIONS, Option } from './MiniData-3';
import LoadingScreen from './LoadingScreen';
import { useMinigame3Progress } from './contexts/Minigame3ProgressContext';

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

const MINIGAME_BACKGROUND = './thirdGame.jpg';

interface ThirdMinigameProps {
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


const ThirdMinigame: React.FC<ThirdMinigameProps> = ({ userName }) => {
    const navigate = useNavigate();
    const { progress, markQuestionCompleted, moveToNextQuestion, getCurrentQuestionIndex, resetQuestionIndex } = useMinigame3Progress();

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
    const currentQuestion = MINIGAME_3_QUESTIONS[currentQuestionIndex];

    console.log('Minijuego 3 renderizado - Índice:', currentQuestionIndex, 'Pregunta:', currentQuestion?.id);
    console.log('Progreso al iniciar:', progress);

    const allQuestionsCompleted = progress.totalCompleted >= MINIGAME_3_QUESTIONS.length;

    React.useEffect(() => {
        if (allQuestionsCompleted && !showCompletionMessage) {
            console.log('Ya completó todos los minijuegos 3 anteriormente');
            setShowIntro(false);
            setShowCompletionMessage(true);
        }
    }, [allQuestionsCompleted, showCompletionMessage]);

    if (!currentQuestion && !showCompletionMessage && !allQuestionsCompleted) {
        setShowCompletionMessage(true);
    }

    const isLocked = isAnswered;

    const isCorrectFeedback = feedback.includes('¡Excelente oído!') || feedback.includes('¡Esoooo!');
    const isGameOver = (isAnswered && currentQuestion && feedback.includes(currentQuestion.dialogue.correctFeedback.split('.')[0])) || (attempts >= 2);

    const { audioText, audioUrl, options, rules, dialogue } = currentQuestion || MINIGAME_3_QUESTIONS[0];

    const isIntroArray = Array.isArray(dialogue.introGreeting);
    const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
    const isLastDialog = currentDialogIndex >= totalDialogs - 1;

    const headerStyle = {
        fontFamily: KAWAI_FONTS.mali, color: KAWAI_COLORS.textDark, fontSize: '1.25rem', marginBottom: '5px',
    };
    const instructionStyle = {
        color: KAWAI_COLORS.textDark, fontSize: '0.8rem', marginBottom: '5px'
    };

    const audioPromptStyle = {
        fontSize: '1.2rem', color: KAWAI_COLORS.textDark, padding: '10px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '10px',
    };

    const feedbackCorrectStyle = {
        fontWeight: 'bold' as 'bold', color: KAWAI_COLORS.textGreen, marginTop: '10px',
    };
    const feedbackIncorrectStyle = {
        fontWeight: 'bold' as 'bold', color: KAWAI_COLORS.accentRed, marginTop: '10px',
    };
    const baseStyle = {
        position: 'fixed' as 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10,
        overflow: 'hidden' as 'hidden',
        backgroundImage: `url(${MINIGAME_BACKGROUND}), ${KAWAI_TEXTURES.texturePaper}`,
        backgroundSize: 'cover, auto', backgroundPosition: 'center, center', backgroundBlendMode: 'overlay',
        fontFamily: KAWAI_FONTS.comfortaa, display: 'flex', flexDirection: 'column' as 'column',
        alignItems: 'center', justifyContent: 'flex-start', color: KAWAI_COLORS.textDark,
    };

    const dialogBoxStyle = {
        position: 'absolute' as 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '550px',
        minHeight: showStory ? '180px' : '120px',
        padding: '15px 25px',
        backgroundColor: 'rgba(247, 240, 230, 0.8)', backgroundImage: KAWAI_TEXTURES.texturePaper,
        borderRadius: '20px', boxShadow: `8px 8px 0px ${KAWAI_COLORS.panelBorder}`,
        border: `6px solid ${KAWAI_COLORS.panelBorder}`, display: 'flex', flexDirection: 'column' as 'column',
        justifyContent: 'space-between', textAlign: 'left' as 'left', fontSize: '1rem', zIndex: 15,
    };

    const nextButtonStyle = {
        alignSelf: 'flex-end' as 'flex-end', marginTop: '10px', padding: '10px 30px', fontFamily: KAWAI_FONTS.mali,
        backgroundColor: KAWAI_COLORS.accentGreen, color: KAWAI_COLORS.textDark, border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '20px', cursor: 'pointer', boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
        fontWeight: 'bold' as 'bold', textTransform: 'uppercase' as 'uppercase', transition: 'all 0.2s ease-in-out',
    };
    const logoutButtonStyle = {
        position: 'absolute' as 'absolute', top: '20px', left: '20px', padding: '10px 20px', fontFamily: KAWAI_FONTS.mali,
        backgroundColor: KAWAI_COLORS.accentPink, color: KAWAI_COLORS.textDark, border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '20px', cursor: 'pointer', boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
        fontSize: '1rem', fontWeight: 'bold' as 'bold', zIndex: 20, transition: 'all 0.2s ease-in-out',
    };

    const optionsContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        width: '90%',
        maxWidth: '450px',
        zIndex: 12,
        justifyContent: 'center',
    };

    const getOptionButtonStyle = (option: Option, isSelected: boolean, isHovered: boolean) => {
        let borderColor = KAWAI_COLORS.panelBorder;
        let boxShadow = `3px 3px 0px ${KAWAI_COLORS.shadowLight}`;
        let cursor = (isLocked || showExitConfirmation) ? 'default' : 'pointer' as 'pointer';
        let backgroundColor = KAWAI_COLORS.panelLight;

        if (isGameOver && option.isCorrect) {
            borderColor = KAWAI_COLORS.textGreen;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.textGreen}`;
            backgroundColor = KAWAI_COLORS.accentGreen;
        }
        else if (isAnswered && isSelected && !option.isCorrect) {
            borderColor = KAWAI_COLORS.borderRed;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.borderRed}`;
            backgroundColor = KAWAI_COLORS.accentPink;
        }

        const baseStyle: React.CSSProperties = {
            padding: '10px',
            backgroundColor: backgroundColor,
            border: `4px solid ${borderColor}`,
            borderRadius: '10px',
            cursor: cursor,
            boxShadow: boxShadow,
            minWidth: '200px',
            height: 'auto',
            textAlign: 'center' as 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease-in-out',
            fontWeight: 'bold' as 'bold',
            fontSize: '0.9rem',
            whiteSpace: 'normal' as 'normal',
        };

        let hoverStyle = {};
        if (!isAnswered && !showExitConfirmation && isHovered) {
            hoverStyle = {
                transform: 'scale(1.02)',
                boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
            };
        }

        return { ...baseStyle, ...hoverStyle };
    };

    const formatFeedback = (text: string, selectedId: number) => {
        const selectedOptionText = options.find(opt => opt.id === selectedId)?.text || '';
        const correctOptionText = options.find(opt => opt.isCorrect)?.text || '';

        return text.replace(/{user}/g, userName)
            .replace(/{word}/g, correctOptionText)
            .replace(/{text}/g, selectedOptionText)
            .replace(/{id}/g, String(selectedId));
    };

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
        if (isAnswered || showExitConfirmation) return;

        setSelectedOptionId(selectedId);

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);

        if (isCorrect) {
            setFeedback(formatFeedback(dialogue.correctFeedback, selectedId));
            console.log('Respuesta correcta! Pregunta ID:', currentQuestion.id, 'Intentos:', newAttempts);
            markQuestionCompleted(currentQuestion.id, newAttempts);
        } else {
            const feedbackText = newAttempts < 2 ? dialogue.wrongAttempt1 : dialogue.wrongAttempt2;
            setFeedback(formatFeedback(feedbackText, selectedId));
            console.log(newAttempts < 2 ? 'Respuesta incorrecta' : '💔 Falló después de 2 intentos');
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
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
        console.log('Saliendo del minijuego 3, reseteando índice');
        resetQuestionIndex();
        setShowExitConfirmation(false);
        navigate(-1);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    const handleNext = () => {
        if (showExitConfirmation) return;

        if (showStory) {
            if (currentDialogIndex < totalDialogs - 1) {
                setCurrentDialogIndex(currentDialogIndex + 1);
            } else {
                setShowStory(false);
                setCurrentDialogIndex(0);
            }
        } else if (isAnswered) {
            if (isCorrectFeedback) {
                console.log('Pregunta correcta confirmada');
                console.log('Estado actual - Índice:', currentQuestionIndex, 'Total preguntas:', MINIGAME_3_QUESTIONS.length);

                if (currentQuestionIndex < MINIGAME_3_QUESTIONS.length - 1) {
                    console.log('⏭Hay más preguntas, avanzando...');
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

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    let buttonText = '...';
    if (showStory) {
        buttonText = isLastDialog ? "¡Empecemos el Desafío!" : "Continuar";
    } else if (isAnswered) {
        if (isCorrectFeedback) {
            buttonText = "¡Logrado! Cerrar";
        } else if (attempts < 2) {
            buttonText = "Siguiente Intento";
        } else {
            buttonText = "Cerrar y Salir";
        }
    } else {
        buttonText = 'Responder';
    }

    const OptionButton = ({ option }: { option: Option }) => {
        const isSelected = selectedOptionId === option.id;
        const isHovered = hoveredOptionId === option.id;
        const style = getOptionButtonStyle(option, isSelected, isHovered);

        return (
            <button
                key={option.id}
                onClick={() => handleAnswer(option.isCorrect, option.id)}
                disabled={isAnswered || showExitConfirmation}
                onMouseEnter={() => setHoveredOptionId(option.id)}
                onMouseLeave={() => setHoveredOptionId(null)}
                style={style as React.CSSProperties}
            >
                {option.text}
            </button>
        );
    };

    const introText = (
        <>
            <h3 style={headerStyle}>{dialogue.introTitle}</h3>
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
                Presiona {buttonText.replace(/\*\*/g, '')} para seguir la conversación.
            </p>
        </>
    );

    const questionText = (
        <>
            <p style={instructionStyle}>
                {dialogue.instruction}
            </p>
            <h3 style={{ margin: 0, color: KAWAI_COLORS.textDark, textAlign: 'center' as 'center' }}>
                {dialogue.questionHeader}
            </h3>

            <div style={audioPromptStyle}>
                <button
                    onClick={handlePlayAudio}
                    disabled={isPlaying || isAnswered}
                    style={{
                        backgroundColor: KAWAI_COLORS.accentPink,
                        color: KAWAI_COLORS.textDark,
                        border: `4px solid ${KAWAI_COLORS.panelBorder}`,
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: (isPlaying || isAnswered) ? 'default' : 'pointer',
                        boxShadow: isPlaying ? `2px 2px 0px ${KAWAI_COLORS.bgDark}` : `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
                        transition: 'all 0.1s ease-in-out',
                        transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
                    }}
                >
                    {isPlaying ? '⏸️' : '🔊'}
                </button>
            </div>

            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                ¡Este es tu intento {attempts + 1} de 2!
            </p>
        </>
    );

    if (showIntro && !allQuestionsCompleted) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    if (showCompletionMessage || allQuestionsCompleted) {
        console.log('Pantalla de completado - Progreso:', progress);

        return (
            <div style={baseStyle}>
                <div style={{
                    ...dialogBoxStyle,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}>
                    <h2 style={{ ...headerStyle, fontSize: '1.5rem', marginBottom: '15px' }}>
                        🎉 ¡Felicidades! 🎉
                    </h2>
                    <p style={{ color: KAWAI_COLORS.textDark, fontSize: '1rem', marginBottom: '10px' }}>
                        {allQuestionsCompleted && !showCompletionMessage
                            ? 'Ya has completado todos los desafíos del Rincón del Caramelo anteriormente.'
                            : 'Has completado todos los desafíos del Rincón del Caramelo.'}
                    </p>
                    <p style={{ color: KAWAI_COLORS.textGreen, fontSize: '0.9rem', marginBottom: '20px' }}>
                        Preguntas completadas: {progress.totalCompleted} de {MINIGAME_3_QUESTIONS.length}
                    </p>
                    <button
                        onClick={() => {
                            console.log('Volviendo al mapa sin resetear progreso');
                            resetQuestionIndex();
                            navigate(-1);
                        }}
                        style={nextButtonStyle as React.CSSProperties}
                    >
                        Volver al Mapa
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                preload="auto"
            />

            <div style={{
                ...baseStyle,
                pointerEvents: showExitConfirmation ? 'none' : 'auto',
            }}>

                <button
                    onClick={handleExitClick}
                    disabled={showExitConfirmation}
                    style={logoutButtonStyle as React.CSSProperties}
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
                    Pregunta {currentQuestionIndex + 1} de {MINIGAME_3_QUESTIONS.length}
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
                            <p style={isCorrectFeedback ? feedbackCorrectStyle : feedbackIncorrectStyle}>
                                {feedback}
                            </p>
                            : questionText)}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={(!showStory && !isAnswered && attempts < 2) || showExitConfirmation}
                        style={{
                            ...nextButtonStyle,
                            backgroundColor: isCorrectFeedback || showStory || isAnswered ? KAWAI_COLORS.accentGreen : KAWAI_COLORS.bgMedium,
                            cursor: ((!showStory && !isAnswered && attempts < 2) || showExitConfirmation) ? 'default' : 'pointer',
                        } as React.CSSProperties}
                    >
                        {buttonText.replace(/\*\*/g, '')}
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

export default ThirdMinigame;