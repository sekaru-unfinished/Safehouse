import Phaser from 'phaser';

export default class LoseScene extends Phaser.Scene {
    constructor() {
        super('LoseScene');
    }

    create() {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff3300, 1);

        graphics.fillRect(40,40,300,300);
        this.add.text(120, 120, "You lost!", {
            font: '96px Courier',
            fill: '#000000'
        });
    }
}