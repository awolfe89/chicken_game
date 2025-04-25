// js/data/levels/level2.js
const LEVEL2_DATA = {
    name: "Barn Yard",
    difficulty: "Intermediate",
    background: '0xCD853F_800x600',
    playerStart: { x: 100, y: 450 },
    goal: { x: 750, y: 150, type: 'barn' },
    
    // Platform definitions (x, y, type)
    platforms: [
        // Ground
        { x: 400, y: 568, type: 'ground', scale: 2 },
        
        // Barn platforms
        { x: 150, y: 450, type: 'wood' },
        { x: 300, y: 400, type: 'wood' },
        { x: 450, y: 350, type: 'wood' },
        { x: 600, y: 300, type: 'wood' },
        { x: 450, y: 200, type: 'wood' },
        { x: 300, y: 150, type: 'wood' },
        { x: 700, y: 150, type: 'wood' },
        
        // Hay bales as platforms
        { x: 150, y: 300, type: 'hayBale' },
        { x: 550, y: 450, type: 'hayBale' },
        
        // Fences
        { x: 200, y: 535, type: 'fence' },
        { x: 500, y: 535, type: 'fence' }
    ],
    
    // Hazard definitions
    hazards: {
        mud: [
            { x: 300, y: 550 },
            { x: 350, y: 550 },
            { x: 400, y: 550 }
        ],
        water: [
            { x: 100, y: 550 },
            { x: 650, y: 550 }
        ]
    },
    
    // Special platform definitions
    specialPlatforms: {
        trampolines: [
            { x: 700, y: 550 }
        ],
        movingPlatforms: [
            { x: 250, y: 250, leftLimit: 150, rightLimit: 350 },
            { x: 550, y: 400, leftLimit: 450, rightLimit: 650 }
        ]
    },
    
    // Enemy definitions
    enemies: {
        pigs: [
            { x: 300, y: 350, leftLimit: 250, rightLimit: 400 }
        ],
        sheep: [
            { x: 150, y: 250, leftLimit: 100, rightLimit: 200 }
        ],
        cows: [
            { x: 500, y: 250, leftLimit: 400, rightLimit: 600 }
        ],
        goats: [
            { x: 650, y: 250, leftLimit: 600, rightLimit: 700 }
        ]
    },
    
    // Collectible definitions
    collectibles: [
        { x: 150, y: 400 },
        { x: 300, y: 350 },
        { x: 450, y: 300 },
        { x: 600, y: 250 },
        { x: 450, y: 150 },
        { x: 300, y: 100 },
        { x: 700, y: 100 },
        { x: 150, y: 250 },
        { x: 550, y: 400 }
    ],
    
    // Powerup definitions
    powerups: {
        egg: [
            { x: 450, y: 150 }
        ],
        speed: [
            { x: 150, y: 250 }
        ],
        jump: [],
        invincibility: [
            { x: 600, y: 250 }
        ]
    }
};