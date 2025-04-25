// js/objects/Collectible.js
class Collectible extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, '0xFFD700_24x24');
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Physics properties
        this.setBounce(0.3);
        this.body.allowGravity = false;
        
        // Animation - bobbing up and down
        scene.tweens.add({
            targets: this,
            y: y - 5,
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Track in the global game data
        GAME_DATA.totalCollectibles++;
    }
    
    collect() {
        // Increment score and collectible count
        GAME_DATA.score += 5;
        GAME_DATA.collectibles++;
        
        // Visual effect
        this.scene.tweens.add({
            targets: this,
            y: this.y - 30,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.disableBody(true, true);
            }
        });
    }
}