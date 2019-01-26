import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import Player from "../gameplay/Player";
import Enemy from "../entities/Enemy";

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

        this.mapManager = new MapManager(1, this);

        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.player = new Player({
            scene: this,
            x: 40,
            y: 40,
            key: 'player'
        });
        this.matter.add.sprite(this.player);

        const camera = this.cameras.main;
        camera.setZoom(2);
        camera.startFollow(this.player);
        // this.input.on('pointerdown', () => {
        //   this.input.stopPropagation();
        //   this.mapManager.loadNextLevel();
        // }, this);
    }

    update() {
        this.player.handleMovement();
        this.mapManager.getEntityManager().update();
    }
}