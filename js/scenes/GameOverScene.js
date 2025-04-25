// js/scenes/GameOverScene.js
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    
    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#880000');
        
        // Game over message
        this.add.text(400, 200, 'GAME OVER', { 
            fontSize: '64px', 
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);
        
        // Score display
        this.add.text(400, 300, 'Your Score: ' + GAME_DATA.score, { 
            fontSize: '32px', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Create try again button
        const tryAgainButton = this.add.text(400, 400, 'Try Again', { 
            fontSize: '36px', 
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        // Create main menu button
        const menuButton = this.add.text(400, 470, 'Main Menu', { 
            fontSize: '36px', 
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        // Button hover effects
        tryAgainButton.on('pointerover', function() {
            this.setStyle({ fill: '#ffff00' });
        });
        
        tryAgainButton.on('pointerout', function() {
            this.setStyle({ fill: '#ffffff' });
        });
        
        menuButton.on('pointerover', function() {
            this.setStyle({ fill: '#ffff00' });
        });
        
        menuButton.on('pointerout', function() {
            this.setStyle({ fill: '#ffffff' });
        });
        
        // Button click handlers
        tryAgainButton.on('pointerdown', () => {
            // Reset game data
            GAME_DATA.lives = 3;
            GAME_DATA.score = 0;
            
            // Start at the current level again
            this.scene.start('Level' + GAME_DATA.currentLevel + 'Scene');
        });
        
        menuButton.on('pointerdown', () => {
            // Go back to level select
            this.scene.start('LevelSelectScene');
        });
    }
}