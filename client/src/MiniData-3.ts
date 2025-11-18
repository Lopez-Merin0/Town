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

export const MINIGAME_3_QUESTIONS: MinigameQuestion[] = [
    {
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
            wrongAttempt2: "No pasa nada. Equivocarse es normal.",

            instruction: "Presiona el botón para reproducir el audio y elige la frase correcta.",
            questionHeader: "¿Qué dice el cliente?"
        }
    },
    {
        id: 2,
        audioUrl: './hola-como-estas.mp3',
        audioText: 'Hola, ¿cómo estás?',
        rules: 'Escucha con atención el saludo y selecciona la frase que coincide con el audio.',

        options: [
            {
                id: 1,
                text: 'Hola, ¿cómo estás?',
                isCorrect: true,
            },
            {
                id: 2,
                text: 'Hola, ¿qué haces?',
                isCorrect: false,
            },
            {
                id: 3,
                text: '¿Cómo te llamas?',
                isCorrect: false,
            },
            {
                id: 4,
                text: 'Buenas tardes, mucho gusto.',
                isCorrect: false,
            },
        ],

        dialogue: {
            introTitle: "🎤 ¡Desafío de Audio #2 en 'El Rincón del Caramelo'!",
            introGreeting: [
                "¡Seguimos fuerte! Carlos y Chuy te dejaron otro audio recién grabado.",
                "Esta vez es un saludo súper común… pero ya sabes que aquí nada es tan fácil como parece.",
                "Pon atención y demuestra tu oído dorado.",
                "¿Lista para otra ronda?"
            ],

            correctFeedback: "¡Esoooo! \"{text}\" era la frase exacta. Tu oído anda fino como hilo dental. 🔥",
            wrongAttempt1: "Mmm… estuvo cerca, vuélvelo a escuchar con calma. Aún tienes un intento.",
            wrongAttempt2: "Todo bien. ¡Regresa e intenta de nuevo!",

            instruction: "Pulsa el botón para reproducir el audio y elige el saludo correcto.",
            questionHeader: "¿Qué escuchaste?"
        }
    }
];
