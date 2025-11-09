import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_QUESTION, Option } from './MinigameData';
import LoadingScreen from './LoadingScreen';

// --- VARIABLES DE ESTILO KAWAI (Extraídas de :root) ---
const KAWAI_COLORS = {
    bgLight: '#FBF0DF',
    bgMedium: '#f7e7d4', // Usado para botones deshabilitados
    bgDark: '#A58B79',
    panelLight: '#F7F0E6', // Usado para el fondo de opciones/diálogo
    panelBorder: '#8B7360',
    textDark: '#4A3C32',
    textMedium: '#F7F0E6',
    accentGreen: '#B2D8BB', // Usado para aciertos
    accentPink: '#FFC0CB', // Usado para el botón de salir
    shadowLight: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.3)',
};

const KAWAI_FONTS = {
    comfortaa: "'Comfortaa', cursive, Arial, sans-serif",
    mali: "'Mali', cursive, Arial, sans-serif",
};

const KAWAI_TEXTURES = {
    texturePaper: 'url("https://www.transparenttextures.com/patterns/white-paperboard.png")',
};

const MINIGAME_BACKGROUND = 'https://i.pinimg.com/1200x/6b/0c/43/6b0c43bd6a5f53dfeddfb355fb56ff78.jpg';

interface FirstMinigameProps {
    userName: string; // Se requiere para el diálogo personalizado
}

const FirstMinigame: React.FC<FirstMinigameProps> = ({ userName }) => {
    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showStory, setShowStory] = useState(true);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0); // <-- NUEVO ESTADO PARA DIÁLOGO
    const [attempts, setAttempts] = useState(0);

    // Controla si se pueden hacer más clics
    const isLocked = isAnswered || attempts >= 2;

    // Extraer la data del MinigameData
    const { word, options, rules, dialogue } = MINIGAME_QUESTION;

    // Determinar si la introducción es un array
    const isIntroArray = Array.isArray(dialogue.introGreeting);
    const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
    const isLastDialog = currentDialogIndex >= totalDialogs - 1;


    // ************************************************************
    // 1. DECLARACIÓN DE ESTILOS INTERNOS
    // ************************************************************
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
        color: KAWAI_COLORS.accentGreen
    };

    const feedbackCorrectStyle = {
        fontWeight: 'bold' as 'bold',
        color: KAWAI_COLORS.accentGreen,
        marginTop: '10px',
    };

    const feedbackIncorrectStyle = {
        fontWeight: 'bold' as 'bold',
        color: 'red',
        marginTop: '10px',
    };

    // Estilos principales (Mantenerlos cerca para evitar problemas de referencia si se necesita)
    // Contenedor base
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

    // Estilo del cuadro de diálogo
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

    // Estilo del botón de Continuar/Cerrar
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

    // Estilo del botón de Salir
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

    // Contenedor de Opciones
    const optionsContainerStyle = {
        position: 'absolute' as 'absolute',
        top: '100px',
        left: '50%', // Centrar opciones horizontalmente
        transform: 'translateX(-50%)', // Centrar opciones horizontalmente
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        width: 'fit-content',
        maxWidth: '450px', // Limitar el ancho para que no se extienda demasiado
        gap: '10px',
        zIndex: 12,
        justifyContent: 'center', // Centrar ítems dentro del contenedor
    };

    // Estilo de los botones de opción (base)
    const optionButtonStyle = {
        padding: '8px',
        backgroundColor: KAWAI_COLORS.panelLight,
        border: `4px solid ${KAWAI_COLORS.panelBorder}`,
        borderRadius: '10px',
        cursor: isLocked ? 'default' : 'pointer' as 'pointer',
        boxShadow: `3px 3px 0px ${KAWAI_COLORS.shadowLight}`,
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
    };

    // ************************************************************
    // 2. LÓGICA DEL JUEGO
    // ************************************************************

    // Función para reemplazar placeholders
    const formatFeedback = (text: string, selectedId: number) =>
        text.replace(/{user}/g, userName)
            .replace(/{word}/g, word)
            .replace(/{id}/g, String(selectedId));

    // Función para obtener el texto actual de la introducción y formatearlo
    const getCurrentIntroText = () => {
        let text = '';
        if (isIntroArray) {
            text = dialogue.introGreeting[currentDialogIndex] || '';
        } else {
            // Manejar el caso si no es un array (por si acaso)
            text = dialogue.introGreeting as string;
        }
        return formatFeedback(text, 0); // No usamos selectedId aquí
    };

    const handleAnswer = (isCorrect: boolean, selectedId: number) => {
        if (isLocked) return;

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsAnswered(true);

        if (isCorrect) {
            setFeedback(formatFeedback(dialogue.correctFeedback, selectedId));
        } else {
            if (newAttempts < 2) {
                setFeedback(formatFeedback(dialogue.wrongAttempt1, selectedId));
            } else {
                setFeedback(formatFeedback(dialogue.wrongAttempt2, selectedId));
            }
        }
    };

    const resetAnswerState = () => {
        setIsAnswered(false);
        setFeedback('');
    }

    const handleClose = () => {
        navigate(-1);
    };

    const handleNext = () => {
        if (showStory) {
            if (currentDialogIndex < totalDialogs - 1) {
                // Si aún hay diálogos en la historia, avanza al siguiente
                setCurrentDialogIndex(currentDialogIndex + 1);
            } else {
                // Si es el último diálogo de la historia, pasa a la pregunta
                setShowStory(false);
                setCurrentDialogIndex(0); // Resetea el índice para otros usos si fuera necesario
            }
        } else if (isAnswered) {
            // Lógica de feedback/cierre del juego
            const isCorrect = feedback.includes(dialogue.correctFeedback.split(',')[0]);

            if (isCorrect || attempts >= 2) {
                // Si acertó o agotó los 2 intentos: Cierra
                handleClose();
            } else {
                // Si falló y le queda 1 intento: Resetea para el siguiente intento
                resetAnswerState();
            }
        }
    };

    // Lógica para el texto del botón
    const isCorrect = feedback.includes(dialogue.correctFeedback.split(',')[0]);
    let buttonText = '...';

    if (showStory) {
        buttonText = isLastDialog ? "¡Empecemos el Desafío!" : "Continuar";
    } else if (isAnswered) {
        if (isCorrect) {
            buttonText = "¡Logrado! Cerrar";
        } else if (attempts < 2) {
            buttonText = "Siguiente Intento";
        } else {
            buttonText = "Cerrar y Salir";
        }
    } else {
        buttonText = '...'; // No debería pasar si no ha respondido
    }


    // ************************************************************
    // 3. DECLARACIÓN DE TEXTOS DE RENDERIZADO
    // ************************************************************

    // ** Texto de la historia/diálogo (Ahora usa el índice) **
    const introText = (
        <>
            <h3 style={headerStyle}>{dialogue.introTitle}</h3>
            <p style={{ color: KAWAI_COLORS.textDark, fontSize: '0.9rem' }}>
                {getCurrentIntroText()}
                {/* Añadir reglas y nota de intentos solo en la última fase de la intro */}
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

    // Texto de la pregunta
    const questionText = (
        <>
            <p style={instructionStyle}>
                {dialogue.instruction}
            </p>
            <h3 style={{ margin: 0, color: KAWAI_COLORS.textDark }}>
                {dialogue.questionHeader} <span style={wordStyle}>{word}</span>
            </h3>
            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                ¡Este es tu intento {attempts + 1} de 2!
            </p>
        </>
    );


    // --- RENDERIZADO ---

    if (showIntro) {
        // Asegúrate de que este componente LoadingScreen exista e importe correctamente
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div style={baseStyle}>

            {/* 1. Botón de Regresar al Mapa */}
            <button
                onClick={handleClose}
                style={logoutButtonStyle}
            >
                Regresar al Mapa
            </button>

            {/* 2. Opciones de Imagen (Solo si la historia ha terminado) */}
            {!showStory && (
                <div style={optionsContainerStyle}>
                    {options.map((option: Option) => {
                        let borderColor = KAWAI_COLORS.panelBorder;

                        // Resalta la respuesta correcta
                        if (isAnswered && option.isCorrect) {
                            borderColor = KAWAI_COLORS.accentGreen;
                        }

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.isCorrect, option.id)}
                                disabled={isLocked}
                                style={{
                                    ...optionButtonStyle,
                                    border: `4px solid ${borderColor}`,
                                    // Sombreado de éxito
                                    boxShadow: isAnswered && option.isCorrect ? `5px 5px 0px ${KAWAI_COLORS.accentGreen}` : `3px 3px 0px ${KAWAI_COLORS.shadowLight}`,
                                }}
                            >
                                <img
                                    src={option.imagePath}
                                    alt={`Opción ${option.id}`}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'contain' as 'contain',
                                        imageRendering: 'pixelated',
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 3. Cuadro de Diálogo/Texto (Inferior) */}
            <div style={dialogBoxStyle}>
                <div>
                    {showStory ? introText : (isAnswered ?
                        // Muestra solo el feedback si ya respondió
                        <p style={isCorrect ? feedbackCorrectStyle : feedbackIncorrectStyle}>
                            {feedback}
                        </p>
                        // Muestra la pregunta si no ha respondido y no está en la historia
                        : questionText)}
                </div>

                {/* Botón de Continuar o Cerrar */}
                <button
                    onClick={handleNext}
                    // Deshabilita si está en la pregunta y no ha respondido AÚN
                    disabled={!showStory && !isAnswered && attempts < 2}
                    style={{
                        ...nextButtonStyle,
                        backgroundColor: (!showStory && !isAnswered && attempts < 2) ? KAWAI_COLORS.bgMedium : KAWAI_COLORS.accentGreen,
                        cursor: (!showStory && !isAnswered && attempts < 2) ? 'default' : 'pointer',
                    }}
                >
                    {buttonText}
                </button>
            </div>

        </div>
    );
};

export default FirstMinigame;