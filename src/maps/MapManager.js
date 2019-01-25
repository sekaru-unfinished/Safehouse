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
    	const baseLayer = map.createDynamicLayer("floor", tileset, 0, 0);
    	const collisionsLayer = map.createStaticLayer("collisions", tileset, 0, 0);
		
		// collisionsLayer.setCollisionByProperty({ collides: true });
		this.scene.matter.world.convertTilemapLayer(collisionsLayer);

		this.map = map;
		const cameraWidth = this.getCameraBounds().width;
		const cameraHeight = this.getCameraBounds().height;

		this.scene.matter.world.setBounds(0, 0, cameraWidth, cameraHeight);
	}

	loadNextLevel(){
		this.level++;
		this.loadLevel();
	}
}