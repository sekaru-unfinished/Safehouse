import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    create() {
        const width = this.sys.canvas.width;
        const height = this.sys.canvas.height;
        
        let graphics = this.add.graphics();

        graphics.fillStyle(0x2f4f4f, 1);
        graphics.fillRect(0, 0, width, height);

        this.text = this.add.text(width / 2, height + 100, "Intruders evaded!", {
            font: '96px Courier',
            fill: '#ffd700',
            align: 'center'
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
        })
    }
}