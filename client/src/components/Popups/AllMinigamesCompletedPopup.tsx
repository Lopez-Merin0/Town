import React from 'react';

interface AllMinigamesCompletedPopupProps {
    onGoToRoom: () => void;
}

const AllMinigamesCompletedPopup: React.FC<AllMinigamesCompletedPopupProps> = ({ onGoToRoom }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="kawaii-popup p-8 rounded-lg shadow-lg text-center"
            style={{
                backgroundColor: '#fefefe',
                border: '5px solid #FFD700',
                boxShadow: '0 8px 0 0 #FFA500',
                maxWidth: '500px',
            }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                ¡Felicitaciones!
            </h2>
            <p className="text-lg mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                Has completado <strong>los tres minijuegos</strong> exitosamente.
            </p>
            <p className="text-base mb-6" style={{ color: '#666666', lineHeight: '1.6' }}>
                Es hora de regresar a casa para descansar y empezar un nuevo día lleno de aventuras. 🏠💤
            </p>
            <button
                onClick={onGoToRoom}
                className="kawaii-button py-3 px-8 font-bold text-lg"
                style={{
                    backgroundColor: '#FFD700',
                    color: '#333333',
                    border: '4px solid #FFA500',
                    boxShadow: '5px 5px 0px #FFA500',
                }}
            >
                Ir a Casa 
            </button>
        </div>
    </div>
);

export default AllMinigamesCompletedPopup;
