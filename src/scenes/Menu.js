import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import testtiles from "../assets/images/testtiles.png";
import test from "../assets/maps/test.json";


export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('logo', logoImg);

    this.load.image('tiles', testtiles);
    this.load.tilemapTiledJSON('map', test);
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