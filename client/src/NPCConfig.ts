export interface NPCDialogue {
    text: string;
    image: string;
}

export interface NPCData {
    id: string;
    name: string;
    spriteUrl: string;
    x: number;
    y: number;
    dialogues: NPCDialogue[];
}

export const NPC_LIST: NPCData[] = [
    {
        id: 'npc1',
        name: 'Roberto',
        spriteUrl: './npc1.png',
        x: 465,
        y: 585,
        dialogues: [
            {
                text: 'Tip del día: cambia tu celular al idioma que estás aprendiendo. Tu cerebro hará flexiones sin que te des cuenta.',
                image: './npc1.png'
            },
            {
                text: 'Practica verbos haciendo pequeñas frases sobre tu día. Es como calentar antes de un partido.',
                image: './npc1.png'
            },
            {
                text: 'Escucha 5 minutos de audio en el idioma cada mañana. Es café para tu cerebro.',
                image: './npc1.png'
            }
        ]
    },
    {
        id: 'npc2',
        name: 'María',
        spriteUrl: './npc2.png',
        x: 810,
        y: 350,
        dialogues: [
            {
                text: 'Juega mini juegos para repasar vocabulario. Tu mente aprende más cuando se divierte.',
                image: './npc2.png'
            },
            {
                text: 'Pronuncia en voz alta lo que aprendas. Aunque suene raro, sirve muchísimo.',
                image: './npc2.png'
            }
        ]
    },
    {
        id: 'npc3',
        name: 'Carlos',
        spriteUrl: './npc3.png',
        x: 730,
        y: 930,
        dialogues: [
            {
                text: 'Repite frases cortas varias veces al día. La repetición es tu superpoder.',
                image: './npc3.png'
            },
            {
                text: 'Cuando no entiendas algo, ¡no te frenes! Adivinar por contexto también es aprender.',
                image: './npc3.png'
            },
            {
                text: 'Dedica 10 minutos diarios. No necesitas más para volverte peligrosamente buena.',
                image: './npc3.png'
            }
        ]
    }
];
