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

        let moving = false;
        
        if ( this.cursorKeys.up.isDown ) {
            this.setVelocityY(-1);
            moving = true;
            // this.anims.play('walk', true);
        }
        if (this.cursorKeys.down.isDown) {
            this.setVelocityY(1);
            moving = true;
            // this.anims.play('walk', true);
        }
        if (this.cursorKeys.left.isDown) {
            this.setVelocityX(-1);
            moving = true;
            this.flipX = true;
            // this.anims.play('walk', true);
        }
        if (this.cursorKeys.right.isDown) {
            this.setVelocityX(1);
            moving = true;
            this.flipX = false;
            // this.anims.play('walk', true);
        }

        if(moving) {
            this.anims.play('walk');
        } else {
            this.anims.stop('walk');
        }
    }

    handleRotation(mouseX, mouseY) {
        this.setAngle(Math.atan2(mouseY - this.y, mouseX - this.x));
        console.log(this.rotation);
    }
}