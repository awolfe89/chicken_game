// js/objects/Enemy.js
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, leftLimit, rightLimit, velocity = 100) {
        super(scene, x, y, texture);
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Physics properties
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        
        // Movement properties
        this.leftLimit = leftLimit;
        this.rightLimit = rightLimit;
        this.setVelocityX(velocity);
        
        // Type
        this.enemyType = 'generic';
    }
    
    update() {
        // Basic patrolling behavior
        if (this.body.velocity.x > 0 && this.x >= this.rightLimit) {
            this.body.velocity.x *= -1;
            this.flipX = true;
        } else if (this.body.velocity.x < 0 && this.x <= this.leftLimit) {
            this.body.velocity.x *= -1;
            this.flipX = false;
        }
    }
    
    die() {
        // Visual effects
        this.setTint(0xff0000);
        
        // Death animation
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            y: this.y - 30,
            duration: 800,
            onComplete: () => {
                this.disableBody(true, true);
            }
        });
    }
}