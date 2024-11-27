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
    company?: string;
    fictionalCompany?: string;
    association?: string;

}

export interface UIProject extends ProjectBase {
    type: 'ui';
    technologies: string[];
    liveUrl?: string;
    relatedLogo?: string;
    company?: string;
    association?: string;
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
        description: 'A minimalist logo designed for a tech company.',
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
        company: 'Phearion'
    },
    {
        id: 1,
        name: 'Xonic',
        type: 'logo',
        description: 'Minimalist tech-focused logo design for a workshop.',
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
        fictionalCompany: 'Xonic'
    },
    {
        id: 2,
        name: 'BigBrain',
        type: 'logo',
        description: 'Logo of an AI project for students. The project is called BigBrain and aims to help students with their studies thanks to large language models.',
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
        description: 'Elegant lighting brand logo for a fighter type video game.',
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
        company: 'Phearion'
    },
    {
        id: 4,
        name: 'BigBrain AI Website',
        type: 'ui',
        description: 'Complete UI/UX design for an innovative student ressources platform.',
        technologies: ['Figma'],
        image: 'BigBrain-UI.png',
        relatedLogo: 'BigBrain-logo.png',
        association: 'Scrypt, Paris',
    },
    {
        id: 5,
        name: 'Mythical game assets',
        type: 'ui',
        description: 'Fantasy-themed assets (creatures, characters) for a Discord bot game.',
        technologies: ['Adobe Illustrator'],
        image: 'Mythical-Assets.png',
        liveUrl: 'https://phearion.mythical.fr',
    },
    {
        id: 6,
        name: 'Ospor mockup',
        type: 'advertising',
        description: 'Mockup of a fictional sports brand for a university project.',
        client: 'Ospor',
        campaignDate: '2023',
        image: 'Ospor-Ad.png',
    }
];

export const isLogoConstellation = (item: PortfolioItem): item is LogoConstellation => {
    return item.type === 'logo';
};