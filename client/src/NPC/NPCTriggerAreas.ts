export interface Point {
    x: number;
    y: number;
}

export interface NPCTriggerArea {
    topLeft: Point;
    bottomRight: Point;
    npcId: string;
    debugColor: string;
}

export const NPC_TRIGGER_AREAS: NPCTriggerArea[] = [
    // NPC 1 - ardilla
    {
        topLeft: { x: 417, y: 38 },
        bottomRight: { x: 463, y: 69 },
        npcId: 'npc1',
        debugColor: '#FFFF00',
    },

    // NPC 2 - zorro
    {
        topLeft: { x: 267, y: 496 },
        bottomRight: { x: 319, y: 535 },
        npcId: 'npc2',
        debugColor: '#FFFF00',
    },

    // NPC 3 - buho
    {
        topLeft: { x: 816, y: 129 },
        bottomRight: { x: 865, y: 171 },
        npcId: 'npc3',
        debugColor: '#FFFF00',
    },

    // NPC 4 - venadito
    {
        topLeft: { x: 1156, y: 241 },
        bottomRight: { x: 1198, y: 293 },
        npcId: 'npc2',
        debugColor: '#FFFF00',
    },

    // NPC 5 - oso
    {
        topLeft: { x: 1058, y: 622 },
        bottomRight: { x: 1117, y: 664 },
        npcId: 'npc3',
        debugColor: '#FFFF00',
    },
];
