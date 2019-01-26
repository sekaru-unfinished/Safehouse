import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import testtiles from "../assets/images/testtiles.png";
import enemy from "../assets/sprites/enemy/enemy.png";

import level_1 from "../assets/maps/1.json";
import level_2 from "../assets/maps/2.json";

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('logo', logoImg);

    this.load.image('tiles', testtiles);
    this.load.image('enemy', 'src/assets/sprites/enemy/enemy.png');
    this.load.spritesheet('enemy',
        enemy,
        { frameWidth: 32, frameHeight: 32 }
    );

    // TODO Should we load them all at once?
    this.load.tilemapTiledJSON('level_1', level_1);
    this.load.tilemapTiledJSON('level_2', level_2);
  }
  
  create() {
    const logo = this.add.image(400, 150, 'logo');
  
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });

    this.input.on('pointerdown', () => {
      this.input.stopPropagation();
      this.scene.switch('Game');
    }, this);
  }
}