// js/objects/Pig.js
class Pig extends Enemy {
    constructor(scene, x, y, leftLimit, rightLimit) {
        super(scene, x, y, '0xFFC0CB_32x32', leftLimit, rightLimit, 100);
        this.enemyType = 'pig';
        this.scoreValue = 20;
    }
    
    // Pigs just use the basic enemy behavior
}