import Phaser from "phaser";
import MenuScene from "./scenes/Menu";
import GameScene from "./scenes/Game";

const width = 1280;
const height = 720;

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width,
    height,
    scene: [MenuScene, GameScene],
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: true
        }
    }
  };

  new Phaser.Game(config);

  resize();
  window.addEventListener("resize", resize, false);
}

function resize() {
  let canvas = document.querySelector("canvas");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = width / height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}