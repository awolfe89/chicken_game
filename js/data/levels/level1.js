// js/data/levels/level1.js
const LEVEL1_DATA = {
    name: "Farm Fields",
    difficulty: "Beginner",
    background: '0x7CFC00_800x600',
    playerStart: { x: 100, y: 450 },
    goal: { x: 750, y: 120, type: 'coop' },
    
    // Platform definitions (x, y, type)
    platforms: [
        // Ground
        { x: 400, y: 568, type: 'ground', scale: 2 },
        
        // Main platforms
        { x: 600, y: 450, type: 'grass' },
        { x: 500, y: 450, type: 'grass' },
        { x: 400, y: 450, type: 'grass' },
        { x: 200, y: 350, type: 'grass' },
        { x: 300, y: 350, type: 'grass' },
        { x: 400, y: 250, type: 'grass' },
        { x: 500, y: 250, type: 'grass' },
        { x: 600, y: 150, type: 'grass' },
        { x: 700, y: 150, type: 'grass' }
    ],
    
    // Hazard definitions
    hazards: {
        mud: [
            { x: 300, y: 550 },
            { x: 350, y: 550 }
        ],
        water: [
            { x: 450, y: 550 },
            { x: 500, y: 550 }
        ]
    },
    
    // Special platform definitions
    specialPlatforms: {
        trampolines: [
            { x: 100, y: 550 }
        ],
        movingPlatforms: [
            { x: 300, y: 200, leftLimit: 250, rightLimit: 350 }
        ]
    },
    
    // Enemy definitions
    enemies: {
        pigs: [
            { x: 300, y: 400, leftLimit: 200, rightLimit: 400 }
        ],
        sheep: [
            { x: 600, y: 100, leftLimit: 550, rightLimit: 700 }
        ],
        cows: [],
        goats: []
    },
    
    // Collectible definitions
    collectibles: [
        { x: 200, y: 300 },
        { x: 300, y: 300 },
        { x: 400, y: 200 },
        { x: 500, y: 200 },
        { x: 600, y: 100 },
        { x: 700, y: 100 }
    ],
    
    // Powerup definitions
    powerups: {
        egg: [
            { x: 300, y: 150 }
        ],
        speed: [],
        jump: [
            { x: 500, y: 400 }
        ],
        invincibility: []
    }
};