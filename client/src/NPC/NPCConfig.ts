import npc1 from '../assets/mundo/npc1.png';
import npc2 from '../assets/mundo/npc2.png';
import npc3 from '../assets/mundo/npc3.png';

const NPC1 = npc1;
const NPC2 = npc2;
const NPC3 = npc3;

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
        spriteUrl: NPC1,
        x: 465,
        y: 585,
        dialogues: [
            {
                text: 'Tip del día: cambia tu celular al idioma que estás aprendiendo. Tu cerebro hará flexiones sin que te des cuenta.',
                image: NPC1
            },
            {
                text: 'Practica verbos haciendo pequeñas frases sobre tu día. Es como calentar antes de un partido.',
                image: NPC1
            },
            {
                text: 'Escucha 5 minutos de audio en el idioma cada mañana. Es café para tu cerebro.',
                image: NPC1
            }
        ]
    },
    {
        id: 'npc2',
        name: 'María',
        spriteUrl: NPC2,
        x: 810,
        y: 350,
        dialogues: [
            {
                text: 'Juega mini juegos para repasar vocabulario. Tu mente aprende más cuando se divierte.',
                image: NPC2
            },
            {
                text: 'Pronuncia en voz alta lo que aprendas. Aunque suene raro, sirve muchísimo.',
                image: NPC2
            }
        ]
    },
    {
        id: 'npc3',
        name: 'Carlos',
        spriteUrl: NPC3,
        x: 730,
        y: 930,
        dialogues: [
            {
                text: 'Repite frases cortas varias veces al día. La repetición es tu superpoder.',
                image: NPC3
            },
            {
                text: 'Cuando no entiendas algo, ¡no te frenes! Adivinar por contexto también es aprender.',
                image: NPC3
            },
            {
                text: 'Dedica 10 minutos diarios. No necesitas más para volverte peligrosamente buena.',
                image: NPC3
            }
        ]
    }
];
