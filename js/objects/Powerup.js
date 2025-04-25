// js/objects/Powerup.js
class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        // Determine texture based on powerup type
        let texture;
        switch (type) {
            case 'egg':
                texture = '0xFFFFFF_32x32';
                break;
            case 'speed':
                texture = '0x00FF00_32x32';
                break;
            case 'jump':
                texture = '0x00FFFF_32x32';
                break;
            case 'invincibility':
                texture = '0xFF00FF_32x32';
                break;
            default:
                texture = '0xFFFFFF_32x32';
                type = 'egg';
                break;
        }
        
        super(scene, x, y, texture);
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Store powerup type
        this.powerupType = type;
        
        // Physics properties
        this.setBounce(0.6);
        this.body.allowGravity = false;
        
        // Add floating animation
        scene.tweens.add({
            targets: this,
            y: y - 10,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add glowing effect
        scene.tweens.add({
            targets: this,
            alpha: 0.7,
            duration: 600,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    collect(player) {
        // Visual effect
        player.setTint(this.getTintForType());
        
        // Set the appropriate powerup flag
        switch (this.powerupType) {
            case 'egg':
                GAME_DATA.hasEggPower = true;
                break;
            case 'speed':
                GAME_DATA.hasSpeedBoost = true;
                break;
            case 'jump':
                GAME_DATA.hasJumpBoost = true;
                break;
            case 'invincibility':
                GAME_DATA.hasInvincibility = true;
                break;
        }
        
        // Start powerup timer
        this.scene.time.delayedCall(GAME_DATA.powerupDuration, () => {
            // Disable powerup after duration expires
            switch (this.powerupType) {
                case 'egg':
                    GAME_DATA.hasEggPower = false;
                    break;
                case 'speed':
                    GAME_DATA.hasSpeedBoost = false;
                    break;
                case 'jump':
                    GAME_DATA.hasJumpBoost = false;
                    break;
                case 'invincibility':
                    GAME_DATA.hasInvincibility = false;
                    player.clearTint();
                    break;
            }
        });
        
        // Clear visual effect after a short time (unless invincibility)
        if (this.powerupType !== 'invincibility') {
            this.scene.time.delayedCall(300, () => {
                player.clearTint();
            });
        }
        
        // Disable this powerup
        this.disableBody(true, true);
    }
    
    getTintForType() {
        switch (this.powerupType) {
            case 'egg':
                return 0xffff00; // Yellow
            case 'speed':
                return 0x00ff00; // Green
            case 'jump':
                return 0x00ffff; // Cyan
            case 'invincibility':
                return 0xff00ff; // Magenta
            default:
                return 0xffffff; // White
        }
    }
}