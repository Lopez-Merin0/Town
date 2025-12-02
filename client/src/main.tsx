import { StrictMode } from 'react';
import { createRoot } from 'react-dom';
import { GlobalProgressProvider } from './contexts/GlobalProgressContext';
import { MinigameProgressProvider } from './contexts/MinigameProgressContext';
import { Minigame2ProgressProvider } from './contexts/Minigame2ProgressContext';
import { Minigame3ProgressProvider } from './contexts/Minigame3ProgressContext';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProgressProvider>
      <MinigameProgressProvider>
        <Minigame2ProgressProvider>
          <Minigame3ProgressProvider>
            <App />
          </Minigame3ProgressProvider>
        </Minigame2ProgressProvider>
      </MinigameProgressProvider>
    </GlobalProgressProvider>
  </StrictMode>,
);