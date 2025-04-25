// js/scenes/LevelSelectScene.js
class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }
    
    create() {
        // Add background
        this.add.image(400, 300, 'farmBg');
        
        // Title
        this.add.text(400, 100, 'FARM CHICKEN ADVENTURE', { 
            fontSize: '36px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Level selection text
        this.add.text(400, 160, 'Select Level', { 
            fontSize: '28px', 
            fill: '#000' 
        }).setOrigin(0.5);
        
        // Create level buttons
        const levelCount = 3;
        const spacing = 120;
        const startX = 400 - ((levelCount - 1) * spacing) / 2;
        
        for (let i = 1; i <= levelCount; i++) {
            const x = startX + (i - 1) * spacing;
            const y = 300;
            
            // Use locked or unlocked button based on progress
            const buttonImage = (i <= GAME_DATA.maxUnlockedLevel) ? 'levelButton' : 'lockedLevel';
            const button = this.add.image(x, y, buttonImage).setInteractive();
            
            // Add level number
            this.add.text(x, y, i.toString(), { 
                fontSize: '32px', 
                fill: '#fff',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Only allow clicking on unlocked levels
            if (i <= GAME_DATA.maxUnlockedLevel) {
                button.on('pointerdown', () => {
                    GAME_DATA.currentLevel = i;
                    this.scene.start('Level' + i + 'Scene');
                });
                
                // Hover effect
                button.on('pointerover', () => {
                    button.setTint(0xffff00);
                });
                
                button.on('pointerout', () => {
                    button.clearTint();
                });
            }
            
            // Add level descriptions
            let description = '';
            switch(i) {
                case 1: 
                    description = 'Farm Fields - Beginner'; 
                    break;
                case 2: 
                    description = 'Barn Yard - Intermediate'; 
                    break;
                case 3: 
                    description = 'Farm Danger - Advanced'; 
                    break;
                default: 
                    description = 'Level ' + i;
            }
            
            this.add.text(x, y + 50, description, { 
                fontSize: '16px', 
                fill: '#000' 
            }).setOrigin(0.5);
        }
        
        // Instructions
        this.add.text(400, 450, 'Controls: Arrow Keys to move, SPACE to shoot eggs', { 
            fontSize: '18px', 
            fill: '#000' 
        }).setOrigin(0.5);
        
        this.add.text(400, 480, 'Collect power-ups and reach the chicken coop!', { 
            fontSize: '18px', 
            fill: '#000' 
        }).setOrigin(0.5);
        
        // Score display
        this.add.text(400, 520, 'Total Score: ' + GAME_DATA.score, { 
            fontSize: '24px', 
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }
}