export const checkMinigameUnlocked = (triggerName: string): { unlocked: boolean; message: string } => {
    const mg1 = localStorage.getItem('minigameProgress');
    const mg2 = localStorage.getItem('minigame2Progress');
    const mg3 = localStorage.getItem('minigame3Progress');

    const minigame1Progress = mg1 ? JSON.parse(mg1) : { completedQuestions: [] };
    const minigame2Progress = mg2 ? JSON.parse(mg2) : { completedQuestions: [] };
    const minigame3Progress = mg3 ? JSON.parse(mg3) : { completedQuestions: [] };

    const minigame1Completed = minigame1Progress.completedQuestions.length >= 2;
    const minigame2Completed = minigame2Progress.completedQuestions.length >= 2;
    const minigame3Completed = minigame3Progress.completedQuestions.length >= 2;

    console.log('📊 Estado de minijuegos:', {
        minigame1: { completed: minigame1Completed, count: minigame1Progress.completedQuestions.length },
        minigame2: { completed: minigame2Completed, count: minigame2Progress.completedQuestions.length },
        minigame3: { completed: minigame3Completed, count: minigame3Progress.completedQuestions.length },
        checking: triggerName
    });

    switch (triggerName) {
        case 'FirstMinigame':
            return { unlocked: true, message: '' };
        
        case 'SecondMinigame':
            if (!minigame1Completed) {
                return { 
                    unlocked: false, 
                    message: 'Debes completar los 2 niveles del Primer Minijuego para desbloquear este minijuego.' 
                };
            }
            return { unlocked: true, message: '' };
        
        case 'ThirdMinigame':
            if (!minigame1Completed || !minigame2Completed) {
                return { 
                    unlocked: false, 
                    message: 'Debes completar los 2 niveles del Segundo Minijuego para desbloquear este minijuego.' 
                };
            }
            return { unlocked: true, message: '' };
        
        case 'RoomMinigame':
            return { unlocked: true, message: '' };
        
        default:
            return { unlocked: true, message: '' };
    }
};

export const checkMinigameCompleted = (triggerName: string): boolean => {
    const mg1 = localStorage.getItem('minigameProgress');
    const mg2 = localStorage.getItem('minigame2Progress');
    const mg3 = localStorage.getItem('minigame3Progress');

    const minigame1Progress = mg1 ? JSON.parse(mg1) : { completedQuestions: [] };
    const minigame2Progress = mg2 ? JSON.parse(mg2) : { completedQuestions: [] };
    const minigame3Progress = mg3 ? JSON.parse(mg3) : { completedQuestions: [] };

    const minigame1Completed = minigame1Progress.completedQuestions.length >= 2;
    const minigame2Completed = minigame2Progress.completedQuestions.length >= 2;
    const minigame3Completed = minigame3Progress.completedQuestions.length >= 2;

    switch (triggerName) {
        case 'FirstMinigame':
            return minigame1Completed;
        
        case 'SecondMinigame':
            return minigame2Completed;
        
        case 'ThirdMinigame':
            return minigame3Completed;
        
        case 'RoomMinigame':
            return false; // El cuarto nunca se "completa"
        
        default:
            return false;
    }
};

export const checkAllMinigamesCompleted = (): boolean => {
    const mg1 = localStorage.getItem('minigameProgress');
    const mg2 = localStorage.getItem('minigame2Progress');
    const mg3 = localStorage.getItem('minigame3Progress');

    const minigame1Progress = mg1 ? JSON.parse(mg1) : { completedQuestions: [] };
    const minigame2Progress = mg2 ? JSON.parse(mg2) : { completedQuestions: [] };
    const minigame3Progress = mg3 ? JSON.parse(mg3) : { completedQuestions: [] };

    const minigame1Completed = minigame1Progress.completedQuestions.length >= 2;
    const minigame2Completed = minigame2Progress.completedQuestions.length >= 2;
    const minigame3Completed = minigame3Progress.completedQuestions.length >= 2;

    return minigame1Completed && minigame2Completed && minigame3Completed;
};

export const hasSeenAllCompletedPopup = (): boolean => {
    return localStorage.getItem('hasSeenAllCompletedPopup') === 'true';
};

export const markAllCompletedPopupAsSeen = (): void => {
    localStorage.setItem('hasSeenAllCompletedPopup', 'true');
};

export const resetAllCompletedPopup = (): void => {
    localStorage.removeItem('hasSeenAllCompletedPopup');
};
