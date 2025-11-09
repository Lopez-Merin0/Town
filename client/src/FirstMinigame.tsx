import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAME_QUESTION, Option } from './MinigameData';
import LoadingScreen from './LoadingScreen';

const MINIGAME_BACKGROUND = 'https://i.pinimg.com/1200x/6b/0c/43/6b0c43bd6a5f53dfeddfb355fb56ff78.jpg';

const FirstMinigame: React.FC = () => {
    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(true);

    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');

    const { word, options, rules } = MINIGAME_QUESTION;
    const fixedTitle = "Primer Mini-juego - ¡Encuentra la Palabra!";

    const handleAnswer = (isCorrect: boolean) => {
        if (isAnswered) return;

        setIsAnswered(true);

        if (isCorrect) {
            setFeedback('¡Correcto! Has identificado la palabra.');
        } else {
            setFeedback(`Incorrecto. La respuesta correcta es la imagen del objeto: "${word}".`);
        }
    };

    const handleClose = () => {
        setIsAnswered(false);
        setFeedback('');
        navigate(-1);
    };

    const baseStyle = {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        backgroundColor: '#f9f9f9',
        overflow: 'auto' as 'auto',

        backgroundImage: `url(${MINIGAME_BACKGROUND})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const contentContainerStyle = {
        width: '90%',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.4)',
        border: '5px solid #ff69b4',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    };

    const ruleBoxStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '10px',
        border: '3px solid #ff69b4',
        marginBottom: '20px',
        width: '100%',
        textAlign: 'center' as 'center',
    };

    const optionsBoxStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '10px 0',
        width: '100%',
        flexWrap: 'wrap' as 'wrap',
    };

    const instructionsBoxStyle = {
        marginTop: '20px',
        backgroundColor: '#fff0f5',
        border: '2px solid #ff69b4',
        borderRadius: '8px',
        padding: '5px 10px',
        fontSize: '0.9rem',
        fontWeight: 'bold' as 'bold',
        textAlign: 'center' as 'center',
    };

    const optionButtonStyle = {
        padding: '10px',
        backgroundColor: 'white',
        border: '4px solid #4c965c',
        borderRadius: '10px',
        cursor: isAnswered ? 'default' : 'pointer' as 'pointer',
        transition: 'all 0.1s',
        boxShadow: '2px 4px 0px rgba(0, 0, 0, 0.1)',
        flex: '1 1 auto',
        minWidth: '100px',
        maxWidth: '150px',
        opacity: isAnswered ? 0.7 : 1,
    };

    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div style={baseStyle}>

            <div style={contentContainerStyle}>

                <div style={ruleBoxStyle}>
                    <h2 style={{ color: '#ff69b4', margin: '0 0 5px 0' }}>{fixedTitle}</h2>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>
                        **Reglas:** {rules}
                    </p>
                    <h3 style={{ margin: 0, color: '#333' }}>
                        **Encuentra la palabra:** <span style={{ fontSize: '1.5rem', color: '#4c965c' }}>{word}</span>
                    </h3>
                </div>

                <div style={optionsBoxStyle}>
                    {options.map((option: Option) => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(option.isCorrect)}
                            disabled={isAnswered}
                            style={{
                                ...optionButtonStyle,
                                border: isAnswered
                                    ? (option.isCorrect ? '4px solid #00AA00' : '4px solid #AA0000')
                                    : '4px solid #4c965c',
                            }}
                        >
                            <img
                                src={option.imagePath}
                                alt={`Opción ${option.id}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    imageRendering: 'pixelated',
                                }}
                            />
                        </button>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    {feedback && (
                        <p style={{
                            fontWeight: 'bold',
                            color: isAnswered && feedback.includes('Correcto') ? '#00AA00' : '#AA0000',
                            fontSize: '1.1rem',
                            marginBottom: '10px',
                        }}>
                            {feedback}
                        </p>
                    )}
                    <button
                        onClick={handleClose}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            border: '3px solid #e04e9e',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Cerrar y volver al mapa
                    </button>
                </div>

                <div style={instructionsBoxStyle}>
                    Instrucción: Identifica el objeto '{word}' presionando la imagen correcta.
                </div>
            </div>

        </div>
    );
};

export default FirstMinigame;