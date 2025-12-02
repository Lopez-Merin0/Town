import React from 'react';
import background from '../assets/mundo/fondo.jpg';

interface MinigameProgress {
    completedQuestions: number[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface ProgressMapProps {
    onClose: () => void;
}

const ProgressMap: React.FC<ProgressMapProps> = ({ onClose }) => {
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div 
                className="relative"
                style={{
                    width: '90vw',
                    maxWidth: '1200px',
                    height: '85vh',
                    maxHeight: '800px',
                    border: '8px solid #ff69b4',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >
                {/* Fondo del mapa */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.4,
                    }}
                />

                {/* Título */}
                <div className="relative z-10 p-6 text-center">
                    <h1 className="kawaii-header text-4xl mb-2" style={{ color: '#ff69b4', textShadow: '3px 3px 0px #fff' }}>
                        Mapa de Progreso
                    </h1>
                    <p className="text-lg font-bold" style={{ color: '#333' }}>
                        ¡Completa todos los minijuegos para dominar Talkie Town!
                    </p>
                </div>

                {/* Contenedor de minijuegos */}
                <div className="relative z-10 flex justify-around items-center px-8" style={{ height: 'calc(100% - 180px)' }}>
                    
                    {/* Primer Minijuego */}
                    <div className="flex flex-col items-center">
                        <div
                            className="kawaii-popup p-6 text-center mb-4"
                            style={{
                                backgroundColor: isMinigame1Unlocked ? '#90EE90' : '#ccc',
                                border: `5px solid ${isMinigame1Unlocked ? '#32CD32' : '#999'}`,
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '250px',
                            }}
                        >
                            <div className="text-4xl mb-3">
                                {isMinigame1Unlocked ? '🎮' : '🔒'}
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
                                Primer Minijuego
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame1Completed}/2
                            </div>
                            <p className="text-sm mt-2" style={{ color: '#666' }}>
                                {minigame1Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                        <div className="text-6xl">📍</div>
                    </div>

                    {/* Flecha */}
                    <div className="text-6xl" style={{ color: isMinigame2Unlocked ? '#32CD32' : '#ccc' }}>
                        ➜
                    </div>

                    {/* Segundo Minijuego */}
                    <div className="flex flex-col items-center">
                        <div
                            className="kawaii-popup p-6 text-center mb-4"
                            style={{
                                backgroundColor: isMinigame2Unlocked ? '#87CEEB' : '#ccc',
                                border: `5px solid ${isMinigame2Unlocked ? '#4682B4' : '#999'}`,
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '250px',
                            }}
                        >
                            <div className="text-4xl mb-3">
                                {isMinigame2Unlocked ? '🎯' : '🔒'}
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
                                Segundo Minijuego
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame2Completed}/2
                            </div>
                            <p className="text-sm mt-2" style={{ color: '#666' }}>
                                {!isMinigame2Unlocked ? 'Bloqueado' : minigame2Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                        <div className="text-6xl">📍</div>
                    </div>

                    {/* Flecha */}
                    <div className="text-6xl" style={{ color: isMinigame3Unlocked ? '#32CD32' : '#ccc' }}>
                        ➜
                    </div>

                    {/* Tercer Minijuego */}
                    <div className="flex flex-col items-center">
                        <div
                            className="kawaii-popup p-6 text-center mb-4"
                            style={{
                                backgroundColor: isMinigame3Unlocked ? '#FFD700' : '#ccc',
                                border: `5px solid ${isMinigame3Unlocked ? '#FFA500' : '#999'}`,
                                boxShadow: '0 8px 0 0 rgba(0,0,0,0.2)',
                                width: '250px',
                            }}
                        >
                            <div className="text-4xl mb-3">
                                {isMinigame3Unlocked ? '🏆' : '🔒'}
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
                                Tercer Minijuego
                            </h3>
                            <div className="text-3xl font-bold" style={{ color: '#ff69b4' }}>
                                {minigame3Completed}/2
                            </div>
                            <p className="text-sm mt-2" style={{ color: '#666' }}>
                                {!isMinigame3Unlocked ? 'Bloqueado' : minigame3Completed >= 2 ? '¡Completado! ✓' : 'En progreso...'}
                            </p>
                        </div>
                        <div className="text-6xl">📍</div>
                    </div>
                </div>

                {/* Botón de cerrar */}
                <div className="relative z-10 flex justify-center pb-6">
                    <button
                        onClick={onClose}
                        className="kawaii-button py-3 px-8 font-bold text-lg"
                        style={{
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            border: '4px solid #e04e9e',
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
