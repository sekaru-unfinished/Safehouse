import Interactable from '../Interactable';

export default class extends Interactable{
	
	constructor(scene, x, y, direction){
		super({scene, x, y, key: 'fridge_no_door'});
		
		// Tack on the fridge door
		this.scene.matter.add.sprite('fridge_no_door');
		this.door = this.scene.matter.add.image(x, y, 'fridge_door', null);

		this.spring = this.scene.matter.add.spring(this, this.door, 10, 0.2);
		this.setFrictionStatic(100);
		this.setStatic(true);
		this.triggered();
	}

	triggered(){
		// Fling the
		this.door.setVelocityX();
	}

}