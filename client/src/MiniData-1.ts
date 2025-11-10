export interface Option {
    id: number;
    imagePath: string;
    isCorrect: boolean;
}

export interface MinigameDialogue {
    introTitle: string;
    introGreeting: string | string[];

    correctFeedback: string;
    wrongAttempt1: string;
    wrongAttempt2: string;

    instruction: string;
    questionHeader: string;
}

export interface MinigameQuestion {
    id: number;
    word: string;
    options: Option[];
    rules: string;
    dialogue: MinigameDialogue;
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

    dialogue: {
        introTitle: '☕ ¡Bienvenido a El Rincón del Café!',

        introGreeting: [
            '¡Hola! ¡Qué alegría verte en nuestro acogedor "Rincón del Café"!',
            '¿Sabías que este lugar, antes de ser una cafetería, era solo un pequeño arbusto de café silvestre?',
            'Lo cultivamos con cariño hasta convertirlo en el refugio lleno de historias y aroma que es hoy.',
            'Pero antes de que te relajes con tu bebida, tengo un pequeño y divertido desafío para ti. ¡Demuéstranos que conoces nuestros tesoros!',
        ],

        correctFeedback: '¡Felicidades, esa es la actitud de un verdadero explorador! ¡La palabra "{word}" es tuya! ¡Continúa con tu dulce aventura!',
        wrongAttempt1: '¡Ups! Parece que esa no era la imagen correcta, pero no te preocupes, el café se disfruta hasta el último sorbo Te queda una oportunidad más para conseguir la palabra "{word}". ¡Tú puedes!',
        wrongAttempt2: 'No te rindas, a veces el aroma nos distrae. La respuesta correcta era: "{word}". ¡No pasa nada! El verdadero premio es la experiencia. Cierra esta ventana y sigue disfrutando del Rincón.',

        instruction: 'Tu misión es clara: Demuéstranos que sabes reconocer los tesoros de nuestra cafetería. Selecciona la imagen que corresponde a la palabra de arriba.',
        questionHeader: 'Encuentra el tesoro: ',
    }
};