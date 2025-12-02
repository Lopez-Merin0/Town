import React, { useState, useEffect } from 'react';
import '../index.css'; 
interface LoadingScreenProps {
    onAnimationEnd: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onAnimationEnd }) => {
    const [isAnimatingOut, setIsAnimatingOut] = useState(false); 

    useEffect(() => {
        const INTRO_DURATION = 1500; 
        const ANIMATION_OUT_DELAY = 500; 
        const ANIMATION_OUT_DURATION = 1500; 

        const timerStartClose = setTimeout(() => {
            console.log('Intro finished -> starting close animation');
            setIsAnimatingOut(true);
        }, INTRO_DURATION + ANIMATION_OUT_DELAY);

        const timerEnd = setTimeout(() => {
            console.log('Close animation finished');
            onAnimationEnd(); 
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
                    backgroundColor: isAnimatingOut ? 'black' : '#ff69b4', 
                }}
            >
            </div>
        </div>
    );
};

export default LoadingScreen;