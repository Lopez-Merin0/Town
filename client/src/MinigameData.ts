export interface Option {
    id: number;
    imagePath: string; 
    isCorrect: boolean;
}

export interface MinigameQuestion {
    id: number;
    word: string; 
    options: Option[];
    rules: string;
}

export const MINIGAME_QUESTION: MinigameQuestion = {
    id: 1,
    word: 'Mug',
    rules: 'Se te dará el nombre de un objeto en inglés. Tu misión es seleccionar la imagen que corresponde a esa palabra.',
    options: [
        {
            id: 1,
            imagePath: 'https://i.pinimg.com/736x/3e/71/04/3e7104d9499af8976d3f7ffd1007640c.jpg', 
            isCorrect: false,
        },
        {
            id: 2,
            imagePath: 'https://i.pinimg.com/736x/ad/ac/52/adac52ec063d5d0351b4eeba271d3077.jpg', 
            isCorrect: true,
        },
        {
            id: 3,
            imagePath: 'https://i.pinimg.com/1200x/e8/57/36/e857367ef1bdd1488365c6c90fff5684.jpg', 
            isCorrect: false,
        },
        {
            id: 4,
            imagePath: 'https://i.pinimg.com/1200x/75/11/08/751108fd0896fd0b4b79c97db5b49787.jpg', 
            isCorrect: false,
        },
    ],
};