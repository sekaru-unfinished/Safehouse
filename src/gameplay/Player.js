import Phaser from "phaser";

export default class PlayerMovement extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key);

        this.scene = config.scene;
        this.scene.add.existing(this);

        this.cursorKeys = config.scene.input.keyboard.createCursorKeys();

    }

    handleMovement() {
        this.setAngle(0);
        this.setVelocityX(0);
        this.setVelocityY(0);

        this.anims.play('walk', true);
        
        if ( this.cursorKeys.up.isDown ) {
            this.setVelocityY(-10);
        }
        if (this.cursorKeys.down.isDown) {
            this.setVelocityY(10);
        }
        if (this.cursorKeys.left.isDown) {
            this.setVelocityX(-10);
            this.flipX = true;
        }
        if (this.cursorKeys.right.isDown) {
            this.setVelocityX(10);
            this.flipX = false;
        }
    }

    handleRotation(mouseX, mouseY) {
        this.setAngle(180);
        console.log(this.rotation);
    }
}