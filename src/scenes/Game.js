import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import Player from "../gameplay/Player";

export default class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        this.mapManager = new MapManager(1, this);

        const camera = this.cameras.main;

        this.add.text(10, 10, 'Welcome to the game', { font: '48px Arial', fill: '#fff' });

        this.player = new Player({
            scene: this,
            x: 40,
            y: 40,
            key: 'player'
        });
    
        camera.startFollow(this.playerMovement);
        // this.input.on('pointerdown', () => {
        //   this.input.stopPropagation();
        //   this.mapManager.loadNextLevel();
        // }, this);
    }

    preload() {
        this.load.image('player', 'src/assets/sprites/fridge.png');
    }

    update() {
        this.player.handleMovement();
    }
}