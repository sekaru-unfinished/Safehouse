import Interactable from '../Interactable';

export default class extends Interactable{
	
	constructor(scene, x, y, direction, enemies){
		super({scene, x, y, key: 'google_home'});
		this.setStatic(true);
		this.enemies = enemies;
	}

	trigger(enemies){
		// Call the lure for all enemies within radius
		for(let enemy of enemies){
			// Call set lure which checks distance to lure before going to it
			enemy.setLure({x: this.x, y: this.y});
		}
	}

}