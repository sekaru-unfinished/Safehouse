import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {

  }
  
  create() {
    this.add.text(10, 10, 'Welcome to the game', { font: '48px Arial', fill: '#fff' });
  }
}