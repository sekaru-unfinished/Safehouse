import Phaser from 'phaser';

export default class LoseScene extends Phaser.Scene {
    constructor() {
        super('LoseScene');
    }

    create() {
        const sceneContext = this.scene;
        const width = this.sys.canvas.width;
        const height = this.sys.canvas.height;
        
        let textXPosition = width / 2;
        let graphics = this.add.graphics();

        graphics.fillStyle(0x2f4f4f, 1);
        graphics.fillRect(0, 0, width, height);

        this.text = this.add.text(textXPosition, height + 100, "You are dead!", {
            font: '96px Courier',
            fill: '#ffffff'
        });
        this.text.setOrigin(0.5);

        this.cameras.main.fadeIn(1000);

        this.tween = this.tweens.add({
            targets: this.text,
            y: height / 2,
            duration: 1500,
            completeDelay: 800,
            ease: 'Power2',
            delay: 500,
            repeat: 0,
            loop: 0,
            yoyo: false
        });

        this.restartText = this.add.text(textXPosition, height + 100, "Press any key to restart", {
            font: '30px monospace',
            fill: '#ffffff'
        });
        this.restartText.setOrigin(0.5);

        this.tween = this.tweens.add({
            targets: this.restartText,
            y: height - 100,
            duration: 1500,
            completeDelay: 800,
            ease: 'Power2',
            delay: 500,
            repeat: 0,
            loop: 0,
            yoyo: false,
            onComplete: this.restartGame,
            callbackScope: sceneContext
        });
    }

    restartGame(sceneContext) {
        this.scene.input.keyboard.on('keydown', function(event) {
            this.start('Menu');
        }, this)
    }
}