import Phaser from "phaser";

export default class PlayerMovement extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        this.scene = config.scene;
        this.scene.add.existing(this);

        this.cursorKeys = config.scene.input.keyboard.createCursorKeys();
    }

    handleMovement() {
        if ( this.cursorKeys.up.isDown ) {
            this.y += -100;
        }
        if (this.cursorKeys.down.isDown) {
            this.y += 100;
        }
        if (this.cursorKeys.left.isDown) {
            this.x += -100;
        }
        if (this.cursorKeys.right.isDown) {
            this.x += 100;
        }
    }
}