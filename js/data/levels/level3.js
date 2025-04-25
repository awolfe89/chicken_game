// js/data/levels/level3.js
const LEVEL3_DATA = {
    name: "Farm Danger",
    difficulty: "Advanced",
    background: '0xCD853F_800x600',
    backgroundTint: 0x999999,
    playerStart: { x: 100, y: 450 },
    goal: { x: 750, y: 100, type: 'barn' },
    
    // Platform definitions (x, y, type)
    platforms: [
        // Ground with gaps
        { x: 100, y: 568, type: 'ground', scale: 0.5 },
        { x: 300, y: 568, type: 'ground', scale: 0.5 },
        { x: 500, y: 568, type: 'ground', scale: 0.5 },
        { x: 700, y: 568, type: 'ground', scale: 0.5 },
        
        // Complex platform arrangement
        { x: 200, y: 450, type: 'wood' },
        { x: 350, y: 400, type: 'wood' },
        { x: 500, y: 350, type: 'wood' },
        { x: 650, y: 300, type: 'wood' },
        { x: 500, y: 200, type: 'wood' },
        { x: 350, y: 150, type: 'wood' },
        { x: 200, y: 100, type: 'wood' },
        { x: 650, y: 100, type: 'hayBale' },
        
        // Scattered platforms
        { x: 100, y: 350, type: 'hayBale' },
        { x: 250, y: 250, type: 'hayBale' },
        { x: 600, y: 450, type: 'hayBale' }
    ],
    
    // Hazard definitions
    hazards: {
        mud: [
            { x: 100, y: 550 },
            { x: 300, y: 550 },
            { x: 500, y: 550 },
            { x: 700, y: 550 }
        ],
        water: [
            { x: 200, y: 550 },
            { x: 400, y: 550 },
            { x: 600, y: 550 }
        ]
    },
    
    // Special platform definitions
    specialPlatforms: {
        trampolines: [
            { x: 100, y: 330 },
            { x: 600, y: 430 }
        ],
        movingPlatforms: [
            { x: 200, y: 300, leftLimit: 150, rightLimit: 250 },
            { x: 400, y: 250, leftLimit: 350, rightLimit: 450 },
            { x: 600, y: 175, leftLimit: 550, rightLimit: 650 }
        ]
    },
    
    // Enemy definitions
    enemies: {
        pigs: [
            { x: 350, y: 350, leftLimit: 300, rightLimit: 400, velocity: 120 },
            { x: 500, y: 300, leftLimit: 450, rightLimit: 550, velocity: 130 }
        ],
        sheep: [
            { x: 350, y: 100, leftLimit: 300, rightLimit: 400, velocity: 140 },
            { x: 650, y: 50, leftLimit: 600, rightLimit: 700, velocity: 160 }
        ],
        cows: [
            { x: 200, y: 400, leftLimit: 150, rightLimit: 250 },
            { x: 600, y: 250, leftLimit: 550, rightLimit: 650 }
        ],
        goats: [
            { x: 200, y: 50, leftLimit: 150, rightLimit: 250 },
            { x: 500, y: 150, leftLimit: 450, rightLimit: 550 }
        ]
    },
    
    // Collectible definitions
    collectibles: [
        { x: 200, y: 400 },
        { x: 350, y: 350 },
        { x: 500, y: 300 },
        { x: 650, y: 250 },
        { x: 500, y: 150 },
        { x: 350, y: 100 },
        { x: 200, y: 50 },
        { x: 650, y: 50 },
        { x: 100, y: 300 },
        { x: 600, y: 400 },
        { x: 400, y: 200 },
        { x: 300, y: 500 }
    ],
    
    // Powerup definitions
    powerups: {
        egg: [
            { x: 350, y: 100 }
        ],
        speed: [
            { x: 500, y: 150 }
        ],
        jump: [
            { x: 200, y: 50 }
        ],
        invincibility: [
            { x: 650, y: 50 }
        ]
    }
};