import npc1 from '../assets/mundo/npc1.png';
import npc2 from '../assets/mundo/npc2.png';
import npc3 from '../assets/mundo/npc3.png';
import npc4 from '../assets/mundo/npc4.png';
import npc5 from '../assets/mundo/npc5.png';

import dialogueNpc1 from '../assets/mundo/npc1.png';
import dialogueNpc2 from '../assets/mundo/npc2.png';
import dialogueNpc3 from '../assets/mundo/npc3.png';
import dialogueNpc4 from '../assets/mundo/npc4.png';
import dialogueNpc5 from '../assets/mundo/npc5.png';

const NPC1 = npc1;
const NPC2 = npc2;
const NPC3 = npc3;
const NPC4 = npc4;
const NPC5 = npc5;


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
        name: 'Victor',
        spriteUrl: NPC1,
        x: 465,
        y: 585,
        dialogues: [
            {
                text: 'Tip del día: cambia tu celular al idioma que estás aprendiendo. Tu cerebro hará flexiones sin que te des cuenta.',
                image: dialogueNpc1
            },
            {
                text: 'Practica verbos haciendo pequeñas frases sobre tu día. Es como calentar antes de un partido.',
                image: dialogueNpc1
            },
            {
                text: 'Escucha 5 minutos de audio en el idioma cada mañana. Es café para tu cerebro.',
                image: dialogueNpc1
            }
        ]
    },
    {
        id: 'npc2',
        name: 'Pedro',
        spriteUrl: NPC2,
        x: 810,
        y: 350,
        dialogues: [
            {
                text: 'Juega mini juegos para repasar vocabulario. Tu mente aprende más cuando se divierte.',
                image: dialogueNpc2
            },
            {
                text: 'Pronuncia en voz alta lo que aprendas. Aunque suene raro, sirve muchísimo.',
                image: dialogueNpc2
            }
        ]
    },
    {
        id: 'npc3',
        name: 'Hector',
        spriteUrl: NPC3,
        x: 730,
        y: 930,
        dialogues: [
            {
                text: 'Repite frases cortas varias veces al día. La repetición es tu superpoder.',
                image: dialogueNpc3
            },
            {
                text: 'Cuando no entiendas algo, ¡no te frenes! Adivinar por contexto también es aprender.',
                image: dialogueNpc3
            },
            {
                text: 'Dedica 10 minutos diarios. No necesitas más para volverte peligrosamente buena.',
                image: dialogueNpc3
            }
        ]
    },
    {
        id: 'npc4',
        name: 'Luis',
        spriteUrl: NPC4,
        x: 600,
        y: 400,
        dialogues: [
            {
                text: 'Lee en voz alta todos los días. Tu pronunciación mejorará sin que te des cuenta.',
                image: dialogueNpc4
            },
            {
                text: 'No tengas miedo de cometer errores. Cada error es una lección disfrazada.',
                image: dialogueNpc4
            },
            {
                text: 'Escribe un diario en el idioma que aprendes. Documenta tu progreso y tus pensamientos.',
                image: dialogueNpc4
            }
        ]
    },
    {
        id: 'npc5',
        name: 'Carlos',
        spriteUrl: NPC5,
        x: 900,
        y: 650,
        dialogues: [
            {
                text: 'Usa tarjetas de memoria para vocabulario nuevo. La repetición espaciada es clave.',
                image: dialogueNpc5
            },
            {
                text: 'Intenta pensar en el idioma que estudias. Cambia el idioma de tus pensamientos internos.',
                image: dialogueNpc5
            },
            {
                text: 'Celebra tus pequeños logros. Cada palabra nueva es una victoria que merece reconocimiento.',
                image: dialogueNpc5
            }
        ]
    }
];
