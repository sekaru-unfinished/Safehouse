import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const camera = this.cameras.main;

 	  const map = this.make.tilemap({key: 'map'});
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    const tileset = map.addTilesetImage("testtiles", "tiles");

    const belowLayer = map.createStaticLayer("test", tileset, 0, 0);
   
    this.add.text(10, 10, 'Welcome to the game', { font: '48px Arial', fill: '#fff' });
  }
}