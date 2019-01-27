import Interactable from '../Interactable';

export default class extends Interactable{
	
	constructor(scene, x, y, direction){
		super({scene, x, y, key: 'google_home'});
		this.setStatic(true);
	}

	triggered(){
	}

}