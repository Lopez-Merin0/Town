import React from 'react';
import { Option } from './MiniData-2';
import { KAWAI_COLORS } from './minigame-styles';

interface OptionButtonProps {
    option: Option;
    isSelected: boolean;
    isHovered: boolean;
    isAnswered: boolean;
    isCorrectAnswer: boolean;
    showExitConfirmation: boolean;
    onAnswer: (isCorrect: boolean, id: number) => void;
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
    onHover
}) => {
    const getOptionButtonStyle = (): React.CSSProperties => {
        let borderColor = KAWAI_COLORS.panelBorder;
        let boxShadow = `3px 3px 0px ${KAWAI_COLORS.shadowLight}`;
        let cursor: React.CSSProperties['cursor'] = (isAnswered || showExitConfirmation) ? 'default' : 'pointer';
        let backgroundColor = KAWAI_COLORS.panelLight;

        if (isAnswered && option.isCorrect && isCorrectAnswer) {
            borderColor = KAWAI_COLORS.textGreen;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.textGreen}`;
            backgroundColor = KAWAI_COLORS.panelLight;
        }
        else if (isAnswered && isSelected && !option.isCorrect) {
            borderColor = KAWAI_COLORS.borderRed;
            boxShadow = `5px 5px 0px ${KAWAI_COLORS.borderRed}`;
            backgroundColor = KAWAI_COLORS.accentPink;
        }

        const baseStyle: React.CSSProperties = {
            padding: '15px 20px',
            backgroundColor: backgroundColor,
            border: `4px solid ${borderColor}`,
            borderRadius: '10px',
            cursor: cursor,
            boxShadow: boxShadow,
            width: '130px',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease-in-out',
            fontWeight: 'bold',
            fontSize: '1rem',
        };

        let hoverStyle = {};
        if (!isAnswered && !showExitConfirmation && isHovered) {
            hoverStyle = {
                transform: 'scale(1.05)',
                boxShadow: `5px 5px 0px ${KAWAI_COLORS.panelBorder}`,
            };
        }

        return { ...baseStyle, ...hoverStyle };
    };

    return (
        <button
            onClick={() => onAnswer(option.isCorrect, option.id)}
            disabled={isAnswered || showExitConfirmation}
            onMouseEnter={() => onHover(option.id)}
            onMouseLeave={() => onHover(null)}
            style={getOptionButtonStyle()}
        >
            {option.text}
        </button>
    );
};

export default OptionButton;
