import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_QUESTION, Option } from './MinigameData'; 
import LoadingScreen from './LoadingScreen'; // Asegúrate de tener este componente

// --- VARIABLES DE ESTILO KAWAI (Extraídas de :root) ---
const KAWAI_COLORS = {
    bgLight: '#FBF0DF',
    bgMedium: '#f7e7d4',
    bgDark: '#A58B79',
    panelLight: '#F7F0E6', // RGB: 247, 240, 230
    panelBorder: '#8B7360',
    textDark: '#4A3C32',
    textMedium: '#F7F0E6',
    accentGreen: '#B2D8BB',
    accentPink: '#FFC0CB',
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

// Se mantiene el fondo específico del minijuego o se usa una de las variables Kawaii
const MINIGAME_BACKGROUND = 'https://i.pinimg.com/1200x/6b/0c/43/6b0c43bd6a5f53dfeddfb355fb56ff78.jpg'; 

const FirstMinigame: React.FC = () => { 
    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showStory, setShowStory] = useState(true); // true: Muestra reglas, false: Muestra juego
    
    const { word, options, rules } = MINIGAME_QUESTION;
    
    // --- LÓGICA DE RESPUESTA ---

    const handleAnswer = (isCorrect: boolean) => {
        if (isAnswered) return; 

        setIsAnswered(true);

        if (isCorrect) {
            setFeedback('¡Correcto! ¡Obtuviste la palabra!');
        } else {
            setFeedback(`Incorrecto. La respuesta era: "${word}".`);
        }
    };

    const handleClose = () => {
        setIsAnswered(false);
        setFeedback('');
        // Vuelve a la pantalla anterior (WorldScreen)
        navigate(-1); 
    };
    
    // Función para avanzar la historia (de las reglas al juego)
    const handleNext = () => {
        if (showStory) {
            setShowStory(false); // Pasa a mostrar el juego
        } else if (isAnswered) {
            // Si ya respondió, el botón "Continuar" funciona como cerrar
            handleClose();
        }
    };

    // --- ESTILOS CON VARIABLES KAWAI ---
    
    // Contenedor base (Fondo y pantalla completa)
    const baseStyle = {
        position: 'fixed' as 'fixed', 
        top: 0, left: 0, 
        width: '100vw', height: '100vh',
        zIndex: 10,
        overflow: 'hidden' as 'hidden',
        backgroundImage: `url(${MINIGAME_BACKGROUND}), ${KAWAI_TEXTURES.texturePaper}`, // Fondo + textura de papel
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay', // Para mezclar la textura y el fondo
        fontFamily: KAWAI_FONTS.comfortaa,
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: KAWAI_COLORS.textDark, // Color de texto base
    };

    // Estilo del cuadro de diálogo/texto principal (PARTE INFERIOR)
    const dialogBoxStyle = {
        position: 'absolute' as 'absolute',
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '90%',
        maxWidth: '600px', 
        minHeight: '70px', 
        padding: '15px 25px', 
        
        // <<< AJUSTE CLAVE: Fondo semitransparente
        backgroundColor: 'rgba(247, 240, 230, 0.8)', // PanelLight (#F7F0E6) con 90% de opacidad
        
        // La textura de papel se sigue aplicando sobre el color de fondo.
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
    
    // Estilo del botón de Continuar/Cerrar dentro del cuadro de diálogo (kawaii-button adaptado)
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

    // Contenedor de Opciones (Superior Izquierda, compacto 2x2)
    const optionsContainerStyle = {
        position: 'absolute' as 'absolute',
        top: '100px', 
        left: '20px', 
        
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        width: 'fit-content', 
        gap: '10px', 
        zIndex: 12,
    };

    // Estilo de los botones de opción (Más pequeños, ajustados a Kawaii)
    const optionButtonStyle = {
        padding: '8px', 
        backgroundColor: KAWAI_COLORS.panelLight, 
        border: `4px solid ${KAWAI_COLORS.panelBorder}`, 
        borderRadius: '10px',
        cursor: isAnswered ? 'default' : 'pointer' as 'pointer',
        boxShadow: `3px 3px 0px ${KAWAI_COLORS.shadowLight}`, 
        width: '100px', 
        height: '100px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
    };

    // Botón para salir (PARTE SUPERIOR IZQUIERDA - Ajustado a estilo Kawaii)
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

    // Estilos internos
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


    // --- RENDERIZADO ---

    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div style={baseStyle}>

            {/* 1. Botón de Regresar al Mapa (Superior Izquierda) */}
            <button 
                onClick={handleClose}
                style={logoutButtonStyle}
            >
                Regresar al Mapa
            </button>

            {/* 2. Opciones de Imagen (Solo si la historia ha terminado) */}
            {!showStory && (
                <div style={optionsContainerStyle}>
                    {options.map((option: Option) => ( 
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(option.isCorrect)} 
                            disabled={isAnswered}
                            style={{
                                ...optionButtonStyle,
                                border: isAnswered 
                                    ? (option.isCorrect ? `4px solid ${KAWAI_COLORS.accentGreen}` : `4px solid red`) 
                                    : `4px solid ${KAWAI_COLORS.panelBorder}`,
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
                    ))}
                </div>
            )}

            {/* 3. Cuadro de Diálogo/Texto (Inferior) */}
            <div style={dialogBoxStyle}>
                <div>
                    {showStory ? (
                        <>
                            <h3 style={headerStyle}>Bienvenido al Mini-juego 1</h3>
                            <p style={{ color: KAWAI_COLORS.textDark, fontSize: '0.9rem' }}>**Historia/Reglas:** {rules}</p>
                            <p style={{ marginTop: '5px', fontSize: '0.75rem', color: KAWAI_COLORS.textDark }}>
                                *Presiona Continuar para empezar el desafío.*
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Instrucción pequeña y la pregunta */}
                            <p style={instructionStyle}>
                                Instrucción: Selecciona la imagen correcta.
                            </p>
                            <h3 style={{ margin: 0, color: KAWAI_COLORS.textDark }}>
                                **Encuentra la palabra:** <span style={wordStyle}>{word}</span>
                            </h3>

                            {/* Feedback después de responder */}
                            {isAnswered && (
                                <p style={feedback.includes('Correcto') ? feedbackCorrectStyle : feedbackIncorrectStyle}>
                                    {feedback}
                                </p>
                            )}
                        </>
                    )}
                </div>

                {/* Botón de Continuar o Cerrar */}
                <button 
                    onClick={handleNext}
                    disabled={!showStory && !isAnswered}
                    style={{ 
                        ...nextButtonStyle,
                        backgroundColor: (!showStory && !isAnswered) ? KAWAI_COLORS.bgMedium : nextButtonStyle.backgroundColor,
                        cursor: (!showStory && !isAnswered) ? 'default' : 'pointer',
                    }}
                >
                    {showStory ? "Continuar" : (isAnswered ? "Cerrar y Salir" : "...")}
                </button>
            </div>
            
        </div>
    );
};

export default FirstMinigame;