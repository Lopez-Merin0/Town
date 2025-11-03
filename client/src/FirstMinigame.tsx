import React from 'react';

interface FirstMinigameProps {
    isOpen: boolean;
    title: string;
    message: string; 
    onClose: () => void;
}

const FirstMinigame: React.FC<FirstMinigameProps> = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 100 }}
        >
            <div 
                className="p-4 rounded-lg kawaii-popup" 
                style={{
                    backgroundColor: '#ffffff',
                    border: '5px solid #ff69b4',
                    boxShadow: '0 8px 0 0 #ff69b4',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff69b4' }}>{title}</h2>
                <p className="mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="kawaii-button py-2 px-4 font-bold"
                    style={{
                        backgroundColor: '#add8e6',
                        color: '#333333',
                        border: '3px solid #6495ed',
                        fontSize: '1rem'
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default FirstMinigame;