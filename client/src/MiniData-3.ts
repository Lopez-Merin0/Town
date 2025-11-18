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
    audioUrl: './como-te-llamas.mp3',
    audioText: '¿Cómo te llamas?',
    rules: 'Escucha el audio con atención y selecciona la frase correcta en español.',

    options: [
        {
            id: 1,
            text: '¿Cuántos años tienes?',
            isCorrect: false,
        },
        {
            id: 2,
            text: '¿Cómo te llamas?',
            isCorrect: true,
        },
        {
            id: 3,
            text: '¿Dónde vives?',
            isCorrect: false,
        },
        {
            id: 4,
            text: '¿Cómo estás?',
            isCorrect: false,
        },
    ],

    dialogue: {
        introTitle: "🍭 ¡El Desafío de la Dulce Escucha! en 'El Rincón del Caramelo'",

        introGreeting: [
            "¡Bienvenido! Somos Carlos y Chuy, los dueños de 'El Rincón del Caramelo'.",
            "Te dejamos un reto fácil de decir… pero solo si pones buen oído.",
            "Escucha la frase del cliente y selecciona exactamente lo que escuchaste.",
            "¡Vamos a ver si tu oído es más dulce que nuestros caramelos!"
        ],

        correctFeedback: "¡Excelente oído! La frase era \"{text}\". ¡Te ganaste un dulce imaginario pero bien merecido!",
        wrongAttempt1: "Mmm… casi. Vuelve a escuchar con atención, como cuando abres un dulce sin que te oigan. Te queda un intento.",
        wrongAttempt2: "No pasa nada. La frase correcta era \"{text}\". Errar es de humanos, mejorar es de campeones.",

        instruction: "Presiona el botón para reproducir el audio y elige la frase correcta.",
        questionHeader: "¿Qué dice el cliente?"
    }
}
