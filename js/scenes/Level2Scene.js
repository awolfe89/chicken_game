// js/scenes/Level2Scene.js
class Level2Scene extends BaseLevelScene {
    constructor() {
        super('Level2Scene');
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
        this.spawnPoint = { x: 150, y: 400 }; // On the first wooden platform
        this.createPlayer(this.spawnPoint.x, this.spawnPoint.y);
        
        // Add enemies
        this.createEnemies();
        
        // Add collectibles and powerups
        this.createCollectibles();
        this.createPowerups();
        
        // Add goal
        this.createLevelGoal(750, 150, 'barn');
        
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
        this.add.image(400, 300, 'farmBg');
    }
    
    createTerrain() {
        // Ground
        this.platforms.create(400, 568, '0x8B4513_400x32').setScale(2).refreshBody();
        
        // Barn platforms
        this.platforms.create(150, 450, '0xD2691E_64x32');
        this.platforms.create(300, 400, '0xD2691E_64x32');
        this.platforms.create(450, 350, '0xD2691E_64x32');
        this.platforms.create(600, 300, '0xD2691E_64x32');
        this.platforms.create(450, 200, '0xD2691E_64x32');
        this.platforms.create(300, 150, '0xD2691E_64x32');
        this.platforms.create(700, 150, '0xD2691E_64x32');
        
        // Hay bales as platforms
        this.platforms.create(150, 300, '0xFFD700_64x64');
        this.platforms.create(550, 450, '0xFFD700_64x64');
        
        // Add fences
        this.platforms.create(200, 535, '0xA0522D_64x32');
        this.platforms.create(500, 535, '0xA0522D_64x32');
        
        // Add hazards
        this.createMudPatch(300, 550);
        this.createMudPatch(350, 550);
        this.createMudPatch(400, 550);
        
        // Add a water hazard
        this.createWaterPool(100, 550);
        this.createWaterPool(650, 550);
        
        // Add trampolines
        this.createTrampoline(700, 550);
        
        // Add moving platforms
        this.createMovingPlatform(250, 250, 150, 350);
        this.createMovingPlatform(550, 400, 450, 650);
    }
    
    createEnemies() {
        // Add patrolling pigs
        this.createEnemy(300, 350, 'pig', 250, 400);
        
        // Add cows that charge
        this.createEnemy(500, 250, 'cow', 400, 600);
        
        // Add jumping sheep
        this.createEnemy(150, 250, 'sheep', 100, 200);
        
        // Add climbing goat
        this.createEnemy(650, 250, 'goat', 600, 700);
    }
    
    createCollectibles() {
        // Add corn collectibles in harder-to-reach places
        this.createCollectible(150, 400);
        this.createCollectible(300, 350);
        this.createCollectible(450, 300);
        this.createCollectible(600, 250);
        this.createCollectible(450, 150);
        this.createCollectible(300, 100);
        this.createCollectible(700, 100);
        this.createCollectible(150, 250);
        this.createCollectible(550, 400);
    }
    
    createPowerups() {
        // Add egg power
        this.createPowerup(450, 150, 'egg');
        
        // Add speed power
        this.createPowerup(150, 250, 'speed');
        
        // Add invincibility (more useful in this harder level)
        this.createPowerup(600, 250, 'invincibility');
    }
}