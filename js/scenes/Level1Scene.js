// js/scenes/Level1Scene.js
class Level1Scene extends BaseLevelScene {
    constructor() {
        super('Level1Scene');
    }
    
    create() {
        this.init();
        
        console.log("Level1Scene: Starting creation");
        
        // Reset collectible counter for this level
        GAME_DATA.collectibles = 0;
        GAME_DATA.totalCollectibles = 0;
        
        // Create game environment
        this.createGroups();
        
        // Create terrain
        console.log("Creating terrain...");
        this.createTerrain();
        
        // Set player spawn point
        this.spawnPoint = { x: 100, y: 450 };
        this.player = this.createPlayer(this.spawnPoint.x, this.spawnPoint.y);
        console.log("Player created at:", this.player.x, this.player.y);
        
        // Add enemies
        this.createEnemies();
        
        // Add collectibles and powerups
        this.createCollectibles();
        this.createPowerups();
        
        // Add goal
        this.createLevelGoal(3000, 500, 'coop');
        
        // Set up collisions
        this.setupCollisions();
        
        // Create UI
        this.createUI();
        
        // Set up input
        this.setupInput();
        
        // Set up camera
        this.setupCamera();
        console.log("Camera position:", this.cameras.main.scrollX, this.cameras.main.scrollY);
        
        console.log("Level1Scene: Creation complete");
    }
    
    createTerrain() {
        console.log("Creating terrain...");
        
        // Ground level segments with gaps and height variations
        // Base ground
        for (let x = 0; x < 3200; x += 64) {
            // Create some gaps
            if (x > 800 && x < 900) continue; // First gap
            if (x > 1500 && x < 1600) continue; // Second gap
            if (x > 2300 && x < 2450) continue; // Third gap
            
            // Create height variations (hills and valleys)
            let y = 568;
            
            // Small hill
            if (x > 400 && x < 700) {
                y = 550 - Math.sin((x - 400) / 300 * Math.PI) * 30;
            }
            
            // Medium valley
            if (x > 1000 && x < 1300) {
                y = 568 + Math.sin((x - 1000) / 300 * Math.PI) * 20;
            }
            
            // Large hill
            if (x > 1700 && x < 2200) {
                y = 530 - Math.sin((x - 1700) / 500 * Math.PI) * 50;
            }
            
            // Create the ground segment
            this.platforms.create(x, y, 'ground');
            
            // Log every 10th platform to avoid flooding console
            if (x % 640 === 0) {
                console.log("Created ground at", x, y);
            }
        }
        
        // Add some floating platforms
        console.log("Creating platforms...");
        // Level 1: Easier platforms with generous spacing
        this.platforms.create(350, 450, 'grass');
        this.platforms.create(450, 450, 'grass');
        
        this.platforms.create(750, 400, 'grass');
        this.platforms.create(950, 380, 'grass');
        
        this.platforms.create(1200, 420, 'grass');
        this.platforms.create(1350, 390, 'grass');
        
        this.platforms.create(1700, 350, 'grass');
        this.platforms.create(1850, 330, 'grass');
        this.platforms.create(2000, 350, 'grass');
        
        this.platforms.create(2300, 450, 'grass');
        this.platforms.create(2500, 420, 'grass');
        this.platforms.create(2650, 380, 'grass');
        this.platforms.create(2800, 350, 'grass');
        console.log("Platforms created successfully");
        
        // Add hazards at strategic locations
        console.log("Creating hazards...");
        // Water hazards in the gaps
        this.createWaterPool(850, 568);
        this.createWaterPool(1550, 568);
        this.createWaterPool(2375, 568);
        
        // Mud patches before jumps
        this.createMudPatch(300, 568);
        this.createMudPatch(700, 568);
        this.createMudPatch(1400, 568);
        this.createMudPatch(2250, 568);
        
        // Add a few trampolines to help with vertical jumps
        this.createTrampoline(1100, 568);
        this.createTrampoline(2000, 500);
        
        // Add moving platforms in challenging sections
        this.createMovingPlatform(1500, 320, 1450, 1600);
        this.createMovingPlatform(2200, 400, 2100, 2300);
        console.log("Hazards created successfully");
    }
    
    createEnemies() {
        console.log("Creating enemies...");
        // Add enemies along the path
        this.createEnemy(400, 500, 'pig', 350, 600);
        this.createEnemy(900, 350, 'pig', 750, 1000);
        this.createEnemy(1300, 500, 'sheep', 1200, 1400);
        this.createEnemy(1800, 300, 'sheep', 1700, 2000);
        this.createEnemy(2400, 500, 'pig', 2300, 2500);
        this.createEnemy(2700, 300, 'goat', 2650, 2800);
        console.log("Enemies created successfully");
    }
    
    createCollectibles() {
        console.log("Creating collectibles...");
        // Place collectibles along the path
        // Some easy to get, others requiring skill
        this.createCollectible(300, 500);
        this.createCollectible(500, 400);
        this.createCollectible(800, 350);
        this.createCollectible(1000, 330);
        this.createCollectible(1200, 370);
        this.createCollectible(1500, 270);
        this.createCollectible(1700, 300);
        this.createCollectible(1900, 280);
        this.createCollectible(2100, 320);
        this.createCollectible(2400, 400);
        this.createCollectible(2600, 370);
        this.createCollectible(2800, 300);
        console.log("Collectibles created successfully");
    }
    
    createPowerups() {
        console.log("Creating powerups...");
        // Add powerups at strategic locations
        this.createPowerup(700, 350, 'egg');
        this.createPowerup(1600, 300, 'speed');
        this.createPowerup(2200, 350, 'jump');
        this.createPowerup(2700, 250, 'invincibility');
        console.log("Powerups created successfully");
    }
}