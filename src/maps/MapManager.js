export default class {

	constructor(level = 1, scene){
		this.level = level;
		this.scene = scene;
		this.loadLevel();
	}

	getCameraBounds(){
		return {
			width: this.map.widthInPixels,
			height: this.map.heightInPixels
		}
	}

	loadLevel(){
		const map = this.scene.make.tilemap({key: `level_${this.level}`});

    	const tileset = map.addTilesetImage("testtiles", "tiles");
    	const baseLayer = map.createStaticLayer("test", tileset, 0, 0);
    	const collisionsLayer = map.createStaticLayer("collisions", tileset, 0, 0);
		
		this.map = map;
	}

	loadNextLevel(){
		this.level++;
		this.loadLevel();
	}
}