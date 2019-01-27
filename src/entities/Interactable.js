
export default class extends Phaser.Physics.Matter.Sprite {
    
    constructor(config) {
		super(config.scene.matter.world, config.x, config.y, config.key);
        this.scene = config.scene;
        this.type = config.type;

        this.scene.add.existing(this);
    }
	
}