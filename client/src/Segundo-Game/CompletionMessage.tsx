import React from 'react';
import { KAWAI_COLORS, KAWAI_TEXTURES, MINIGAME_BACKGROUND, KAWAI_FONTS, KAWAI_STYLES } from './minigame-styles';

interface CompletionMessageProps {
    totalCompleted: number;
    totalQuestions: number;
    allQuestionsCompleted: boolean;
    showCompletionMessage: boolean;
    onBackToMap: () => void;
}

const CompletionMessage: React.FC<CompletionMessageProps> = ({
    totalCompleted,
    totalQuestions,
    allQuestionsCompleted,
    showCompletionMessage,
    onBackToMap
}) => {
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

    return (
        <div style={baseStyle}>
            <div style={{
                ...dialogBoxStyle,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
                <h2 style={{ ...KAWAI_STYLES.header, fontSize: '1.5rem', marginBottom: '15px' }}>
                    🎉 ¡Felicidades! 🎉
                </h2>
                <p style={{ color: KAWAI_COLORS.textDark, fontSize: '1rem', marginBottom: '10px' }}>
                    {allQuestionsCompleted && !showCompletionMessage
                        ? 'Ya has completado todos los desafíos del Rincón Gramatical anteriormente.'
                        : 'Has completado todos los desafíos del Rincón Gramatical.'}
                </p>
                <p style={{ color: KAWAI_COLORS.textGreen, fontSize: '0.9rem', marginBottom: '20px' }}>
                    Preguntas completadas: {totalCompleted} de {totalQuestions}
                </p>
                <button
                    onClick={onBackToMap}
                    style={nextButtonStyle}
                >
                    Volver al Mapa
                </button>
            </div>
        </div>
    );
};

export default CompletionMessage;
