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

export const MINIGAME_QUESTIONS: MinigameQuestion[] = [
    {
        id: 1,
        word: 'Taza',
        rules: 'Se te dará el nombre de un objeto. Tu misión es seleccionar la imagen que corresponde a esa palabra.',
        options: [
            {
                id: 1,
                imagePath: './manzana.png',
                isCorrect: false,
            },
            {
                id: 2,
                imagePath: './taza.png',
                isCorrect: true,
            },
            {
                id: 3,
                imagePath: './lapiz.png',
                isCorrect: false,
            },
            {
                id: 4,
                imagePath: './llave.png',
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
    },
    {
        id: 2,
        word: 'Manzana',
        rules: 'Se te dará el nombre de un objeto. Tu misión es seleccionar la imagen que corresponde a esa palabra.',
        options: [
            {
                id: 1,
                imagePath: './taza.png',
                isCorrect: false,
            },
            {
                id: 2,
                imagePath: './manzana.png',
                isCorrect: true,
            },
            {
                id: 3,
                imagePath: './lapiz.png',
                isCorrect: false,
            },
            {
                id: 4,
                imagePath: './llave.png',
                isCorrect: false,
            },
        ],
        dialogue: {
            introTitle: '☕ ¡Segundo Desafío!',
            introGreeting: '¡Excelente! Ahora vamos con el segundo tesoro. ¿Puedes identificar la manzana?',
            correctFeedback: '¡Perfecto! Has completado todos los desafíos. ¡Eres un verdadero conocedor de manzanas!',
            wrongAttempt1: '¡Casi! El color de la manzana es inconfundible. Tienes una oportunidad más para encontrar "{word}".',
            wrongAttempt2: 'No importa, lo importante es aprender. La respuesta era "{word}". ¡Inténtalo de nuevo!',
            instruction: 'Segundo desafío: Selecciona la imagen que corresponde a la palabra de arriba.',
            questionHeader: 'Encuentra el tesoro: ',
        }
    }
];