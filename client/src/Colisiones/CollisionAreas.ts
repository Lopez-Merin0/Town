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

export const COLLISION_AREAS: CollisionArea[] = [
    // mi casita
    {
        p1: { x: 1035, y: 755 },
        p2: { x: 1140, y: 755 },
        p3: { x: 1140, y: 625 },
        p4: { x: 1035, y: 650 },
        debugColor: '#FF0000', 
    },
    
    {
        p1: { x: 100, y: 100 },
        p2: { x: 200, y: 100 },
        p3: { x: 200, y: 200 },
        p4: { x: 100, y: 200 },
        debugColor: '#FF0000', 
    },
];