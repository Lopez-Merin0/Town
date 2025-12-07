import React from 'react';
import { Option } from './MiniData-3';
import { KAWAI_COLORS } from './minigame-styles';

interface OptionButtonProps {
    option: Option;
    isSelected: boolean;
    isHovered: boolean;
    isAnswered: boolean;
    isCorrectAnswer: boolean;
    showExitConfirmation: boolean;
    onAnswer: (isCorrect: boolean, selectedId: number) => void;
    onHover: (id: number | null) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
    option,
    isSelected,
    isHovered,
    isAnswered,
    isCorrectAnswer,
    showExitConfirmation,
    onAnswer,
    onHover,
}) => {
    const getButtonStyle = (): React.CSSProperties => {
        let backgroundColor = KAWAI_COLORS.panelLight;
        let borderColor = KAWAI_COLORS.panelBorder;
        let transform = 'scale(1)';
        let boxShadow = `5px 5px 0px ${KAWAI_COLORS.panelBorder}`;

        if (isAnswered && isSelected) {
            if (isCorrectAnswer) {
                backgroundColor = KAWAI_COLORS.accentGreen;
                borderColor = '#32CD32';
                boxShadow = `5px 5px 0px #32CD32`;
            } else {
                backgroundColor = KAWAI_COLORS.accentPink;
                borderColor = '#e04e9e';
                boxShadow = `5px 5px 0px #e04e9e`;
            }
        } else if (isHovered && !isAnswered) {
            transform = 'scale(1.05)';
            backgroundColor = KAWAI_COLORS.accentYellow;
        }

        return {
            padding: '12px 15px', // Reducido de 15px 20px
            backgroundColor,
            color: KAWAI_COLORS.textDark,
            border: `4px solid ${borderColor}`, // Reducido de 4px 4px
            borderRadius: '15px',
            cursor: isAnswered || showExitConfirmation ? 'default' : 'pointer',
            boxShadow,
            fontWeight: 'bold',
            fontSize: '0.85rem', // Reducido de 0.95rem
            textAlign: 'center',
            transition: 'all 0.2s ease-in-out',
            transform,
            minHeight: '55px', // Reducido de 60px
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };
    };

    return (
        <button
            onClick={() => !isAnswered && !showExitConfirmation && onAnswer(option.isCorrect, option.id)}
            onMouseEnter={() => !isAnswered && !showExitConfirmation && onHover(option.id)}
            onMouseLeave={() => !isAnswered && !showExitConfirmation && onHover(null)}
            disabled={isAnswered || showExitConfirmation}
            style={getButtonStyle()}
        >
            {option.text}
        </button>
    );
};

export default OptionButton;
