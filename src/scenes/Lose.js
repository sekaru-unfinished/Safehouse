import Phaser from 'phaser';

export default class LoseScene extends Phaser.Scene {
    constructor() {
        super('LoseScene');
    }

    create() {
        const width = this.sys.canvas.width;
        const height = this.sys.canvas.height;
        
        let graphics = this.add.graphics();

        graphics.fillStyle(0x2f4f4f, 1);
        graphics.fillRect(0, 0, width, height);

        this.text = this.add.text(width / 2, height + 100, "You lost!", {
            font: '96px Courier',
            fill: '#ffffff'
        });

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
        })
    }
}