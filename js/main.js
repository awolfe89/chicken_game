// Game configuration
const gameConfig = {
    type: Phaser.AUTO,
    width: 800,          // Increase from current size
    height: 600,         // Increase from current size
    scale: {
        mode: Phaser.Scale.FIT,  // This will make the game fit the window
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        BootScene,
        LevelSelectScene,
        Level1Scene, 
        Level2Scene, 
        Level3Scene,
        GameOverScene,
        VictoryScene
    ],
    parent: 'game'
};