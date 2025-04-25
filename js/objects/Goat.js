// js/objects/Goat.js
class Goat extends Enemy {
    constructor(scene, x, y, leftLimit, rightLimit) {
        super(scene, x, y, '0xD3D3D3_32x32', leftLimit, rightLimit, 110);
        this.enemyType = 'goat';
        this.scoreValue = 40;
        
        // Climbing state
        this.isClimbing = false;
    }
    
    update() {
        // Wall climbing behavior
        if (this.body.blocked.right || this.body.blocked.left) {
            // Hit a wall, start climbing
            if (!this.isClimbing) {
                this.isClimbing = true;
                this.setVelocityY(-100); // Move up
                this.body.allowGravity = false;
            }
        } else if (this.isClimbing && !this.body.blocked.up) {
            // Continue climbing upward
            this.setVelocityY(-100);
        } else if (this.isClimbing && this.body.blocked.up) {
            // Reached top, move horizontally again
            this.isClimbing = false;
            this.body.allowGravity = true;
            this.setVelocityY(0);
            this.setVelocityX(this.body.velocity.x * -1); // Reverse direction
        } else if (!this.isClimbing) {
            // Standard horizontal movement
            super.update();
        }
    }
}