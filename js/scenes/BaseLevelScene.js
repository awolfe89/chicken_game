// js/scenes/BaseLevelScene.js
class BaseLevelScene extends Phaser.Scene {
    constructor(key) {
        super({ key: key });
    }
    
    init() {
        // Initialize level specific variables
        this.gameOver = false;
        this.victory = false;
        this.powerupTimers = [];
        this.lastEggFired = 0;
        this.eggFireRate = 500; // time in ms
        
        // Set physics values for better gameplay
        GAME_DATA.playerSpeed = 160;
        GAME_DATA.jumpForce = 250; // Reduced from 330
        GAME_DATA.gravity = 600;   // New property for gravity
        
        // Apply gravity to the world
        this.physics.world.gravity.y = GAME_DATA.gravity;
        
        // Reset level-specific powerups
        GAME_DATA.hasEggPower = false;
        GAME_DATA.hasSpeedBoost = false;
        GAME_DATA.hasJumpBoost = false;
        GAME_DATA.hasInvincibility = false;
        
        console.log("BaseLevelScene initialized");
    }
    
    createBackground() {
        // Default background - will be overridden by setupCamera
        console.log("Creating default background");
        return this.add.image(400, 300, 'skyBg');
    }
    
    createPlayer(x, y) {
        console.log("Creating player at", x, y);
        this.player = this.physics.add.sprite(x, y, 'chicken');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        // Adjust player hitbox if needed
        this.player.setSize(24, 28);
        this.player.setOffset(4, 4);
        
        // Create animations from your sprite sheet
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'chicken', frame: 4 }],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('chicken', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'chicken', frame: 9 }],
            frameRate: 10
        });
        
        console.log("Player animations created");
        return this.player;
    }
    
    createGroups() {
        console.log("Creating game object groups");
        // Create various game object groups
        this.platforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
        this.trampolines = this.physics.add.group({ allowGravity: false, immovable: true });
        this.hazards = this.physics.add.group();
        this.mudPatches = this.physics.add.staticGroup();
        this.waterPools = this.physics.add.staticGroup();
        
        // Enemies
        this.enemies = this.physics.add.group();
        this.pigs = this.physics.add.group();
        this.cows = this.physics.add.group();
        this.sheep = this.physics.add.group();
        this.goats = this.physics.add.group();
        
        // Collectibles and powerups
        this.collectibles = this.physics.add.group();
        this.powerups = {
            egg: this.physics.add.group(),
            speed: this.physics.add.group(),
            jump: this.physics.add.group(),
            invincibility: this.physics.add.group()
        };
        
        // Projectiles
        this.eggs = this.physics.add.group();
        
        // Goal object
        this.goal = this.physics.add.staticGroup();
    }
    
    setupCollisions() {
        console.log("Setting up collision handlers");
        // Player collisions with environment
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);
        
        // Enemy collisions
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.pigs, this.platforms);
        this.physics.add.collider(this.cows, this.platforms);
        this.physics.add.collider(this.sheep, this.platforms);
        this.physics.add.collider(this.goats, this.platforms);
        
        // Projectile collisions
        this.physics.add.collider(this.eggs, this.platforms, this.destroyEgg, null, this);
        
        // Enemy hit detection
        this.physics.add.collider(this.eggs, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.eggs, this.pigs, this.hitEnemy, null, this);
        this.physics.add.collider(this.eggs, this.cows, this.hitEnemy, null, this);
        this.physics.add.collider(this.eggs, this.sheep, this.hitEnemy, null, this);
        this.physics.add.collider(this.eggs, this.goats, this.hitEnemy, null, this);
        
        // Collectible collisions
        this.physics.add.collider(this.collectibles, this.platforms);
        
        // Powerup collisions
        Object.values(this.powerups).forEach(group => {
            this.physics.add.collider(group, this.platforms);
        });
        
        // Special features collisions
        this.physics.add.collider(this.trampolines, this.platforms);
        
        // Overlap handlers
        this.physics.add.overlap(this.player, this.collectibles, this.collectCorn, null, this);
        this.physics.add.overlap(this.player, this.powerups.egg, this.collectEggPowerup, null, this);
        this.physics.add.overlap(this.player, this.powerups.speed, this.collectSpeedPowerup, null, this);
        this.physics.add.overlap(this.player, this.powerups.jump, this.collectJumpPowerup, null, this);
        this.physics.add.overlap(this.player, this.powerups.invincibility, this.collectInvincibilityPowerup, null, this);
        this.physics.add.overlap(this.player, this.trampolines, this.bouncePlayer, null, this);
        this.physics.add.overlap(this.player, this.mudPatches, this.slowInMud, null, this);
        this.physics.add.overlap(this.player, this.waterPools, this.fallInWater, null, this);
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
        
        // Enemy collision with player
        this.physics.add.overlap(this.player, this.enemies, this.hitByEnemy, null, this);
        this.physics.add.overlap(this.player, this.pigs, this.hitByEnemy, null, this);
        this.physics.add.overlap(this.player, this.cows, this.hitByEnemy, null, this);
        this.physics.add.overlap(this.player, this.sheep, this.hitByEnemy, null, this);
        this.physics.add.overlap(this.player, this.goats, this.hitByEnemy, null, this);
        this.physics.add.overlap(this.player, this.hazards, this.hitByHazard, null, this);
    }
    
    createUI() {
        console.log("Creating game UI");
        // Display score, lives, and level
        this.scoreText = this.add.text(16, 16, 'Score: ' + GAME_DATA.score, { 
            fontSize: '24px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        
        this.livesText = this.add.text(16, 50, 'Lives: ' + GAME_DATA.lives, { 
            fontSize: '24px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        
        this.levelText = this.add.text(16, 84, 'Level: ' + GAME_DATA.currentLevel, { 
            fontSize: '24px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        
        this.collectibleCounter = this.add.text(16, 118, 'Corn: 0/' + GAME_DATA.totalCollectibles, { 
            fontSize: '24px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        
        // Powerup status indicators
        this.powerupStatus = this.add.text(500, 16, 'Powerups:', { 
            fontSize: '20px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 3
        });
        
        this.eggPowerText = this.add.text(500, 46, 'Egg Power: OFF', { 
            fontSize: '16px', 
            fill: '#ccc',
            stroke: '#000',
            strokeThickness: 2
        });
        
        this.speedPowerText = this.add.text(500, 70, 'Speed Boost: OFF', { 
            fontSize: '16px', 
            fill: '#ccc',
            stroke: '#000',
            strokeThickness: 2
        });
        
        this.jumpPowerText = this.add.text(500, 94, 'Super Jump: OFF', { 
            fontSize: '16px', 
            fill: '#ccc',
            stroke: '#000',
            strokeThickness: 2
        });
        
        this.invincibilityText = this.add.text(500, 118, 'Invincible: OFF', { 
            fontSize: '16px', 
            fill: '#ccc',
            stroke: '#000',
            strokeThickness: 2
        });
        
        // Make UI elements fixed to camera
        this.scoreText.setScrollFactor(0);
        this.livesText.setScrollFactor(0);
        this.levelText.setScrollFactor(0);
        this.collectibleCounter.setScrollFactor(0);
        this.powerupStatus.setScrollFactor(0);
        this.eggPowerText.setScrollFactor(0);
        this.speedPowerText.setScrollFactor(0);
        this.jumpPowerText.setScrollFactor(0);
        this.invincibilityText.setScrollFactor(0);
        
        // Menu button
        this.menuButton = this.add.text(700, 16, 'Menu', { 
            fontSize: '20px', 
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 10, y: 5 }
        }).setInteractive().setScrollFactor(0);
        
        this.menuButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
    }
    
    setupInput() {
        console.log("Setting up input controls");
        // Keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    setupCamera() {
        console.log("Setting up camera");
        // Set world bounds to be wider than the screen
        this.physics.world.setBounds(0, 0, 3200, 600);
        
        // Make camera follow the player
        this.cameras.main.setBounds(0, 0, 3200, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        
        // Add a background that scrolls slower (parallax effect)
        if (this.textures.exists('farmBg')) {
            console.log("Using farmBg for background");
            this.bg = this.add.tileSprite(0, 0, 3200, 600, 'farmBg')
                .setOrigin(0, 0)
                .setScrollFactor(0);
        } else {
            console.log("WARNING: farmBg texture not found, using fallback color");
            this.bg = this.add.rectangle(0, 0, 3200, 600, 0x87ceeb)
                .setOrigin(0, 0)
                .setScrollFactor(0);
        }
    }
    
    // Shared update logic
    update() {
        if (this.gameOver || this.victory) {
            return;
        }
        
        this.handlePlayerMovement();
        this.handleEnemyMovement();
        this.handleSpecialPlatforms();
        this.updateUI();
        
        // Update parallax background if it exists
        if (this.bg && this.bg.tilePositionX !== undefined) {
            this.bg.tilePositionX = this.cameras.main.scrollX * 0.2;
        }
    }
    
    handlePlayerMovement() {
        // Calculate current speed based on powerups
        const currentSpeed = GAME_DATA.hasSpeedBoost ? GAME_DATA.playerSpeed * 1.5 : GAME_DATA.playerSpeed;
        const currentJump = GAME_DATA.hasJumpBoost ? GAME_DATA.jumpForce * 1.3 : GAME_DATA.jumpForce;
        
        // Check if player is in mud (only apply slowdown if not speed boosted)
        let inMud = false;
        this.mudPatches.getChildren().forEach(mud => {
            if (Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), mud.getBounds())) {
                inMud = true;
            }
        });
        
        // Calculate final speed with mud effect
        let finalSpeed = currentSpeed;
        if (inMud && !GAME_DATA.hasSpeedBoost) {
            finalSpeed = currentSpeed * 0.5; // 50% slowdown in mud
        }
        
        // Movement logic
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-finalSpeed);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(finalSpeed);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        // Jump logic - only if touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-currentJump);
            // Play jump animation if available
            if (this.anims.exists('jump')) {
                this.player.anims.play('jump');
            }
        }
        
        // Egg shooting
        if (this.spaceBar.isDown && GAME_DATA.hasEggPower && (this.time.now > this.lastEggFired)) {
            this.shootEgg();
            this.lastEggFired = this.time.now + this.eggFireRate;
        }
    }
    
    handleEnemyMovement() {
        // General enemy movement
        this.enemies.getChildren().forEach(this.updateEnemyMovement, this);
        
        // Type-specific enemy behaviors
        this.pigs.getChildren().forEach(this.updatePigMovement, this);
        this.cows.getChildren().forEach(this.updateCowMovement, this);
        this.sheep.getChildren().forEach(this.updateSheepMovement, this);
        this.goats.getChildren().forEach(this.updateGoatMovement, this);
    }
    
    updateEnemyMovement(enemy) {
        // Basic patrolling behavior
        if (enemy.body.velocity.x > 0 && enemy.x >= enemy.rightLimit) {
            enemy.body.velocity.x *= -1;
            enemy.flipX = true;
        } else if (enemy.body.velocity.x < 0 && enemy.x <= enemy.leftLimit) {
            enemy.body.velocity.x *= -1;
            enemy.flipX = false;
        }
    }
    
    updatePigMovement(pig) {
        // Pigs have basic patrol movement (already handled in updateEnemyMovement)
        this.updateEnemyMovement(pig);
    }
    
    updateCowMovement(cow) {
        // Cows charge at player when in range
        const distanceToPlayer = Phaser.Math.Distance.Between(cow.x, cow.y, this.player.x, this.player.y);
        
        if (distanceToPlayer < 200 && Math.abs(cow.y - this.player.y) < 50) {
            // Player is in charging range
            const direction = (this.player.x < cow.x) ? -1 : 1;
            cow.setVelocityX(direction * 200); // Charge speed
            
            // Visual indicator of charging
            cow.setTint(0xff6666);
        } else {
            // Return to normal patrol behavior
            cow.clearTint();
            this.updateEnemyMovement(cow);
        }
    }
    
    updateSheepMovement(sheep) {
        // Sheep randomly jump
        if (sheep.body.touching.down && Phaser.Math.Between(0, 100) < 2) {
            sheep.setVelocityY(-300); // Random jump
        }
        
        // Continue with standard movement
        this.updateEnemyMovement(sheep);
    }
    
    updateGoatMovement(goat) {
        // Goats can climb walls and move vertically
        if (goat.body.blocked.right || goat.body.blocked.left) {
            // Hit a wall, start climbing
            if (!goat.isClimbing) {
                goat.isClimbing = true;
                goat.setVelocityY(-100); // Move up
                goat.body.allowGravity = false;
            }
        } else if (goat.isClimbing && !goat.body.blocked.up) {
            // Continue climbing upward
            goat.setVelocityY(-100);
        } else if (goat.isClimbing && goat.body.blocked.up) {
            // Reached top, move horizontally again
            goat.isClimbing = false;
            goat.body.allowGravity = true;
            goat.setVelocityY(0);
            goat.setVelocityX(goat.body.velocity.x * -1); // Reverse direction
        } else {
            // Standard horizontal movement
            this.updateEnemyMovement(goat);
        }
    }
    
    handleSpecialPlatforms() {
        // Update moving platforms
        this.movingPlatforms.getChildren().forEach(platform => {
            // Move back and forth between limits
            if (platform.x >= platform.rightLimit) {
                platform.setVelocityX(-50);
            } else if (platform.x <= platform.leftLimit) {
                platform.setVelocityX(50);
            }
            
            // Carry the player with the platform
            if (this.player.body.touching.down && 
                this.player.body.bottom <= platform.body.top + 5 &&
                this.player.body.position.x >= platform.body.position.x - platform.body.width/2 &&
                this.player.body.position.x <= platform.body.position.x + platform.body.width/2) {
                
                this.player.x += platform.body.velocity.x / 10;
            }
        });
    }
    
    updateUI() {
        // Update UI elements based on game state
        this.scoreText.setText('Score: ' + GAME_DATA.score);
        this.livesText.setText('Lives: ' + GAME_DATA.lives);
        this.collectibleCounter.setText('Corn: ' + GAME_DATA.collectibles + '/' + GAME_DATA.totalCollectibles);
        
        // Update powerup status
        this.eggPowerText.setText('Egg Power: ' + (GAME_DATA.hasEggPower ? 'ON' : 'OFF'));
        this.eggPowerText.setFill(GAME_DATA.hasEggPower ? '#ffff00' : '#ccc');
        
        this.speedPowerText.setText('Speed Boost: ' + (GAME_DATA.hasSpeedBoost ? 'ON' : 'OFF'));
        this.speedPowerText.setFill(GAME_DATA.hasSpeedBoost ? '#00ff00' : '#ccc');
        
        this.jumpPowerText.setText('Super Jump: ' + (GAME_DATA.hasJumpBoost ? 'ON' : 'OFF'));
        this.jumpPowerText.setFill(GAME_DATA.hasJumpBoost ? '#00ffff' : '#ccc');
        
        this.invincibilityText.setText('Invincible: ' + (GAME_DATA.hasInvincibility ? 'ON' : 'OFF'));
        this.invincibilityText.setFill(GAME_DATA.hasInvincibility ? '#ff00ff' : '#ccc');
        
        // Animate the player if invincible
        if (GAME_DATA.hasInvincibility) {
            if (this.time.now % 500 < 250) {
                this.player.setTint(0xffff00);
            } else {
                this.player.clearTint();
            }
        }
    }
    
    // Game mechanic methods
    shootEgg() {
        console.log("Shooting egg");
        const egg = this.eggs.create(this.player.x, this.player.y - 16, 'egg');
        
        // Direction based on player facing
        let facingLeft = false;
        if (this.player.anims.currentAnim) {
            facingLeft = this.player.anims.currentAnim.key === 'left';
        } else {
            // Default to direction based on velocity
            facingLeft = this.player.body.velocity.x < 0;
        }
        
        egg.setVelocityX(facingLeft ? -400 : 400);
        egg.body.allowGravity = false;
    }
    
    destroyEgg(egg, platform) {
        egg.disableBody(true, true);
    }
    
    hitEnemy(egg, enemy) {
        egg.disableBody(true, true);
        
        // Different score values for different enemies
        let points = 20;
        if (enemy.texture.key === 'cow') points = 50;
        if (enemy.texture.key === 'goat') points = 40;
        if (enemy.texture.key === 'sheep') points = 30;
        
        GAME_DATA.score += points;
        console.log("Enemy hit, score +", points);
        
        // Visual effects
        enemy.setTint(0xff0000);
        
        // Kill enemy with animation
        this.tweens.add({
            targets: enemy,
            alpha: 0,
            y: enemy.y - 30,
            duration: 800,
            onComplete: () => {
                enemy.disableBody(true, true);
            }
        });
    }
    
    collectCorn(player, corn) {
        corn.disableBody(true, true);
        
        GAME_DATA.score += 5;
        GAME_DATA.collectibles++;
        console.log("Corn collected, total:", GAME_DATA.collectibles);
        
        // Visual effect
        this.tweens.add({
            targets: corn,
            y: corn.y - 30,
            alpha: 0,
            duration: 300
        });
    }
    
    collectEggPowerup(player, powerup) {
        powerup.disableBody(true, true);
        
        // Enable egg shooting for a limited time
        GAME_DATA.hasEggPower = true;
        console.log("Egg powerup collected");
        
        // Clear any existing timers for this powerup
        this.powerupTimers = this.powerupTimers.filter(timer => timer.key !== 'egg');
        
        // Set timer to remove the powerup
        const timer = this.time.delayedCall(GAME_DATA.powerupDuration, () => {
            GAME_DATA.hasEggPower = false;
            console.log("Egg powerup expired");
        });
        
        this.powerupTimers.push({ key: 'egg', timer: timer });
        
        // Visual effect
        player.setTint(0xffff00);
        this.time.delayedCall(300, () => {
            player.clearTint();
        });
    }
    
    collectSpeedPowerup(player, powerup) {
        powerup.disableBody(true, true);
        
        // Enable speed boost for a limited time
        GAME_DATA.hasSpeedBoost = true;
        console.log("Speed powerup collected");
        
        // Clear any existing timers for this powerup
        this.powerupTimers = this.powerupTimers.filter(timer => timer.key !== 'speed');
        
        // Set timer to remove the powerup
        const timer = this.time.delayedCall(GAME_DATA.powerupDuration, () => {
            GAME_DATA.hasSpeedBoost = false;
            console.log("Speed powerup expired");
        });
        
        this.powerupTimers.push({ key: 'speed', timer: timer });
        
        // Visual effect
        player.setTint(0x00ff00);
        this.time.delayedCall(300, () => {
            player.clearTint();
        });
    }
    
    collectJumpPowerup(player, powerup) {
        powerup.disableBody(true, true);
        
        // Enable super jump for a limited time
        GAME_DATA.hasJumpBoost = true;
        console.log("Jump powerup collected");
        
        // Clear any existing timers for this powerup
        this.powerupTimers = this.powerupTimers.filter(timer => timer.key !== 'jump');
        
        // Set timer to remove the powerup
        const timer = this.time.delayedCall(GAME_DATA.powerupDuration, () => {
            GAME_DATA.hasJumpBoost = false;
            console.log("Jump powerup expired");
        });
        
        this.powerupTimers.push({ key: 'jump', timer: timer });
        
        // Visual effect
        player.setTint(0x00ffff);
        this.time.delayedCall(300, () => {
            player.clearTint();
        });
    }
    
    collectInvincibilityPowerup(player, powerup) {
        powerup.disableBody(true, true);
        
        // Enable invincibility for a limited time
        GAME_DATA.hasInvincibility = true;
        console.log("Invincibility powerup collected");
        
        // Clear any existing timers for this powerup
        this.powerupTimers = this.powerupTimers.filter(timer => timer.key !== 'invincibility');
        
        // Set timer to remove the powerup
        const timer = this.time.delayedCall(GAME_DATA.powerupDuration, () => {
            GAME_DATA.hasInvincibility = false;
            player.clearTint();
            console.log("Invincibility powerup expired");
        });
        
        this.powerupTimers.push({ key: 'invincibility', timer: timer });
    }
    
    bouncePlayer(player, trampoline) {
        if (player.body.velocity.y > 0) {
            // Only bounce when falling down onto the trampoline
            player.setVelocityY(-GAME_DATA.jumpForce * 1.5);
            console.log("Player bounced on trampoline");
            
            // Animation for trampoline
            this.tweens.add({
                targets: trampoline,
                scaleY: 0.7,
                duration: 100,
                yoyo: true
            });
        }
    }
    
    slowInMud(player, mud) {
        // The actual slowing effect is handled in the movement function
        // This is just for visual/sound effects
        if (!mud.playedEffect && Math.random() < 0.1) {
            mud.playedEffect = true;
            
            // Visual effect - ripples or splashes
            this.time.delayedCall(500, () => {
                mud.playedEffect = false;
            });
        }
    }
    
    fallInWater(player, water) {
        if (!GAME_DATA.hasInvincibility && !player.invulnerable) {
            // Reset player position and lose a life
            this.damagePlayer(player, "Fell in water!");
        }
    }
    
    hitByEnemy(player, enemy) {
        if (!GAME_DATA.hasInvincibility && !player.invulnerable) {
            // Player loses a life
            let enemyType = "enemy";
            if (enemy.texture.key === 'pig') enemyType = "pig";
            if (enemy.texture.key === 'cow') enemyType = "cow";
            if (enemy.texture.key === 'sheep') enemyType = "sheep";
            if (enemy.texture.key === 'goat') enemyType = "goat";
            
            this.damagePlayer(player, "Hit by " + enemyType + "!");
        } else if (GAME_DATA.hasInvincibility) {
            // If invincible, defeat the enemy instead
            this.hitEnemy({ disableBody: function() {} }, enemy);
        }
    }
    
    hitByHazard(player, hazard) {
        if (!GAME_DATA.hasInvincibility && !player.invulnerable) {
            // Player loses a life
            this.damagePlayer(player, "Hit by hazard!");
        }
    }
    
    damagePlayer(player, message) {
        // Player gets hit and loses a life
        GAME_DATA.lives--;
        console.log("Player damaged:", message, "Lives remaining:", GAME_DATA.lives);
        
        // Visual feedback
        player.setTint(0xff0000);
        
        // Display damage message
        const damageText = this.add.text(
            player.x, 
            player.y - 40, 
            message, 
            { fontSize: '16px', fill: '#ff0000', stroke: '#000', strokeThickness: 3 }
        ).setOrigin(0.5);
        
        // Fade out the message
        this.tweens.add({
            targets: damageText,
            y: damageText.y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                damageText.destroy();
            }
        });
        
        // Temporary invulnerability
        player.invulnerable = true;
        
        // Reset player position to spawn point
        player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
        player.setVelocity(0, 0);
        
        // Flash effect during invulnerability period
        this.time.delayedCall(100, () => {
            player.clearTint();
        });
        
        // End invulnerability after a short time
        this.time.delayedCall(2000, () => {
            player.invulnerable = false;
        });
        
        // Check for game over
        if (GAME_DATA.lives <= 0) {
            this.gameOver = true;
            console.log("GAME OVER");
            
            // Game over sequence
            player.setTint(0xff0000);
            player.setVelocity(0, 0);
            
            // Navigate to game over scene after delay
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOverScene');
            });
        }
    }
    
    reachGoal(player, goal) {
        if (!this.victory) {
            this.victory = true;
            console.log("Level complete!");
            
            // Celebrate
            const victoryText = this.add.text(
                400, 
                200, 
                'Level Complete!', 
                { fontSize: '48px', fill: '#ffff00', stroke: '#000', strokeThickness: 6 }
            ).setOrigin(0.5).setScrollFactor(0);
            
            // Bonus points for remaining lives
            const lifeBonus = GAME_DATA.lives * 50;
            GAME_DATA.score += lifeBonus;
            
            // Bonus for collectibles
            const collectibleBonus = GAME_DATA.collectibles * 10;
            GAME_DATA.score += collectibleBonus;
            
            // Show bonus points
            const bonusText = this.add.text(
                400, 
                250, 
                `Life Bonus: ${lifeBonus}\nCorn Bonus: ${collectibleBonus}`, 
                { fontSize: '24px', fill: '#ffffff', stroke: '#000', strokeThickness: 4, align: 'center' }
            ).setOrigin(0.5).setScrollFactor(0);
            
            // Unlock next level if applicable
            if (GAME_DATA.currentLevel >= GAME_DATA.maxUnlockedLevel) {
                GAME_DATA.maxUnlockedLevel = Math.min(GAME_DATA.currentLevel + 1, 3);
                console.log("Unlocked level:", GAME_DATA.maxUnlockedLevel);
            }
            
            // Celebration animation
            player.setVelocity(0, 0);
            this.tweens.add({
                targets: player,
                y: player.y - 20,
                duration: 200,
                yoyo: true,
                repeat: 3
            });
            
            // Move to next level or victory screen
            this.time.delayedCall(3000, () => {
                if (GAME_DATA.currentLevel < 3) {
                    // Go to next level
                    GAME_DATA.currentLevel++;
                    this.scene.start('Level' + GAME_DATA.currentLevel + 'Scene');
                } else {
                    // Game completed!
                    this.scene.start('VictoryScene');
                }
            });
        }
    }
    
    // Helper methods for creating game objects
    createMudPatch(x, y) {
        const mud = this.mudPatches.create(x, y, 'mud');
        mud.setSize(64, 10); // Make the hitbox shorter/thinner
        mud.setOffset(0, 22); // Offset hitbox to just be the top of the mud
        mud.refreshBody();
        mud.playedEffect = false;
        return mud;
    }
    
    createWaterPool(x, y) {
        const water = this.waterPools.create(x, y, 'water');
        return water;
    }
    
    createTrampoline(x, y) {
        const trampoline = this.trampolines.create(x, y, 'trampoline');
        trampoline.setImmovable(true);
        return trampoline;
    }
    
    createMovingPlatform(x, y, leftLimit, rightLimit) {
        const platform = this.movingPlatforms.create(x, y, 'movingPlatform');
        platform.setImmovable(true);
        platform.setVelocityX(50);
        platform.leftLimit = leftLimit;
        platform.rightLimit = rightLimit;
        return platform;
    }
    
    createEnemy(x, y, type, leftLimit, rightLimit, velocity = 100) {
        let enemy;
        let group = this.enemies;
        
        switch (type) {
            case 'pig':
                enemy = this.pigs.create(x, y, 'pig');
                group = this.pigs;
                break;
            case 'cow':
                enemy = this.cows.create(x, y, 'cow');
                enemy.setSize(50, 60); // Adjust hitbox
                group = this.cows;
                velocity = velocity || 50; // Cows are slower by default
                break;
            case 'sheep':
                enemy = this.sheep.create(x, y, 'sheep');
                group = this.sheep;
                velocity = velocity || 120; // Sheep are faster by default
                break;
            case 'goat':
                enemy = this.goats.create(x, y, 'goat');
                enemy.isClimbing = false;
                group = this.goats;
                break;
            default:
                enemy = this.enemies.create(x, y, 'pig');
        }
        
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(velocity);
        enemy.leftLimit = leftLimit;
        enemy.rightLimit = rightLimit;
        
        // Add to both specific group and general enemies
        if (group !== this.enemies) {
            this.enemies.add(enemy);
        }
        
        return enemy;
    }
    
    createCollectible(x, y) {
        const corn = this.collectibles.create(x, y, 'corn');
        corn.setBounce(0.3);
        corn.body.setAllowGravity(false);
        
        // Add bobbing animation
        this.tweens.add({
            targets: corn,
            y: y - 5,
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        GAME_DATA.totalCollectibles++;
        return corn;
    }
    
    createPowerup(x, y, type) {
        let powerup;
        let textureName;
        
        switch (type) {
            case 'egg':
                textureName = 'eggPowerup';
                powerup = this.powerups.egg.create(x, y, textureName);
                break;
            case 'speed':
                textureName = 'speedPowerup';
                powerup = this.powerups.speed.create(x, y, textureName);
                break;
            case 'jump':
                textureName = 'jumpPowerup';
                powerup = this.powerups.jump.create(x, y, textureName);
                break;
            case 'invincibility':
                textureName = 'invincibilityPowerup';
                powerup = this.powerups.invincibility.create(x, y, textureName);
                break;
            default:
                textureName = 'eggPowerup';
                powerup = this.powerups.egg.create(x, y, textureName);
        }
        
        console.log(`Created ${type} powerup at (${x}, ${y}) using texture ${textureName}`);
        
        powerup.setBounce(0.6);
        powerup.body.setAllowGravity(false);
        
        // Add floating animation
        this.tweens.add({
            targets: powerup,
            y: y - 10,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add glowing effect
        this.tweens.add({
            targets: powerup,
            alpha: 0.7,
            duration: 600,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        return powerup;
    }
    
    createLevelGoal(x, y, type = 'coop') {
        const goalTexture = type === 'coop' ? 'coop' : 'barn';
        const goal = this.goal.create(x, y, goalTexture);
        console.log(`Created level goal (${type}) at (${x}, ${y})`);
        
        // Highlight the goal
        this.tweens.add({
            targets: goal,
            alpha: 0.8,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        return goal;
    }
}