import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de que MiniData-2.tsx exporte Option y MINIGAME_QUESTION
import { MINIGAME_QUESTION, Option } from './MiniData-2'; 
import LoadingScreen from './LoadingScreen';

// --- CONSTANTES DE ESTILO (AÑADIDO ACCENT RED Y BORDER RED) ---
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
    accentRed: '#FF6347', // Añadido para feedback
    borderRed: '#CC0000', // Añadido para borde incorrecto
};

const KAWAI_FONTS = {
    comfortaa: "'Comfortaa', cursive, Arial, sans-serif",
    mali: "'Mali', cursive, Arial, sans-serif",
};

const KAWAI_TEXTURES = {
    texturePaper: 'url("https://www.transparenttextures.com/patterns/white-paperboard.png")',
};

const MINIGAME_BACKGROUND = 'https://i.pinimg.com/1200x/d7/75/e9/d775e94f2bebf2853b8caf70da1a786a.jpg';

interface SecondMinigameProps {
    userName: string; 
}

const SecondMinigame: React.FC<SecondMinigameProps> = ({ userName }) => {
    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showStory, setShowStory] = useState(true);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0); 
    const [attempts, setAttempts] = useState(0);
    // NUEVOS ESTADOS para manejar la interacción de los botones
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null); 
    const [hoveredOptionId, setHoveredOptionId] = useState<number | null>(null); 

    // isLocked: Se usa para deshabilitar los botones después de responder
    const isLocked = isAnswered;

    // isGameOver: TRUE si ACERTÓ O AGOTÓ INTENTOS (determina cuándo mostrar el verde)
    // El feedback de correcto en tu código es: '¡Perfecto,'
    const isGameOver = (isAnswered && feedback.includes('¡Perfecto,')) || (attempts >= 2);

    const { sentence, options, rules, dialogue } = MINIGAME_QUESTION; 

    const isIntroArray = Array.isArray(dialogue.introGreeting);
    const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
    const isLastDialog = currentDialogIndex >= totalDialogs - 1;

    // --- ESTILOS ---
    const headerStyle = {
        fontFamily: KAWAI_FONTS.mali,
        color: KAWAI_COLORS.textDark,
        fontSize: '1.25rem',
        marginBottom: '5px',
    };

    const instructionStyle = {
        color: KAWAI_COLORS.textDark,
        fontSize: '0.8rem',
        marginBottom: '5px'
    };

    const wordStyle = {
        fontSize: '1.2rem',
        color: KAWAI_COLORS.textGreen
    };

    const feedbackCorrectStyle = {
        fontWeight: 'bold' as 'bold',
        color: KAWAI_COLORS.textGreen,
        marginTop: '10px',
    };

    const feedbackIncorrectStyle = {
        fontWeight: 'bold' as 'bold',
        color: KAWAI_COLORS.accentRed, // Usar KAWAI_COLORS.accentRed
        marginTop: '10px',
    };

    const baseStyle = {
        position: 'fixed' as 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 10,
        overflow: 'hidden' as 'hidden',
        backgroundImage: `url(${MINIGAME_BACKGROUND}), ${KAWAI_TEXTURES.texturePaper}`,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay',
        fontFamily: KAWAI_FONTS.comfortaa,
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: KAWAI_COLORS.textDark,
    };

    const dialogBoxStyle = {
        position: 'absolute' as 'absolute',
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
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between',
        textAlign: 'left' as 'left',
        fontSize: '1rem',
        zIndex: 15,
    };

    const nextButtonStyle = {
        alignSelf: 'flex-end' as 'flex-end',
        marginTop: '10px',
        padding: '10px 30px',
        fontFamily: KAWAI_FONTS.mali,
        backgroundColor: KAWAI_COLORS.accentGreen,
        color: KAWAI_COLORS.textDark,
        border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
        fontWeight: 'bold' as 'bold',
        textTransform: 'uppercase' as 'uppercase',
        transition: 'all 0.2s ease-in-out',
    };

    const logoutButtonStyle = {
        position: 'absolute' as 'absolute',
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
        fontWeight: 'bold' as 'bold',
        zIndex: 20,
        transition: 'all 0.2s ease-in-out',
    };

    const optionsContainerStyle = {
        position: 'absolute' as 'absolute',
        top: '100px',
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        width: 'fit-content',
        maxWidth: '450px', 
        gap: '10px',
        zIndex: 12,
        justifyContent: 'center', 
    };

    // --- FUNCIÓN DE ESTILO CORREGIDA PARA BOTONES DE TEXTO ---
    const getOptionButtonStyle = (option: Option, isSelected: boolean, isHovered: boolean) => {
        let borderColor = KAWAI_COLORS.panelBorder;
        let boxShadow = `3px 3px 0px ${KAWAI_COLORS.shadowLight}`;
        let cursor = isLocked ? 'default' : 'pointer' as 'pointer';
        let backgroundColor = KAWAI_COLORS.panelLight;
        
        // 1. Mostrar color VERDE solo si el juego terminó (Acertó o Perdió totalmente)
        if (isGameOver && option.isCorrect) {
            borderColor = KAWAI_COLORS.accentGreen;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.accentGreen}`;
            // Mantener el fondo si es correcto y terminado, a menos que quieras que cambie
            backgroundColor = KAWAI_COLORS.panelLight; 
        } 
        // 2. Mostrar color ROJO si se respondió, fue la seleccionada, Y es incorrecta.
        else if (isAnswered && isSelected && !option.isCorrect) {
            borderColor = KAWAI_COLORS.borderRed;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.borderRed}`;
            backgroundColor = KAWAI_COLORS.accentPink; // Fondo rosa/rojo para lo incorrecto seleccionado
        }

        // Estilos base
        const baseStyle = {
            padding: '15px 20px', 
            backgroundColor: backgroundColor,
            border: `4px solid ${borderColor}`,
            borderRadius: '10px',
            cursor: cursor,
            boxShadow: boxShadow,
            width: '120px', 
            height: '60px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease-in-out',
            fontWeight: 'bold' as 'bold',
            fontSize: '1rem',
        };

        let hoverStyle = {};
        // Aplicar hover solo si no está bloqueado (isAnswered = false)
        if (!isAnswered && isHovered) {
             hoverStyle = {
                transform: 'scale(1.05)',
                boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
            };
        }
        
        return { ...baseStyle, ...hoverStyle };
    };
    // ------------------------------------

    const formatFeedback = (text: string, selectedId: number) => {
        const selectedOptionText = options.find(opt => opt.id === selectedId)?.text || '';
        const correctOptionText = options.find(opt => opt.isCorrect)?.text || '';

        return text.replace(/{user}/g, userName)
                    .replace(/{word}/g, correctOptionText) // Reemplaza {word} con la correcta (para el feedback de error)
                    .replace(/{text}/g, selectedOptionText) // Reemplaza {text} con la seleccionada
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
        if (isAnswered) return;

        setSelectedOptionId(selectedId); // Guardar la opción seleccionada

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);
        
        if (isCorrect) {
            setFeedback(formatFeedback(dialogue.correctFeedback, selectedId));
        } else {
            const feedbackText = newAttempts < 2 ? dialogue.wrongAttempt1 : dialogue.wrongAttempt2;

            // El formateo ahora se hace en la función formatFeedback, ya que necesita el ID
            setFeedback(formatFeedback(feedbackText, selectedId));
        }
    };

    const resetAnswerState = () => {
        setIsAnswered(false);
        setFeedback('');
        setSelectedOptionId(null);
    }

    const handleClose = () => {
        navigate(-1);
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
            const isCorrectFeedback = feedback.includes('¡Perfecto,'); 

            if (isCorrectFeedback || attempts >= 2) {
                handleClose();
            } else {
                resetAnswerState();
            }
        }
    };

    const isCorrectFeedback = feedback.includes('¡Perfecto,');
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
        buttonText = '...';
    }

    // --- COMPONENTE DE BOTÓN CON LÓGICA DE HOVER ---
    const OptionButton = ({ option }: { option: Option }) => {
        const isSelected = selectedOptionId === option.id;
        const isHovered = hoveredOptionId === option.id;
        // Usar la función de estilo corregida
        const style = getOptionButtonStyle(option, isSelected, isHovered); 

        return (
            <button
                key={option.id}
                onClick={() => handleAnswer(option.isCorrect, option.id)}
                disabled={isAnswered}
                onMouseEnter={() => setHoveredOptionId(option.id)}
                onMouseLeave={() => setHoveredOptionId(null)}
                style={style as React.CSSProperties}
            >
                {option.text}
            </button>
        );
    };
    // ---------------------------------------------

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
                Presiona **{buttonText}** para seguir la conversación.
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
                <span style={wordStyle}>
                    {sentence.replace('{gap}', '____')} 
                </span>
            </h3>
            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                ¡Este es tu intento **{attempts + 1} de 2**!
            </p>
        </>
    );

    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div style={baseStyle}>

            <button
                onClick={handleClose}
                style={logoutButtonStyle as React.CSSProperties}
            >
                Regresar al Mapa
            </button>

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
                    disabled={!showStory && !isAnswered && attempts < 2}
                    style={{
                        ...nextButtonStyle,
                        backgroundColor: (!showStory && !isAnswered && attempts < 2) ? KAWAI_COLORS.bgMedium : KAWAI_COLORS.accentGreen,
                        cursor: (!showStory && !isAnswered && attempts < 2) ? 'default' : 'pointer',
                    } as React.CSSProperties}
                >
                    {buttonText}
                </button>
            </div>

        </div>
    );
};

export default SecondMinigame;