export interface Option {
    id: number;
    text: string;
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
    sentence: string;
    options: Option[];
    rules: string;
    dialogue: MinigameDialogue;
}

export const MINIGAME_QUESTION: MinigameQuestion = {
    id: 1,
    sentence: 'Ella {gap} jugando fútbol.',
    rules: 'Completa la frase seleccionando la forma correcta del verbo "estar".',

    options: [
        {
            id: 1,
            text: 'está',
            isCorrect: true,
        },
        {
            id: 2,
            text: 'están',
            isCorrect: false,
        },
        {
            id: 3,
            text: 'estoy',
            isCorrect: false,
        },
        {
            id: 4,
            text: 'estar',
            isCorrect: false,
        },
    ],

    dialogue: {
        introTitle: '🎁 ¡Bienvenido al Rincón Gramatical!',

        introGreeting: [
            '¡Hola! Qué bueno verte por aquí.',
            'Soy Cristi. Un cliente dejó una nota con una pequeña misión:',
            'Quiere comprobar si dominamos las formas del verbo "estar". ¿Aceptas el desafío?',
            'Tu misión: Completa correctamente la frase seleccionando la forma adecuada de "estar". ¡Vamos a darle!',
        ],

        correctFeedback: '¡Perfecto! La forma correcta es "{text}". "Ella está jugando fútbol" suena impecable. ¡Buen trabajo!',
        wrongAttempt1: 'Casi, casi. Recuerda que "Ella" es singular. ¿Qué forma del verbo "estar" corresponde? Te queda un intento.',
        wrongAttempt2: 'No pasa nada. La palabra correcta era "{text}". Con "Ella" usamos "está". ¡A seguir sumando experiencia!',

        instruction: 'Selecciona la forma correcta del verbo "estar" para completar la frase.',
        questionHeader: 'El desafío es: ',
    }
};
