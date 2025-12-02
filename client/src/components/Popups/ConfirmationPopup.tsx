import React from 'react';

interface ConfirmationPopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="kawaii-popup p-6 rounded-lg shadow-lg text-center"
            style={{
                backgroundColor: '#fefefe',
                border: '5px solid #6495ed',
                boxShadow: '0 8px 0 0 #add8e6',
                maxWidth: '400px',
            }}>
            <p className="text-xl font-bold mb-4" style={{ color: '#333333' }}>
                ¿Estás seguro de que quieres salir?
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onConfirm}
                    className="kawaii-button py-2 px-4 font-bold"
                    style={{
                        backgroundColor: '#ff69b4',
                        color: 'white',
                        border: '3px solid #e04e9e',
                    }}
                >
                    Confirmar
                </button>
                <button
                    onClick={onCancel}
                    className="kawaii-button py-2 px-4 font-bold"
                    style={{
                        backgroundColor: '#add8e6',
                        color: '#333333',
                        border: '3px solid #6495ed',
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmationPopup;
