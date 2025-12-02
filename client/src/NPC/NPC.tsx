import React from 'react';

interface NPCProps {
    x: number;
    y: number;
    spriteUrl: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

const NPC: React.FC<NPCProps> = ({ x, y, spriteUrl, onClick, style }) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '80px',
                height: '80px',
                cursor: 'pointer',
                zIndex: 1,
                transition: 'transform 0.2s',
                imageRendering: 'pixelated',
                ...style
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <img
                src={spriteUrl}
                alt="NPC"
                style={{
                    width: '100%',
                    height: '100%',
                    imageRendering: 'pixelated',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default NPC;
