import Phaser from "phaser";

export default class PlayerMovement extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world, config.x, config.y, config.key);

        this.scene = config.scene;
        this.scene.add.existing(this);

        this.cursorKeys = config.scene.input.keyboard.createCursorKeys();
        this.shownAngle = this.playerAngle = 0;
        this.setDepth(3);
    }

    handleMovement() {
        this.setVelocityX(0);
        this.setVelocityY(0);

        let moving = false;
        const speed = 2.5;

        this.shownAngle += (((((this.playerAngle - this.shownAngle) % 360) + 540) % 360) - 180) * 0.1;
        this.setAngle(this.shownAngle);
        
        if ( this.cursorKeys.up.isDown ) {
            this.setVelocityY(-speed);
            this.playerAngle = -90;
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.down.isDown) {
            this.setVelocityY(speed);
            this.playerAngle = 90;
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.left.isDown) {
            this.setVelocityX(-speed);
            this.playerAngle = 180;
            moving = true;
            this.anims.play('walk', true);
        }
        if (this.cursorKeys.right.isDown) {
            this.setVelocityX(speed);
            this.playerAngle = 0;
            moving = true;
            this.anims.play('walk', true);
        }

        if(!moving) {
            this.anims.stop('walk');
            this.setFrame(0);
        }
    }
}