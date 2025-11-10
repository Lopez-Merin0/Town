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
    sentence: 'They {gap} playing football.',
    rules: 'Completa la frase seleccionando la forma correcta del verbo "To Be" (ser/estar).',
    
    options: [
        {
            id: 1,
            text: 'is', 
            isCorrect: false,
        },
        {
            id: 2,
            text: 'are', 
            isCorrect: true,
        },
        {
            id: 3,
            text: 'am',
            isCorrect: false,
        },
        {
            id: 4,
            text: 'be', 
            isCorrect: false,
        },
    ],

    dialogue: {
        introTitle: '🎁 ¡Bienvenido al Rincón Gramatical!',

        introGreeting: [
            '¡Hola qué alegría verte en nuestra tienda!',
            'Soy Cristi. Un cliente nos acaba de dejar esta nota con una pequeña tarea de inglés:',
            'Quieren que les demostremos que sabemos cómo conjugar los verbos. ¡Este es tu desafío!',
            'Tu misión: Rellena el hueco de la frase con la forma correcta del verbo "To Be". ¡Mucha suerte!',
        ],

        correctFeedback: '¡Perfecto! ¡La forma correcta es "{text}"! "They are playing football" es correcto. ¡Has demostrado un excelente nivel gramatical!',
        wrongAttempt1: '¡Ups! Recuerda que el sujeto es plural ("They"). ¿Qué forma del verbo "To Be" usas con "They"? Te queda una oportunidad más.',
        wrongAttempt2: 'No te preocupes. La palabra correcta era "{text}". Recuerda: con "They" usamos "are". ¡El verdadero regalo es el aprendizaje!',

        instruction: 'Selecciona la forma correcta del verbo "To Be" para completar la frase.',
        questionHeader: 'El Desafío es: ',
    }
};