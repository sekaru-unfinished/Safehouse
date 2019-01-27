import Interactable from '../Interactable';

export default class extends Interactable{
	
	constructor(scene, x, y, direction){
		super({scene, x, y, key: 'smart_door'});
		this.setStatic(true);
		// this.triggered();
	}

	triggered(){
		this.x -= 32;
     //    this.scene.tweens.add({
	    //     targets: bullet,
	    //     x: this.x,
	    //     y: this.y,
	    //     duration: 150,
	    //     onComplete: this.destroyBullet,
	    //     onCompleteParams: [this]
	    // });
	}

}