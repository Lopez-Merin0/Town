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
    audioUrl: string;
    audioText: string;
    options: Option[];
    rules: string;
    dialogue: MinigameDialogue;
}

export const MINIGAME_QUESTION_AUDIO: MinigameQuestion = {
    id: 1,
    audioUrl: './how-are-you-doing-today.mp3',
    audioText: 'How are you doing today?',
    rules: 'Escucha el audio con atención y selecciona la frase en inglés que oíste.',

    options: [
        {
            id: 1,
            text: 'How old are you today?',
            isCorrect: false,
        },
        {
            id: 2,
            text: 'How are you doing today?',
            isCorrect: true,
        },
        {
            id: 3,
            text: 'Who are you doing today?',
            isCorrect: false,
        },
        {
            id: 4,
            text: 'How you doing today?',
            isCorrect: false,
        },
    ],

    dialogue: {
        "introTitle": "🍭 ¡El Desafío de la Dulce Escucha! en 'El Rincón del Caramelo'",

        "introGreeting": [
            "¡Bienvenido! Somos Carlos y Chuy, los dueños de 'El Rincón del Caramelo', y te hemos preparado un reto.",
            "Este ejercicio pondrá a prueba tu comprensión de frases en inglés básico que escuchamos todos los días.",
            "Escucha la frase con atención y selecciona la opción que coincide exactamente con lo que oíste.",
            "¡Demuestra que tienes el oído más dulce del vecindario! ¡A por ello!"
        ],

        "correctFeedback": "¡Qué oído tan afinado! Escuchaste \"{text}\" correctamente. ¡Te ganaste un chicle gratis!",
        "wrongAttempt1": "¡Ups, error en el pedido! Intenta escuchar de nuevo, piensa que es un cliente difícil. Te queda una oportunidad más para acertar.",
        "wrongAttempt2": "No te preocupes. La frase correcta era \"{text}\". El verdadero premio es la lección aprendida. ¡A seguir practicando!",

        "instruction": "¡Tu turno! Haz clic en el botón para escuchar lo que pide el cliente. ¡Mucha suerte!",
        "questionHeader": "¿Qué fue lo que dijo el cliente? Elige la frase correcta:"
    }
}