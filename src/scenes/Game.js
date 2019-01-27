import Phaser from "phaser";
import MapManager from "../maps/MapManager";
import player from "../assets/sprites/player.png";
import enemy from "../assets/sprites/enemy/enemy.png";
import enemyShoot from "../assets/sprites/enemy/enemy_shoot.png";
import bullet from "../assets/sprites/bullet.png";
import boomba from "../assets/sprites/boomba.png";
import fridgeNoDoor from "../assets/sprites/fridge_no_door.png";
import fridgeDoor from "../assets/sprites/fridge_door.png";

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('bullet', bullet);
        this.load.image('boomba', boomba);
        this.load.image('fridge_no_door', fridgeNoDoor);
        this.load.image('fridge_door', fridgeDoor);

        this.load.spritesheet(
            'player',
            player,
            {
                frameWidth: 16,
                frameHeight: 21
            }
        );

        this.load.spritesheet(
            'enemy',
            enemy,
            { 
                frameWidth: 29, 
                frameHeight: 21
            }
        );

        this.load.spritesheet(
            'enemy-shoot',
            enemyShoot,
            { 
                frameWidth: 29, 
                frameHeight: 21
            }
        );

        this.load.audio('blood', 'src/assets/sounds/blood.wav');
        this.load.audio('pistol', 'src/assets/sounds/pistol.ogg');
        this.load.audio('gamemusic', 'src/assets/sounds/gamemusic.ogg');
    }

    create() {
        this.createAnims();

        this.mapManager = new MapManager(1, this);

        const camera = this.cameras.main;
        camera.setZoom(3);

        camera.startFollow(this.mapManager.getEntityManager().player);

        // Change state scenes (Temporary)
        this.input.keyboard.on('keydown-W', function(event) {
            this.scene.switch('WinScene');
        }, this);

        this.sound.add('gamemusic').play({loop: true});

        this.input.keyboard.on('keydown-M', () => {
          this.sound.setMute(!this.sound.mute)
        }, this);
    }

    createAnims() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy-shoot',
            frames: this.anims.generateFrameNumbers('enemy-shoot', { start: 0, end: 11 }),
            frameRate: 12,
            repeat: 0
        });
    }

    update() {
        this.mapManager.update();
    }

    render(){
        this.mapManager.getRoomManager().render();
    }
}