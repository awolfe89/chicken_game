// js/scenes/Level3Scene.js
class Level3Scene extends BaseLevelScene {
    constructor() {
        super('Level3Scene');
    }
    
    create() {
        this.init();
        
        // Reset collectible counter for this level
        GAME_DATA.collectibles = 0;
        GAME_DATA.totalCollectibles = 0;
        
        // Create game environment
        this.createBackground();
        this.createGroups();
        
        // Create terrain
        this.createTerrain();
        
        // Set player spawn point
        this.spawnPoint = { x: 100, y: 450 };
        this.createPlayer(this.spawnPoint.x, this.spawnPoint.y);
        
        // Add enemies
        this.createEnemies();
        
        // Add collectibles and powerups
        this.createCollectibles();
        this.createPowerups();
        
        // Add goal
        this.createLevelGoal(750, 100, 'barn');
        
        // Set up collisions
        this.setupCollisions();
        
        // Create UI
        this.createUI();
        
        // Set up input
        this.setupInput();

        //set up camera 
        this.setupCamera();
    }
    
    createBackground() {
        // Add a darker tint for the final level
        const bg = this.add.image(400, 300, 'barnBg');
        bg.setTint(0x999999);
    }
    
    createTerrain() {
        // Ground with gaps
        this.platforms.create(100, 568, '0x8B4513_400x32').setScale(0.5).refreshBody();
        this.platforms.create(300, 568, '0x8B4513_400x32').setScale(0.5).refreshBody();
        this.platforms.create(500, 568, '0x8B4513_400x32').setScale(0.5).refreshBody();
        this.platforms.create(700, 568, '0x8B4513_400x32').setScale(0.5).refreshBody();
        
        // Complex platform arrangement
        this.platforms.create(200, 450, '0xD2691E_64x32');
        this.platforms.create(350, 400, '0xD2691E_64x32');
        this.platforms.create(500, 350, '0xD2691E_64x32');
        this.platforms.create(650, 300, '0xD2691E_64x32');
        this.platforms.create(500, 200, '0xD2691E_64x32');
        this.platforms.create(350, 150, '0xD2691E_64x32');
        this.platforms.create(200, 100, '0xD2691E_64x32');
        this.platforms.create(650, 100, '0xFFD700_64x64');
        
        // Scattered platforms
        this.platforms.create(100, 350, '0xFFD700_64x64');
        this.platforms.create(250, 250, '0xFFD700_64x64');
        this.platforms.create(600, 450, '0xFFD700_64x64');
        
        // Add more hazards
        this.createMudPatch(100, 550);
        this.createMudPatch(300, 550);
        this.createMudPatch(500, 550);
        this.createMudPatch(700, 550);
        
        // Add water hazards between ground platforms
        this.createWaterPool(200, 550);
        this.createWaterPool(400, 550);
        this.createWaterPool(600, 550);
        
        // Add trampolines
        this.createTrampoline(100, 330);
        this.createTrampoline(600, 430);
        
        // Add moving platforms
        this.createMovingPlatform(200, 300, 150, 250);
        this.createMovingPlatform(400, 250, 350, 450);
        this.createMovingPlatform(600, 175, 550, 650);
    }
    
    createEnemies() {
        // More enemies for higher difficulty
        this.createEnemy(350, 350, 'pig', 300, 400, 120);
        this.createEnemy(500, 300, 'pig', 450, 550, 130);
        
        // Multiple charging cows
        this.createEnemy(200, 400, 'cow', 150, 250);
        this.createEnemy(600, 250, 'cow', 550, 650);
        
        // Jumping sheep in key areas
        this.createEnemy(350, 100, 'sheep', 300, 400, 140);
        this.createEnemy(650, 50, 'sheep', 600, 700, 160);
        
        // Multiple climbing goats
        this.createEnemy(200, 50, 'goat', 150, 250);
        this.createEnemy(500, 150, 'goat', 450, 550);
    }
    
    createCollectibles() {
        // Add corn collectibles spread throughout the level
        this.createCollectible(200, 400);
        this.createCollectible(350, 350);
        this.createCollectible(500, 300);
        this.createCollectible(650, 250);
        this.createCollectible(500, 150);
        this.createCollectible(350, 100);
        this.createCollectible(200, 50);
        this.createCollectible(650, 50);
        this.createCollectible(100, 300);
        this.createCollectible(600, 400);
        this.createCollectible(400, 200);
        this.createCollectible(300, 500);
    }
    
    createPowerups() {
        // Add all powerup types for this challenging level
        this.createPowerup(350, 100, 'egg');
        this.createPowerup(500, 150, 'speed');
        this.createPowerup(200, 50, 'jump');
        this.createPowerup(650, 50, 'invincibility');
    }
}