import React, { useEffect } from 'react';
import cafeImage from '../assets/mundo/mini1.jpeg';
import gramaticaImage from '../assets/mundo/mini2.jpeg';
import carameloImage from '../assets/mundo/mini3.jpeg';

interface MinigameProgress {
    completedQuestions: number[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface ProgressMapProps {
    onClose: () => void;
}

const ProgressMap: React.FC<ProgressMapProps> = ({ onClose }) => {
    // Bloquear movimiento del personaje
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const movementKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
            if (movementKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        window.addEventListener('keydown', handleKeyDown, true);
        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, []);

    // Obtener progreso de cada minijuego
    const getMinigameProgress = (key: string): MinigameProgress => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : { completedQuestions: [], currentQuestionIndex: 0, totalCompleted: 0 };
    };

    const minigame1 = getMinigameProgress('minigameProgress');
    const minigame2 = getMinigameProgress('minigame2Progress');
    const minigame3 = getMinigameProgress('minigame3Progress');

    const minigame1Completed = minigame1.completedQuestions.length;
    const minigame2Completed = minigame2.completedQuestions.length;
    const minigame3Completed = minigame3.completedQuestions.length;

    const isMinigame1Unlocked = true;
    const isMinigame2Unlocked = minigame1Completed >= 2;
    const isMinigame3Unlocked = minigame1Completed >= 2 && minigame2Completed >= 2;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(75, 150, 92, 0.95)' }}>
            <div 
                className="relative flex flex-col"
                style={{
                    width: '80vw',
                    maxWidth: '1000px',
                    height: '70vh',
                    maxHeight: '600px',
                    border: '8px solid #ff69b4',
                    borderRadius: '30px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#FBF0DF',
                    padding: '30px 20px 20px',
                }}
            >
                <div className="text-center mb-6">
                    <h1 className="kawaii-header text-4xl mb-2" style={{ color: '#4A3C32', textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)' }}>
                        Mapa de Progreso
                    </h1>
                    <p className="text-lg font-bold" style={{ color: '#8B7360' }}>
                        ¡Completa todos los minijuegos para dominar Talkie Town!
                    </p>
                </div>

                <div className="flex justify-center items-center gap-6 mb-auto">
                    
                    <div className="flex flex-col items-center">
                        <div
                            className="p-5 text-center"
                            style={{
                                backgroundColor: isMinigame1Unlocked ? '#B2D8BB' : '#D3D3D3',
                                border: `5px solid ${isMinigame1Unlocked ? '#8B7360' : '#999'}`,
                                borderRadius: '25px',
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '200px',
                            }}
                        >
                            <div className="mb-2 flex justify-center">
                                <img 
                                    src={cafeImage} 
                                    alt="Café" 
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#4A3C32' }}>
                                El Rincón del Café
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame1Completed}/2
                            </div>
                            <p className="text-xs mt-2 font-semibold" style={{ color: '#4A3C32' }}>
                                {minigame1Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                    </div>

                    <div className="text-5xl" style={{ color: isMinigame2Unlocked ? '#8B7360' : '#ccc', fontWeight: 'bold' }}>
                        ➜
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="p-5 text-center"
                            style={{
                                backgroundColor: isMinigame2Unlocked ? '#87CEEB' : '#D3D3D3',
                                border: `5px solid ${isMinigame2Unlocked ? '#8B7360' : '#999'}`,
                                borderRadius: '25px',
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '200px',
                            }}
                        >
                            <div className="mb-2 flex justify-center">
                                <img 
                                    src={gramaticaImage} 
                                    alt="Gramática" 
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#4A3C32' }}>
                                El Rincón Gramatical
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame2Completed}/2
                            </div>
                            <p className="text-xs mt-2 font-semibold" style={{ color: '#4A3C32' }}>
                                {!isMinigame2Unlocked ? 'Bloqueado' : minigame2Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                    </div>

                    <div className="text-5xl" style={{ color: isMinigame3Unlocked ? '#8B7360' : '#ccc', fontWeight: 'bold' }}>
                        ➜
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="p-5 text-center"
                            style={{
                                backgroundColor: isMinigame3Unlocked ? '#FFD700' : '#D3D3D3',
                                border: `5px solid ${isMinigame3Unlocked ? '#8B7360' : '#999'}`,
                                borderRadius: '25px',
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '200px',
                            }}
                        >
                            <div className="mb-2 flex justify-center">
                                <img 
                                    src={carameloImage} 
                                    alt="Caramelo" 
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#4A3C32' }}>
                                El Rincón del Caramelo
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame3Completed}/2
                            </div>
                            <p className="text-xs mt-2 font-semibold" style={{ color: '#4A3C32' }}>
                                {!isMinigame3Unlocked ? 'Bloqueado' : minigame3Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pb-4">
                    <button
                        onClick={onClose}
                        className="kawaii-button py-2 px-8 font-bold text-lg"
                        style={{
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            border: '5px solid #e04e9e',
                            boxShadow: '0 6px 0 0 #e04e9e',
                        }}
                    >
                        Cerrar Mapa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProgressMap;
