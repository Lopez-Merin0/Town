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

export const MINIGAME_2_QUESTIONS: MinigameQuestion[] = [
    {
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
            wrongAttempt2: 'No pasa nada. ¡A seguir sumando experiencia!',

            instruction: 'Selecciona la forma correcta del verbo "estar" para completar la frase.',
            questionHeader: 'El desafío es: ',
        }
    },
    {
        id: 2,
        sentence: 'Nosotros {gap} listos para empezar.',
        rules: 'Completa la frase seleccionando la forma correcta del verbo "estar" en plural.',

        options: [
            {
                id: 1,
                text: 'estamos',
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
                text: 'estás',
                isCorrect: false,
            },
        ],

        dialogue: {
            introTitle: '🚀 ¡Hora del Nivel 2!',
            introGreeting: [
                '¡Ey! Veo que regresaste con toda la actitud.',
                'Cristi encontró otra nota misteriosa… al parecer alguien quiere retarnos otra vez.',
                'Esta vez toca usar la forma correcta del verbo "estar" en plural. Fácil, ¿no?',
                'Demuestra tu poder lingüístico.',
            ],

            correctFeedback:
                '¡Esooo! "{text}" es la forma correcta. "Nosotros estamos listos" suena perfecto. ¡Vas volando!',
            wrongAttempt1:
                'Uy, cerquita pero no. Recuerda que "Nosotros" es primera persona del plural. Te queda un intento, ¡tú puedes!',
            wrongAttempt2:
                'No pasa nada.¡Seguimos!',

            instruction: 'Selecciona la forma correcta del verbo "estar".',
            questionHeader: 'Completa la frase:',
        },
    }
];
