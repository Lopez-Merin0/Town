export interface Point {
    x: number;
    y: number;
}

export interface CollisionArea {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    debugColor: string; 
}

interface SimpleCollisionArea {
    topLeft: Point;
    bottomRight: Point;
    debugColor: string;
}

const createRectangle = (area: SimpleCollisionArea): CollisionArea => {
    return {
        p1: { x: area.topLeft.x, y: area.topLeft.y },          
        p2: { x: area.bottomRight.x, y: area.topLeft.y },       
        p3: { x: area.bottomRight.x, y: area.bottomRight.y },   
        p4: { x: area.topLeft.x, y: area.bottomRight.y },      
        debugColor: area.debugColor,
    };
};

const SIMPLE_COLLISION_AREAS: SimpleCollisionArea[] = [
    //CASAS

    // Casa azul
    {
        topLeft: { x: 172, y: 73 },
        bottomRight: { x: 291, y: 202 },
        debugColor: '#FF0000',
    },
    // arbolito izquierdo
    {
        topLeft: { x: 136, y: 204 },
        bottomRight: { x: 178, y: 250 },
        debugColor: '#FF0000',
    },
    // cosa cafe de la derecha
    {
        topLeft: { x: 290, y: 222 },
        bottomRight: { x: 178, y: 250 },
        debugColor: '#FF0000',
    },
    // arbolito de la ardilla
    {
        topLeft: { x: 433, y: 8 },
        bottomRight: { x: 489, y: 26 },
        debugColor: '#FF0000',
    },


    // Casa teal - Nivel #1
    {
        topLeft: { x: 162, y: 377 },
        bottomRight: { x: 302, y: 496 },
        debugColor: '#FF0000',
    },
    // arbol inferior izquierdo
    {
        topLeft: { x: 132, y: 488 },
        bottomRight: { x: 174, y: 537 },
        debugColor: '#FF0000',
    },
    // arbol superior izquierdo
    {
        topLeft: { x: 129, y: 344 },
        bottomRight: { x: 174, y: 397 },
        debugColor: '#FF0000',
    },
    // arbol superior derecho
    {
        topLeft: { x: 286, y: 351 },
        bottomRight: { x: 339, y: 400 },
        debugColor: '#FF0000',
    },
    // arbol medio derecho
    {
        topLeft: { x: 339, y: 407 },
        bottomRight: { x: 398, y: 460 },
        debugColor: '#FF0000',
    },
    // banca
    {
        topLeft: { x: 206, y: 355 },
        bottomRight: { x: 265, y: 372 },
        debugColor: '#FF0000',
    },


    // Casa morada pequeña
    {
        topLeft: { x: 158, y: 671 },
        bottomRight: { x: 305, y: 794 },
        debugColor: '#FF0000',
    },
    // arbol inferior izquierdo
    {
        topLeft: { x: 132, y: 796 },
        bottomRight: { x: 171, y: 832 },
        debugColor: '#FF0000',
    },
    // arbol superior izquierdo
    {
        topLeft: { x: 136, y: 629 },
        bottomRight: { x: 181, y: 682 },
        debugColor: '#FF0000',
    },
    // banca
    {
        topLeft: { x: 206, y: 640 },
        bottomRight: { x: 262, y: 657 },
        debugColor: '#FF0000',
    },
    // arbol superior derecho
    {
        topLeft: { x: 293, y: 636 },
        bottomRight: { x: 342, y: 685 },
        debugColor: '#FF0000',
    },
    // arbol superior medio
    {
        topLeft: { x: 370, y: 675 },
        bottomRight: { x: 419, y: 727 },
        debugColor: '#FF0000',
    },
    // arbol varios
    {
        topLeft: { x: 402, y: 797 },
        bottomRight: { x: 675, y: 832 },
        debugColor: '#FF0000',
    },


    // Casa verde larga - Nivel #2
    {
        topLeft: { x: 669, y: 24 },
        bottomRight: { x: 876, y: 139 },
        debugColor: '#FF0000',
    },
    // obstaculos
    {
        topLeft: { x: 633, y: 8 },
        bottomRight: { x: 685, y: 166 },
        debugColor: '#FF0000',
    },


    // GYM 
    {
        topLeft: { x: 659, y: 290 },
        bottomRight: { x: 869, y: 433 },
        debugColor: '#FF0000',
    },
    // banca izquierda 
    {
        topLeft: { x: 629, y: 460 },
        bottomRight: { x: 717, y: 481 },
        debugColor: '#FF0000',
    },
    // banca derecha 
    {
        topLeft: { x: 804, y: 463 },
        bottomRight: { x: 899, y: 477 },
        debugColor: '#FF0000',
    },
    // arbol inferior 
    {
        topLeft: { x: 629, y: 425 },
        bottomRight: { x: 661, y: 453 },
        debugColor: '#FF0000',
    },
    // arbol superior 
    {
        topLeft: { x: 626, y: 267 },
        bottomRight: { x: 661, y: 302 },
        debugColor: '#FF0000',
    },


    // SHOP
    {
        topLeft: { x: 1068, y: 125 },
        bottomRight: { x: 1222, y: 234 },
        debugColor: '#FF0000',
    },
    // banca izquierda
    {
        topLeft: { x: 1007, y: 267 },
        bottomRight: { x: 1060, y: 285 },
        debugColor: '#FF0000',
    },
    // banca derecha
    {
        topLeft: { x: 1238, y: 173 },
        bottomRight: { x: 1263, y: 246 },
        debugColor: '#FF0000',
    },
    // arbol inferior izquierdo
    {
        topLeft: { x: 990, y: 145 },
        bottomRight: { x: 1025, y: 201 },
        debugColor: '#FF0000',
    },
    // arbol superior izquierdo
    {
        topLeft: { x: 986, y: 22 },
        bottomRight: { x: 1025, y: 75 },
        debugColor: '#FF0000',
    },
    // arbol superior derecho & arbusto
    {
        topLeft: { x: 1074, y: 29 },
        bottomRight: { x: 1175, y: 96 },
        debugColor: '#FF0000',
    },


    // Casa morada larga - Nivel #3
    {
        topLeft: { x: 1033, y: 507 },
        bottomRight: { x: 1236, y: 636 },
        debugColor: '#FF0000',
    },
    // arboles
    {
        topLeft: { x: 986, y: 407 },
        bottomRight: { x: 1025, y: 533 },
        debugColor: '#FF0000',
    },
    // mail
    {
        topLeft: { x: 993, y: 586 },
        bottomRight: { x: 1025, y: 631 },
        debugColor: '#FF0000',
    },


    // Casa verde pequeña
    {
        topLeft: { x: 680, y: 594 },
        bottomRight: { x: 827, y: 755 },
        debugColor: '#FF0000',
    },
    // arbol izquierdo
    {
        topLeft: { x: 633, y: 561 },
        bottomRight: { x: 671, y: 621 },
        debugColor: '#FF0000',
    },
    // arbol derecho
    {
        topLeft: { x: 790, y: 565 },
        bottomRight: { x: 825, y: 596 },
        debugColor: '#FF0000',
    },
    // banca
    {
        topLeft: { x: 636, y: 673 },
        bottomRight: { x: 661, y: 719 },
        debugColor: '#FF0000',
    },

    // NPCs 
    // NPC Victor (npc1)
    {
        topLeft: { x: 200, y: 180 },
        bottomRight: { x: 320, y: 280 },
        debugColor: '#FF0000',
    },
    // NPC Pedro (npc2)
    {
        topLeft: { x: 1020, y: 200 },
        bottomRight: { x: 1140, y: 300 },
        debugColor: '#FF0000',
    },
    // NPC Hector (npc3)
    {
        topLeft: { x: 620, y: 300 },
        bottomRight: { x: 740, y: 480 },
        debugColor: '#FF0000',
    },
    // NPC Luis (npc4)
    {
        topLeft: { x: 600, y: 400 },
        bottomRight: { x: 720, y: 500 },
        debugColor: '#FF0000',
    },
    // NPC Carlos (npc5)
    {
        topLeft: { x: 900, y: 650 },
        bottomRight: { x: 1020, y: 750 },
        debugColor: '#FF0000',
    },


    //MAR
    // Sección #1
    {
        topLeft: { x: 521, y: 8 },
        bottomRight: { x: 622, y: 169 },
        debugColor: '#FF0000',
    },
    // Sección #2
    {
        topLeft: { x: 454, y: 92 },
        bottomRight: { x: 528, y: 299 },
        debugColor: '#FF0000',
    },
    // Sección #3
    {
        topLeft: { x: 416, y: 383 },
        bottomRight: { x: 528, y: 477 },
        debugColor: '#FF0000',
    },
    // Sección #4
    {
        topLeft: { x: 412, y: 565 },
        bottomRight: { x: 528, y: 733 },
        debugColor: '#FF0000',
    },
    // Sección #5
    {
        topLeft: { x: 535, y: 635 },
        bottomRight: { x: 619, y: 740 },
        debugColor: '#FF0000',
    },
    // Sección #6
    {
        topLeft: { x: 622, y: 740 },
        bottomRight: { x: 734, y: 832 },
        debugColor: '#FF0000',
    },

    //Bosque
    // izquierda
    {
        topLeft: { x: 8, y: 8 },
        bottomRight: { x: 40, y: 832 },
        debugColor: '#FF0000',
    },
    // derecha
    {
        topLeft: { x: 1277, y: 8 },
        bottomRight: { x: 1336, y: 832 },
        debugColor: '#FF0000',
    },
];

export const COLLISION_AREAS: CollisionArea[] = SIMPLE_COLLISION_AREAS.map(createRectangle);