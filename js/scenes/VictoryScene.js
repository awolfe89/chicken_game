// js/scenes/VictoryScene.js
class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }
    
    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#4488aa');
        
        // Victory message
        this.add.text(400, 150, 'VICTORY!', { 
            fontSize: '64px', 
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);
        
        // Congratulatory message
        this.add.text(400, 220, 'Chicken Farm Hero!', { 
            fontSize: '36px', 
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);
        
        // Score display
        this.add.text(400, 280, 'Final Score: ' + GAME_DATA.score, { 
            fontSize: '32px', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Create play again button
        const playAgainButton = this.add.text(400, 380, 'Play Again', { 
            fontSize: '36px', 
            fill: '#ffffff',
            backgroundColor: '#225588',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        // Create main menu button
        const menuButton = this.add.text(400, 450, 'Main Menu', { 
            fontSize: '36px', 
            fill: '#ffffff',
            backgroundColor: '#225588',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        
        // Button hover effects
        playAgainButton.on('pointerover', function() {
            this.setStyle({ fill: '#ffff00' });
        });
        
        playAgainButton.on('pointerout', function() {
            this.setStyle({ fill: '#ffffff' });
        });
        
        menuButton.on('pointerover', function() {
            this.setStyle({ fill: '#ffff00' });
        });
        
        menuButton.on('pointerout', function() {
            this.setStyle({ fill: '#ffffff' });
        });
        
        // Button click handlers
        playAgainButton.on('pointerdown', () => {
            // Reset game data
            GAME_DATA.lives = 3;
            GAME_DATA.score = 0;
            GAME_DATA.currentLevel = 1;
            
            // Start from level 1
            this.scene.start('Level1Scene');
        });
        
        menuButton.on('pointerdown', () => {
            // Go back to level select
            this.scene.start('LevelSelectScene');
        });
        
        // Animated victory elements
        // Create stars for celebration effect
        for (let i = 0; i < 20; i++) {
            const star = this.add.image(
                Phaser.Math.Between(50, 750),
                Phaser.Math.Between(50, 550),
                'star'
            );
            
            // Add twinkling animation
            this.tweens.add({
                targets: star,
                alpha: 0.2,
                scale: 0.8,
                duration: 500 + Math.random() * 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1000
            });
        }
    }
}