import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import testtiles from "../assets/images/testtiles.png";

import level_1 from "../assets/maps/1.json";
import level_2 from "../assets/maps/2.json";

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('logo', logoImg);
    this.load.image('tiles', testtiles);

    // TODO Should we load them all at once?
    this.load.tilemapTiledJSON('level_1', level_1);
    this.load.tilemapTiledJSON('level_2', level_2);
  }
  
  create() {

    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;
    
    let graphics = this.add.graphics();

    graphics.fillStyle(0x2f4f4f, 1);
    graphics.fillRect(0, 0, width, height);

    this.text = this.add.text(width / 2, 50, "Name of the game", {
        font: '50px Courier',
        fill: '#ffffff'
    });
    this.textPlay = this.add.text(width / 2, height - 200, "Press SPACEBAR to play", {
        font: '30px monospace',
        fill: '#ffffff'
    });

    this.text.setOrigin(0.5);
    this.textPlay.setOrigin(0.5);

    this.cameras.main.fadeIn(1000);

    this.input.keyboard.on('keydown-SPACE', function(event) {
        this.scene.switch('Game');
    }, this);
  }
}