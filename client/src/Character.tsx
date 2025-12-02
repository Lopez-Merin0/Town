import React from 'react';
import spritesheet from './assets/mundo/Spritesheet.png';

const SPRITESHEET_URL = spritesheet;

const BASE_SPRITE_WIDTH = 16; 
const BASE_SPRITE_HEIGHT = 16;
const SCALE_FACTOR = 7; // tamaño del monito

const SCALED_SPRITE_WIDTH = BASE_SPRITE_WIDTH * SCALE_FACTOR;
const SCALED_SPRITE_HEIGHT = BASE_SPRITE_HEIGHT * SCALE_FACTOR;


interface CharacterProps {
  x: number; 
  y: number; 
  direction: number; // 0: Arriba, 1: Abajo, 2: Izquierda, 3: Derecha
  frame: number;     
  style?: React.CSSProperties & React.HTMLAttributes<HTMLDivElement>['style'];
}

const Character: React.FC<CharacterProps> = ({ x, y, direction, frame }) => {
  
  let adjustedDirection = direction;
  
  if (direction === 0) { 
    adjustedDirection = 1; 
  } else if (direction === 1) { 
    adjustedDirection = 0; 
  }
  
  const backgroundPositionY = -(adjustedDirection * BASE_SPRITE_HEIGHT * SCALE_FACTOR);
  const backgroundPositionX = -(frame * BASE_SPRITE_WIDTH * SCALE_FACTOR);

  const totalSpriteSheetWidth = BASE_SPRITE_WIDTH * 4 * SCALE_FACTOR;
  const totalSpriteSheetHeight = BASE_SPRITE_HEIGHT * 4 * SCALE_FACTOR;


  return (
    <div
      style={{
        position: 'absolute',
        
        width: `${SCALED_SPRITE_WIDTH}px`,
        height: `${SCALED_SPRITE_HEIGHT}px`,
        
        backgroundImage: `url(${SPRITESHEET_URL})`,
        backgroundRepeat: 'no-repeat',
        
        backgroundSize: `${totalSpriteSheetWidth}px ${totalSpriteSheetHeight}px`,

        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        
        // Mueve el monito 
        transform: `translate(${x}px, ${y}px)`, 
        imageRendering: 'pixelated', 
        transition: 'transform 0.1s linear', // monito smooth
        zIndex: 10,
      }}
    />
  );
};

export default Character;