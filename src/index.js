import Phaser from "phaser";
import MenuScene from "./scenes/Menu";
import GameScene from "./scenes/Game";
import UIScene from "./scenes/UI";
import LoseScene from "./scenes/Lose";
import WinScene from "./scenes/Win";

const width = 1280;
const height = 720;

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width,
    height,
    scene: [MenuScene, GameScene, UIScene, LoseScene, WinScene],
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            // debug: true
        }
    },
    pixelArt: true
  };

  new Phaser.Game(config);
}