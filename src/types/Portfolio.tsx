// types/Portfolio.ts
export interface ConstellationPoint {
    x: number;
    y: number;
}

export interface ProjectBase {
    id: number;
    name: string;
    image: string;
    type: 'logo' | 'ui' | 'advertising';
    description: string;
}

export interface LogoConstellation extends ProjectBase {
    type: 'logo';
    constellationSize: ConstellationPoint[];
    stars: ConstellationPoint[];
}

export interface UIProject extends ProjectBase {
    type: 'ui';
    technologies: string[];
    liveUrl?: string;
    relatedLogo?: string;
}

export interface AdvertisingProject extends ProjectBase {
    type: 'advertising';
    client: string;
    campaignDate: string;
}

export type PortfolioItem = LogoConstellation | UIProject | AdvertisingProject;

export const portfolioData: PortfolioItem[] = [
    {
        id: 0,
        name: 'Phearion',
        type: 'logo',
        description: 'Dynamic brand identity with cosmic elements',
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
        type: 'logo',
        description: 'Minimalist tech-focused logo design',
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
        type: 'logo',
        description: 'Educational platform branding',
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
        type: 'logo',
        description: 'Elegant lighting brand identity',
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
    {
        id: 4,
        name: 'BigBrain AI Website',
        type: 'ui',
        description: 'Complete UI/UX design for an innovative student ressources platform.',
        technologies: ['Figma'],
        image: 'BigBrain-UI.png',
        relatedLogo: 'BigBrain-logo.png'
    },
    {
        id: 5,
        name: 'Mythical game assets',
        type: 'ui',
        description: 'Fantasy-themed assets (creatures, characters) for a Discord bot game.',
        technologies: ['Adobe Illustrator'],
        image: 'Mythical-Assets.png',
        liveUrl: 'https://phearion.mythical.fr',
    }
];

export const isLogoConstellation = (item: PortfolioItem): item is LogoConstellation => {
    return item.type === 'logo';
};

export const isUIProject = (item: PortfolioItem): item is UIProject => {
    return item.type === 'ui';
};

export const isAdvertisingProject = (item: PortfolioItem): item is AdvertisingProject => {
    return item.type === 'advertising';
};