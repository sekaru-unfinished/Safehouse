import Interactable from '../Interactable';

export default class extends Interactable{
	
	constructor(scene, x, y, direction){
		super({scene, x, y, key: 'boomba'});
		
		this.speed = 10;
		switch(direction){
			case 1:
				this.up = true;
			case 2:
				this.right = true;
			case 3:
				this.down = true;
			case 4:
				this.left = true;
			default:
				this.down = true;
		}

	}

	trigger(){
		// Send the roomba into the direction
		if(this.up){
			this.setVelocityY(-this.speed);
		}else if(this.down){
			this.setVelocityY(this.speed);
		}else if(this.left){
			this.setVelocityX(-this.speed);
		}else if(this.right){
			this.setVelocityX(this.speed);
		}
	}

}