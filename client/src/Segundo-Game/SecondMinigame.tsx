import React from 'react';
import { MINIGAME_2_QUESTIONS, Option } from './MiniData-2';
import LoadingScreen from '../LogIn/LoadingScreen';
import ExitConfirmationPopup from './ExitConfirmationPopup';
import CompletionMessage from './CompletionMessage';
import OptionButton from './OptionButton';
import { useMinigameLogic } from './useMinigameLogic';
import {
    KAWAI_COLORS,
    KAWAI_FONTS,
    KAWAI_TEXTURES,
    MINIGAME_BACKGROUND,
    KAWAI_STYLES
} from './minigame-styles';

interface SecondMinigameProps {
    userName: string;
}

const SecondMinigame: React.FC<SecondMinigameProps> = ({ userName }) => {
    const {
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
    } = useMinigameLogic(userName);

    if (!currentQuestion) return null;

    const { sentence, options, rules, dialogue } = currentQuestion;

    const isIntroArray = Array.isArray(dialogue.introGreeting);
    const totalDialogs = isIntroArray ? dialogue.introGreeting.length : 1;
    const isLastDialog = currentDialogIndex >= totalDialogs - 1;

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
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        width: 'fit-content',
        maxWidth: '300px',
        zIndex: 12,
        justifyContent: 'center',
    };

    const buttonText = getButtonText();

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
                Presiona {buttonText.replace(/\*\*/g, '')} para seguir la conversación.
            </p>
        </>
    );

    const questionText = (
        <>
            <p style={KAWAI_STYLES.instruction}>
                {dialogue.instruction}
            </p>
            <h3 style={{ margin: 0, color: KAWAI_COLORS.textDark, textAlign: 'center' }}>
                {dialogue.questionHeader}
                <span style={KAWAI_STYLES.word}>
                    {sentence.replace('{gap}', '____')}
                </span>
            </h3>
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
            <CompletionMessage
                totalCompleted={progress.totalCompleted}
                totalQuestions={MINIGAME_2_QUESTIONS.length}
                allQuestionsCompleted={allQuestionsCompleted}
                showCompletionMessage={showCompletionMessage}
                onBackToMap={handleBackToMap}
            />
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
                    Pregunta {currentQuestionIndex + 1} de {MINIGAME_2_QUESTIONS.length}
                </div>

                {!showStory && (
                    <div style={optionsContainerStyle}>
                        {options.map((option: Option) => (
                            <OptionButton
                                key={option.id}
                                option={option}
                                isSelected={selectedOptionId === option.id}
                                isHovered={hoveredOptionId === option.id}
                                isAnswered={isAnswered}
                                isCorrectAnswer={isCorrectAnswer}
                                showExitConfirmation={showExitConfirmation}
                                onAnswer={handleAnswer}
                                onHover={setHoveredOptionId}
                            />
                        ))}
                    </div>
                )}

                <div style={dialogBoxStyle}>
                    <div>
                        {showStory ? introText : (isAnswered ?
                            <p style={isCorrectAnswer ? KAWAI_STYLES.feedbackCorrect : KAWAI_STYLES.feedbackIncorrect}>
                                {feedback}
                            </p>
                            : questionText)}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={(!showStory && !isAnswered && attempts < 2) || showExitConfirmation}
                        style={{
                            ...nextButtonStyle,
                            backgroundColor: ((!showStory && !isAnswered && attempts < 2) || showExitConfirmation) 
                                ? KAWAI_COLORS.bgMedium 
                                : KAWAI_COLORS.accentGreen,
                            cursor: ((!showStory && !isAnswered && attempts < 2) || showExitConfirmation) 
                                ? 'default' 
                                : 'pointer',
                        }}
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

export default SecondMinigame;