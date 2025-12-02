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

// NOTA: Todas las coordenadas están multiplicadas por SCALE_FACTOR = 2
// porque el mapa se renderiza a 2048x1280 (1024x640 * 2)

export const COLLISION_AREAS: CollisionArea[] = [
    // ========== EDIFICIOS Y CASAS ==========

    // Edificio grande (arriba-izquierda) - Tienda/Hotel
    {
        p1: { x: 160, y: 130 },
        p2: { x: 440, y: 130 },
        p3: { x: 440, y: 430 },
        p4: { x: 160, y: 430 },
        debugColor: '#FF6B6B',
    },

    // Casa marrón (arriba-centro)
    {
        p1: { x: 630, y: 60 },
        p2: { x: 810, y: 60 },
        p3: { x: 810, y: 290 },
        p4: { x: 630, y: 290 },
        debugColor: '#8B4513',
    },

    // Casa azul con techo azul (arriba-derecha del centro)
    {
        p1: { x: 980, y: 190 },
        p2: { x: 1290, y: 190 },
        p3: { x: 1290, y: 360 },
        p4: { x: 980, y: 360 },
        debugColor: '#4169E1',
    },

    // Casa azul 1 (centro)
    {
        p1: { x: 960, y: 410 },
        p2: { x: 1160, y: 410 },
        p3: { x: 1160, y: 560 },
        p4: { x: 960, y: 560 },
        debugColor: '#1E90FF',
    },

    // Casa azul 2 (centro-derecha)
    {
        p1: { x: 1200, y: 410 },
        p2: { x: 1400, y: 410 },
        p3: { x: 1400, y: 560 },
        p4: { x: 1200, y: 560 },
        debugColor: '#1E90FF',
    },

    // Casa con techo azul claro (centro-abajo)
    {
        p1: { x: 780, y: 640 },
        p2: { x: 1080, y: 640 },
        p3: { x: 1080, y: 810 },
        p4: { x: 780, y: 810 },
        debugColor: '#87CEEB',
    },

    // Casita pequeña (centro-derecha-abajo)
    {
        p1: { x: 1110, y: 680 },
        p2: { x: 1280, y: 680 },
        p3: { x: 1280, y: 830 },
        p4: { x: 1110, y: 830 },
        debugColor: '#5F9EA0',
    },

    // Casa naranja (centro-abajo)
    {
        p1: { x: 770, y: 920 },
        p2: { x: 1040, y: 920 },
        p3: { x: 1040, y: 1110 },
        p4: { x: 770, y: 1110 },
        debugColor: '#FF8C00',
    },

    // Invernadero/Casa de cristal (izquierda-centro)
    {
        p1: { x: 350, y: 690 },
        p2: { x: 560, y: 690 },
        p3: { x: 560, y: 950 },
        p4: { x: 350, y: 950 },
        debugColor: '#98FB98',
    },

    // Mi casita (derecha-centro)
    {
        p1: { x: 1035, y: 755 },
        p2: { x: 1140, y: 755 },
        p3: { x: 1140, y: 625 },
        p4: { x: 1035, y: 650 },
        debugColor: '#FFB6C1',
    },

    // ========== ÁRBOLES Y BOSQUES ==========

    // Bosque superior izquierdo
    {
        p1: { x: 0, y: 0 },
        p2: { x: 510, y: 0 },
        p3: { x: 510, y: 100 },
        p4: { x: 0, y: 100 },
        debugColor: '#228B22',
    },

    // Bosque izquierdo
    {
        p1: { x: 0, y: 100 },
        p2: { x: 130, y: 100 },
        p3: { x: 130, y: 1200 },
        p4: { x: 0, y: 1200 },
        debugColor: '#228B22',
    },

    // Bosque derecho superior
    {
        p1: { x: 1470, y: 430 },
        p2: { x: 2000, y: 430 },
        p3: { x: 2000, y: 680 },
        p4: { x: 1470, y: 680 },
        debugColor: '#228B22',
    },

    // Bosque derecho inferior
    {
        p1: { x: 1470, y: 860 },
        p2: { x: 2000, y: 860 },
        p3: { x: 2000, y: 1280 },
        p4: { x: 1470, y: 1280 },
        debugColor: '#228B22',
    },

    // ========== RÍO/MAR ==========

    // Río parte superior
    {
        p1: { x: 1310, y: 0 },
        p2: { x: 1460, y: 0 },
        p3: { x: 1460, y: 420 },
        p4: { x: 1310, y: 420 },
        debugColor: '#1E90FF',
    },

    // Río curva 1
    {
        p1: { x: 1310, y: 420 },
        p2: { x: 1460, y: 420 },
        p3: { x: 1460, y: 540 },
        p4: { x: 1310, y: 540 },
        debugColor: '#1E90FF',
    },

    // Río parte central
    {
        p1: { x: 1220, y: 540 },
        p2: { x: 1460, y: 540 },
        p3: { x: 1460, y: 820 },
        p4: { x: 1220, y: 820 },
        debugColor: '#1E90FF',
    },

    // Río parte inferior
    {
        p1: { x: 1100, y: 820 },
        p2: { x: 1460, y: 820 },
        p3: { x: 1460, y: 1060 },
        p4: { x: 1100, y: 1060 },
        debugColor: '#1E90FF',
    },

    // Río expansión inferior
    {
        p1: { x: 1100, y: 1060 },
        p2: { x: 1460, y: 1060 },
        p3: { x: 1460, y: 1280 },
        p4: { x: 1100, y: 1280 },
        debugColor: '#1E90FF',
    },

    // ========== ROCAS Y MONTAÑAS ==========

    // Zona rocosa superior derecha
    {
        p1: { x: 1470, y: 0 },
        p2: { x: 2048, y: 0 },
        p3: { x: 2048, y: 420 },
        p4: { x: 1470, y: 420 },
        debugColor: '#8B7355',
    },

    // ========== PUENTES (zonas transitables) ==========

    // NOTA: Los puentes NO deben ser colisiones, son áreas donde SÍ puedes caminar
    // Comenta estas áreas si quieres poder cruzar los puentes

    /*
    // Puente superior
    {
        p1: { x: 1360, y: 570 },
        p2: { x: 1460, y: 570 },
        p3: { x: 1460, y: 650 },
        p4: { x: 1360, y: 650 },
        debugColor: '#8B4513',
    },

    // Puente inferior
    {
        p1: { x: 1190, y: 1080 },
        p2: { x: 1290, y: 1080 },
        p3: { x: 1290, y: 1200 },
        p4: { x: 1190, y: 1200 },
        debugColor: '#8B4513',
    },
    */
];