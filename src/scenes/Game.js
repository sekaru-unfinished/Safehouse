import Phaser from "phaser";
import MapManager from "../maps/MapManager";

export default class Game extends Phaser.Scene {

  constructor() {
    super('Game');
  }

  create() {
    this.mapManager = new MapManager(1, this);

    const camera = this.cameras.main;
    const cameraBounds = this.mapManager.getCameraBounds();

    camera.setViewport(0, 0, cameraBounds.width, cameraBounds.height);
  }
}