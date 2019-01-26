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
            this.setAngle(-90);
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.down.isDown) {
            this.setVelocityY(1);
            this.setAngle(90);
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.left.isDown) {
            this.setVelocityX(-1);
            this.setAngle(180);
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.right.isDown) {
            this.setVelocityX(1);
            this.setAngle(0);
            moving = true;
            this.anims.play('walk', true);
        }

        if(!moving) {
            this.anims.stop('walk');
            this.setFrame(0);
        }
    }
}