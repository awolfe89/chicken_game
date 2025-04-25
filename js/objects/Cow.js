// js/objects/Cow.js
class Cow extends Enemy {
    constructor(scene, x, y, leftLimit, rightLimit) {
        super(scene, x, y, '0x8B0000_64x64', leftLimit, rightLimit, 50);
        this.enemyType = 'cow';
        this.scoreValue = 50;
        this.setSize(50, 60); // Adjust hitbox
    }
    
    update() {
        // Reference to player for charging behavior
        const player = this.scene.player;
        
        // Charging behavior
        if (player) {
            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.x, this.y, player.x, player.y
            );
            
            if (distanceToPlayer < 200 && Math.abs(this.y - player.y) < 50) {
                // Player is in charging range
                const direction = (player.x < this.x) ? -1 : 1;
                this.setVelocityX(direction * 200); // Charge speed
                
                // Visual indicator of charging
                this.setTint(0xff6666);
                return;
            } else {
                // Not charging, clear tint
                this.clearTint();
            }
        }
        
        // Default patrol behavior
        super.update();
    }
}