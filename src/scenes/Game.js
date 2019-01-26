import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import Player from "../gameplay/Player";
import Enemy from "../entities/Enemy";

export default class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {

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

    preload() {
        this.load.image('player', 'src/assets/sprites/fridge.png');
        this.load.image('enemy', 'src/assets/sprites/enemy/enemy.png');
    }

    update() {
        this.player.handleMovement();
    }
}