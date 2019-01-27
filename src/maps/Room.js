export default class{
	
	constructor(scene, x, y, width, height, id, graphics){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.id = id;
		this.scene = scene;

		this.graphics = graphics;
     	this.overlay = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
	}

	shouldRoomRevealForPlayer(player){
		if(Phaser.Geom.Rectangle.Overlaps(player.getBounds(), this.overlay)){
			this.showRoom = false;
		}else{
			this.showRoom = true;
		}
	}

	render(){
		this.graphics.fillStyle(0x0f0c27,
			this.showRoom ? 1 : 0);

        this.graphics.fillRectShape(this.overlay);

        this.graphics.fillStyle(0x0f0c27,
        	!this.showRoom ? 0 : 1);
	}
}