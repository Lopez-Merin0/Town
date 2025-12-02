import React from 'react';

interface LockedMinigamePopupProps {
    message: string;
    onClose: () => void;
}

const LockedMinigamePopup: React.FC<LockedMinigamePopupProps> = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="kawaii-popup p-6 rounded-lg shadow-lg text-center"
            style={{
                backgroundColor: '#fefefe',
                border: '5px solid #ff6b6b',
                boxShadow: '0 8px 0 0 #ff9999',
                maxWidth: '400px',
            }}>
            <p className="text-2xl mb-4">🔒</p>
            <p className="text-xl font-bold mb-4" style={{ color: '#333333' }}>
                {message}
            </p>
            <button
                onClick={onClose}
                className="kawaii-button py-2 px-4 font-bold"
                style={{
                    backgroundColor: '#6495ed',
                    color: 'white',
                    border: '3px solid #4169e1',
                }}
            >
                Aceptar
            </button>
        </div>
    </div>
);

export default LockedMinigamePopup;
