// js/objects/Sheep.js
class Sheep extends Enemy {
    constructor(scene, x, y, leftLimit, rightLimit) {
        super(scene, x, y, '0xF5F5DC_32x32', leftLimit, rightLimit, 120);
        this.enemyType = 'sheep';
        this.scoreValue = 30;
        
        // Jump counter
        this.jumpTimer = 0;
    }
    
    update() {
        // Random jumping behavior
        if (this.body.touching.down) {
            // Increment jump timer
            this.jumpTimer++;
            
            // Randomly jump (about every 2-3 seconds if update is called 60 times per second)
            if (this.jumpTimer > 120 && Phaser.Math.Between(0, 100) < 5) {
                this.setVelocityY(-300);
                this.jumpTimer = 0;
            }
        }
        
        // Default patrol behavior
        super.update();
    }
}