import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import Player from "../gameplay/Player";

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.spritesheet(
            'player',
            'src/assets/sprites/player.png',
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(
                'player',
                {start: 0, end: 7}
            ),
            frameRate: 10,
            repeat: -1
        })

        this.mapManager = new MapManager(1, this);
       
        const camera = this.cameras.main;
        const cameraBounds = this.mapManager.getCameraBounds();

        camera.setViewport(0, 0, cameraBounds.width, cameraBounds.height);

        this.player = new Player({
            scene: this,
            x: 40,
            y: 40,
            key: 'player'
        });
        this.matter.add.sprite(this.player);

       
        camera.startFollow(this.player);
        // this.input.on('pointerdown', () => {
        //   this.input.stopPropagation();
        //   this.mapManager.loadNextLevel();
        // }, this);
    }

    update() {
        this.player.handleMovement();
    }
}