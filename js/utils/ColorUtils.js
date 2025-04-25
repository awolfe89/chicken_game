// Utility function to create colored boxes
function createColoredBox(scene, width, height, color) {
    const graphics = scene.make.graphics();
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, width, height);
    return graphics.generateTexture(color + '_' + width + 'x' + height, width, height);
}