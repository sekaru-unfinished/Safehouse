import EntityManager from '../entities/EntityManager';
import RoomManager from './RoomManager';

export default class {

	constructor(level = 1, scene){
		this.level = level;
		this.scene = scene;
		this.loadLevel();

		this.roomManager = new RoomManager(scene, this.map);
		this.entityManager = new EntityManager(scene, this.map);
		this.roomManager = new RoomManager(scene, this.map);
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
    	const collisionsLayer = map.createDynamicLayer("collisions", tileset, 0, 0);
		
		collisionsLayer.setCollisionByProperty({collides: true});
		collisionsLayer.setCollisionFromCollisionGroup();
	    this.scene.matter.world.convertTilemapLayer(collisionsLayer);	

		this.map = map;

		const cameraWidth = this.getCameraBounds().width;
		const cameraHeight = this.getCameraBounds().height;

		this.scene.matter.world.setBounds(0, 0, cameraWidth, cameraHeight);
	}

	update(){
        this.entityManager.update();
        this.roomManager.revealRoomsForPlayer(this.entityManager.getPlayer());
		this.roomManager.render();
	}

	loadNextLevel(){
		this.level++;
		this.loadLevel();
	}

	getEntityManager(){
		return this.entityManager;
	}

	getRoomManager(){
		return this.roomManager;
	}
}