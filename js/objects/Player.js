// js/objects/Player.js
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, '0xFFFFE0_32x32');
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Physics properties
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        
        // Player state
        this.isInvulnerable = false;
        
        // Create animations
        this.createAnimations();
    }
    
    createAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: [{ key: '0xFFFFE0_32x32' }],
            frameRate: 10,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: '0xFFFFE0_32x32' }],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'right',
            frames: [{ key: '0xFFFFE0_32x32' }],
            frameRate: 10,
            repeat: -1
        });
    }
    
    // Movement methods
    moveLeft(speed) {
        this.setVelocityX(-speed);
        this.anims.play('left', true);
    }
    
    moveRight(speed) {
        this.setVelocityX(speed);
        this.anims.play('right', true);
    }
    
    stop() {
        this.setVelocityX(0);
        this.anims.play('turn');
    }
    
    jump(force) {
        if (this.body.touching.down) {
            this.setVelocityY(-force);
        }
    }
    
    damage() {
        if (!this.isInvulnerable && !GAME_DATA.hasInvincibility) {
            GAME_DATA.lives--;
            this.setTint(0xff0000);
            
            // Make invulnerable temporarily
            this.isInvulnerable = true;
            
            // Remove tint after a short delay
            this.scene.time.delayedCall(100, () => {
                this.clearTint();
            });
            
            // End invulnerability after a longer delay
            this.scene.time.delayedCall(2000, () => {
                this.isInvulnerable = false;
            });
            
            return true; // Damage was applied
        }
        
        return false; // No damage was applied
    }
}