// js/scenes/BootScene.js
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        // Load progress bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        // Loading event handlers
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', { 
            frameWidth: 32, 
            frameHeight: 32 
        });
        this.load.image('farmBg', 'assets/images/farm_background_1.png');
    }
    
    create() {
        console.log("BootScene: Creating textures...");
        
        // Create backgrounds
        this.createTexture(800, 600, 0x87CEEB, "skyBg");
        this.createTexture(800, 600, 0x4CAF50, "farmBg"); // More natural green
        this.createTexture(800, 600, 0xCD853F, "barnBg");
        
        // Create terrain
        this.createTexture(400, 32, 0x8B4513, "ground");
        this.createTexture(64, 32, 0x32CD32, "grass");
        this.createTexture(64, 32, 0x8B4513, "dirt");
        this.createTexture(64, 32, 0xA0522D, "fence");
        this.createTexture(64, 64, 0xFFD700, "hayBale");
        this.createTexture(64, 32, 0xD2691E, "wood");
        this.createTexture(64, 32, 0x6B8E23, "mud");
        this.createTexture(64, 32, 0x4169E1, "water");
        this.createTexture(128, 32, 0xDAA520, "movingPlatform");
        this.createTexture(64, 32, 0xFF6347, "trampoline");
        
        // Create items
        this.createTexture(16, 16, 0xFFFFFF, "egg");
        this.createTexture(24, 24, 0xFFD700, "corn");
        this.createTexture(32, 32, 0xFFFFFF, "eggPowerup");
        this.createTexture(32, 32, 0x00FF00, "speedPowerup");
        this.createTexture(32, 32, 0x00FFFF, "jumpPowerup");
        this.createTexture(32, 32, 0xFF00FF, "invincibilityPowerup");
        
        // Create objects
        this.createTexture(96, 96, 0xA52A2A, "coop");
        this.createTexture(128, 128, 0xA52A2A, "barn");
        
        // Create characters
        this.createTexture(32, 32, 0xFFFFE0, "chicken");
        this.createTexture(32, 32, 0xFFC0CB, "pig");
        this.createTexture(64, 64, 0x8B0000, "cow");
        this.createTexture(32, 32, 0xF5F5DC, "sheep");
        this.createTexture(32, 32, 0xD3D3D3, "goat");
        
        // Create UI
        this.createTexture(96, 32, 0x4682B4, "button");
        this.createTexture(64, 64, 0x4682B4, "levelButton");
        this.createTexture(64, 64, 0x708090, "lockedLevel");
        this.createTexture(32, 32, 0xFFD700, "star");
        
        console.log("BootScene: All textures created successfully");
        
        // Start with the level select scene
        this.scene.start('LevelSelectScene');
    }
    
    createTexture(width, height, color, key) {
        const graphics = this.add.graphics();
        graphics.fillStyle(color);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture(key, width, height);
        graphics.clear();
        console.log(`Created texture: ${key}`);
        console.log(`Verified texture exists: ${key}`, this.textures.exists(key));
    }
}