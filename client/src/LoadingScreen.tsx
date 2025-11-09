// client/src/LoadingScreen.tsx
import React, { useState, useEffect } from 'react';
import './index.css'; 
interface LoadingScreenProps {
    onAnimationEnd: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onAnimationEnd }) => {
    // isAnimatingOut controla la segunda fase de la animación (el círculo se encoge)
    const [isAnimatingOut, setIsAnimatingOut] = useState(false); 

    useEffect(() => {
        const INTRO_DURATION = 1500; // Duración de la animación de apertura (círculo se expande)
        const ANIMATION_OUT_DELAY = 500; // Pausa después de la apertura antes de cerrar
        const ANIMATION_OUT_DURATION = 1500; // Duración de la animación de cierre (círculo se encoge)

        // 1. Termina la animación de apertura (CircleOpen) y establece isAnimatingOut=true
        const timerStartClose = setTimeout(() => {
            console.log('Intro finished -> starting close animation');
            setIsAnimatingOut(true);
        }, INTRO_DURATION + ANIMATION_OUT_DELAY);

        // 2. Termina la animación de cierre (CircleClose) y notifica al componente padre (WorldScreen)
        const timerEnd = setTimeout(() => {
            console.log('Close animation finished');
            onAnimationEnd(); // Llama a la función que ocultará el LoadingScreen en WorldScreen
        }, INTRO_DURATION + ANIMATION_OUT_DELAY + ANIMATION_OUT_DURATION);

        return () => {
            clearTimeout(timerStartClose);
            clearTimeout(timerEnd);
        };
    }, [onAnimationEnd]);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black relative">
            <div 
                className={`intro-circle ${isAnimatingOut ? 'animate-close' : 'animate-open'}`}
                style={{
                    // El color que se verá mientras el círculo está expandido
                    backgroundColor: isAnimatingOut ? 'black' : '#ff69b4', 
                }}
            >
                {/* Puedes poner un logo o texto dentro del círculo si quieres */}
            </div>
        </div>
    );
};

export default LoadingScreen;