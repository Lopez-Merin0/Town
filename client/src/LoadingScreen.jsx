import React, { useEffect, useState } from 'react';

// Se cambió la interfaz a un comentario para evitar errores de sintaxis en JSX si no se usa TypeScript
/*
interface LoadingScreenProps {
    onLoadingComplete: () => void; // Función para llamar cuando la carga esté "lista"
    loadingTime?: number; // Tiempo de simulación de carga en ms (por defecto 3000ms)
}
*/

const LoadingScreen = ({ onLoadingComplete, loadingTime = 3000 }) => {
    const [progress, setProgress] = useState(0); // Para la barra de progreso
    const [message, setMessage] = useState("Cargando aldea..."); // Mensaje dinámico

    useEffect(() => {
        // Simulamos la carga del mundo
        const interval = setInterval(() => {
            setProgress(prev => {
                // Incrementa por porcentaje en el tiempo
                const increment = (100 / (loadingTime / 100));
                const newProgress = prev + increment; 

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setMessage("¡Mundo listo! Entrando...");
                    setTimeout(onLoadingComplete, 500); // Pequeño retraso final antes de la transición
                    return 100;
                }
                
                // Cambiar mensajes según el progreso (estilo Animal Crossing)
                if (newProgress < 30) {
                    setMessage("Recogiendo bayas de datos...");
                } else if (newProgress < 60) {
                    setMessage("Regando las flores del mapa...");
                } else if (newProgress < 90) {
                    setMessage("Avisando a los vecinos de tu llegada...");
                }
                return newProgress;
            });
        }, 100); // Actualiza cada 100ms

        return () => clearInterval(interval);
    }, [onLoadingComplete, loadingTime]);

    return (
        <div 
            className="fixed inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-500 ease-in-out"
            style={{ 
                zIndex: 200, 
                color: '#333333',
                backgroundColor: '#aaddff', // Azul cielo pastel
                // Fondo de nubes generado con CSS para mayor fiabilidad
                backgroundImage: 'radial-gradient(#cceeff 10%, transparent 10%), radial-gradient(#cceeff 10%, transparent 10%)', 
                backgroundSize: '100px 100px', 
                backgroundPosition: '0 0, 50px 50px',
                animation: 'cloud-scroll 60s linear infinite' // Animación de movimiento
            }}
        >
            <h1 
                className="text-5xl font-bold mb-8 text-pink-500 text-center" 
                style={{
                    textShadow: '3px 3px 0 #fff', 
                    WebkitTextStroke: '2px #ff69b4', 
                    color: 'white'
                }}
            >
                ¡Bienvenido a Talkie Town!
            </h1>
            
            <div 
                className="w-3/4 max-w-md bg-white rounded-full h-8 border-4 border-pink-400 overflow-hidden relative mb-4 shadow-xl"
                style={{ boxShadow: '0 4px 0 0 #ff69b4' }}
            >
                <div 
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ 
                        width: `${progress}%`, 
                        transition: 'width 0.1s linear',
                        backgroundImage: 'linear-gradient(to right, #98fb98, #66cdaa)', // Gradiente verde pastel
                        borderRight: progress < 100 ? '2px solid #32cd32' : 'none'
                    }}
                >
                    <span className="text-sm font-bold text-gray-800">{Math.round(progress)}%</span>
                </div>
            </div>
            
            <p className="text-xl font-bold text-gray-700 p-2" style={{ textShadow: '1px 1px 0 #fff' }}>
                {message}
            </p>

            {/* Estilos para la animación de nubes (inyeccion de CSS) */}
            <style>
                {`
                @keyframes cloud-scroll {
                    0% {
                        background-position: 0% 0%, 50px 50px;
                    }
                    100% {
                        background-position: 100% 0%, 150px 50px;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default LoadingScreen;
