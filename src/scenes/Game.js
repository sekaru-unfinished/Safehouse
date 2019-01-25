import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import PlayerMovement from "../gameplay/PlayerMovement";

export default class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        this.mapManager = new MapManager(1, this);

        const camera = this.cameras.main;
        const cameraBounds = this.mapManager.getCameraBounds();

        camera.setViewport(0, 0, cameraBounds.width, cameraBounds.height);

        this.add.text(10, 10, 'Welcome to the game', { font: '48px Arial', fill: '#fff' });

        this.playerMovement = new PlayerMovement({
            scene: this,
            x: 40,
            y: 40,
            key: 'player'
        });
    }

    preload() {
        this.load.image('player', 'src/assets/sprites/fridge.png');
    }

    update() {
        this.playerMovement.handleMovement();
    }
}