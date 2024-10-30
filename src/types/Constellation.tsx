export type Constellation = {
    id: number;
    name: string;
    constellationSize: { x: number; y: number }[];
    stars: { x: number; y: number }[];
    image: string;
};

export const constellations: Constellation[] = [
    {
        id: 0,
        name: 'Phearion',
        constellationSize: [
            { x: 10, y: 10 },
            { x: 300, y: 300 },
        ],
        stars: [
            { x: 70, y: 100 },
            { x: 120, y: 110 },
            { x: 180, y: 15 },
            { x: 250, y: 150 },
            { x: 150, y: 220 },
            { x: 130, y: 270 },
        ],
        image: 'Phearion-logo.png',
    },
    {
        id: 1,
        name: 'Xonic',
        constellationSize: [
            { x: 25, y: 60 },
            { x: 300, y: 300 },
        ],
        stars: [
            { x: 60, y: 45 },
            { x: 220, y: 45 },
            { x: 70, y: 230 },
            { x: 220, y: 230 },
        ],
        image: 'Xonic-logo.png',
    },
    {
        id: 2,
        name: 'BigBrain',
        constellationSize: [
            { x: 50, y: 60 },
            { x: 300, y: 300 },
        ],
        stars: [
            { x: 50, y: 260 },
            { x: 20, y: 200 },
            { x: 20, y: 90 },
            { x: 70, y: 30 },
            { x: 145, y: 40 },
            { x: 220, y: 30 },
            { x: 270, y: 90 },
            { x: 270, y: 200 },
            { x: 240, y: 260 },
        ],
        image: 'BigBrain-logo.png',
    },
    {
        id: 3,
        name: 'Lumina',
        constellationSize: [
            { x: 75, y: 10 },
            { x: 300, y: 300 },
        ],
        stars: [
            { x: 175, y: 15 },
            { x: 115, y: 30 },
            { x: 55, y: 25 },
            { x: 75, y: 125 },
            { x: 20, y: 250 },
            { x: 55, y: 270 },
            { x: 120, y: 250 },
            { x: 200, y: 270 },
            { x: 270, y: 220 },
        ],
        image: 'Lumina-logo.png',
    },
];
