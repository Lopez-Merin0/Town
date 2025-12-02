import React from 'react';
import { Option } from './MiniData-1';
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
    const getOptionButtonStyle = (option: Option, isSelected: boolean): React.CSSProperties => {
        let borderColor = KAWAI_COLORS.panelBorder;
        let boxShadow = `3px 3px 0px ${KAWAI_COLORS.shadowLight}`;
        let cursor: React.CSSProperties['cursor'] = isAnswered ? 'default' : 'pointer';

        if (isAnswered && option.isCorrect && isCorrectAnswer) {
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
            onClick={() => onAnswer(option.isCorrect, option.id)}
            disabled={isAnswered || showExitConfirmation}
            onMouseEnter={() => onHover(option.id)}
            onMouseLeave={() => onHover(null)}
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

export default OptionButton;
