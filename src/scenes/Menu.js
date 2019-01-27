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

    this.load.audio('tap', 'src/assets/sounds/tap.wav');
  }
  
  create() {

    const width = this.sys.canvas.width;
    const height = this.sys.canvas.height;
    
    let textXPosition = width / 2;
    let graphics = this.add.graphics();

    graphics.fillStyle(0x2f4f4f, 1);
    graphics.fillRect(0, 0, width, height);

    this.text = this.add.text(textXPosition, 150, "Name of the game", {
        font: '50px Courier',
        fill: '#ffffff'
    });

    let tutText = "Controls:\n---------\nUse the arrow keys to move around.\nPress space to toggle your phone and control your home.\n\nObjective:\n----------\nTrap, incapacitate or injure the intruders to complete each level.";
    this.tutorial = this.add.text(textXPosition, 400, tutText, {
      font: '25px monospace',
      fill: '#ffffff'
    })

    this.textPlay = this.add.text(textXPosition, height - 50, "Press any key to play", {
        font: '30px monospace',
        fill: '#ffffff'
    });

    this.text.setOrigin(0.5);
    this.tutorial.setOrigin(0.5);
    this.textPlay.setOrigin(0.5);

    this.cameras.main.fadeIn(1000);

    this.input.keyboard.on('keydown', function(event) {
        this.sound.add('tap').play();
        this.scene.stop('Game');
        this.scene.start('Game');
    }, this);
  }
}