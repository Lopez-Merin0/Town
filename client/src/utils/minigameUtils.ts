export const checkMinigameUnlocked = (triggerName: string): { unlocked: boolean; message: string } => {
    const mg1 = localStorage.getItem('minigameProgress');
    const mg2 = localStorage.getItem('minigame2Progress');

    const minigame1Progress = mg1 ? JSON.parse(mg1) : { completedQuestions: [] };
    const minigame2Progress = mg2 ? JSON.parse(mg2) : { completedQuestions: [] };

    const minigame1Completed = minigame1Progress.completedQuestions.length >= 2;
    const minigame2Completed = minigame2Progress.completedQuestions.length >= 2;

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
