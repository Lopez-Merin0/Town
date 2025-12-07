import React from 'react';

interface SleepPopupProps {
    onClose: () => void;
}

const SleepPopup: React.FC<SleepPopupProps> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="kawaii-popup p-8 rounded-lg shadow-lg text-center"
            style={{
                backgroundColor: '#fefefe',
                border: '5px solid #9370DB',
                boxShadow: '0 8px 0 0 #8A2BE2',
                maxWidth: '450px',
            }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                ¡Listo para un Nuevo Día!
            </h2>
            <p className="text-lg mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                Has completado todas las aventuras de hoy. Es hora de descansar y recargar energías.
            </p>
            <p className="text-base mb-6" style={{ 
                color: '#9370DB', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontStyle: 'italic'
            }}>
                ¡Próximamente más aventuras!
            </p>
            <button
                onClick={onClose}
                className="kawaii-button py-3 px-8 font-bold text-lg"
                style={{
                    backgroundColor: '#9370DB',
                    color: 'white',
                    border: '4px solid #8A2BE2',
                    boxShadow: '5px 5px 0px #8A2BE2',
                }}
            >
                Cerrar
            </button>
        </div>
    </div>
);

export default SleepPopup;
