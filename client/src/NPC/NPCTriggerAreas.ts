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

// NOTA: Coordenadas ajustadas para SCALE_FACTOR = 1.4
// Mapa base: 1024x640, escalado: 1434x896

export const NPC_TRIGGER_AREAS: NPCTriggerArea[] = [
    // NPC 1 - Cerca de la casa azul (arriba-izquierda)
    {
        topLeft: { x: 200, y: 180 },
        bottomRight: { x: 320, y: 280 },
        npcId: 'npc1',
        debugColor: '#FFFF00',
    },

    // NPC 2 - Cerca de la tienda SHOP (derecha-arriba)
    {
        topLeft: { x: 1020, y: 200 },
        bottomRight: { x: 1140, y: 300 },
        npcId: 'npc2',
        debugColor: '#FFFF00',
    },

    // NPC 3 - Cerca del GYM (centro)
    {
        topLeft: { x: 620, y: 300 },
        bottomRight: { x: 740, y: 480 },
        npcId: 'npc3',
        debugColor: '#FFFF00',
    },
];
