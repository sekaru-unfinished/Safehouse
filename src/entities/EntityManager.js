import Enemy from "./Enemy";

export default class{

	constructor(scene, map){
		this.scene = scene;
		this.map = map;

		this.enemies = [];		
		this.loadEnemies(map);
	}

	loadEnemies(map){
		// Load all the enemy paths available
		const paths = this.map.filterObjects("paths", (value, index, array) => {
			this.paths = array;
		});

		const enemies = this.map.filterObjects("enemy_spawns", (value, index, array) => {
			
			const id = value.properties.find((property) => property.name === "enemy").value

			// Filter through the paths for this enemy
			const pathPointsForEnemy = this.paths.filter((point) => {
				const enemyId = point.properties.find((property) => property.name == "enemy");
				return enemyId.value == id;
			})

			const pathPoints = pathPointsForEnemy.map((point) => {
				const id = point.properties.find((property) => property.name == "path_point");
				const finalPoint = point.properties.find((property) => property.name == "final_point");
				
				return {
					x: point.x,
					y: point.y,
					id: id.value,
					finalPoint: (finalPoint != null) ? true : false
				}
			})

			// Grab all path points for a certain enemy and assign it 
			// const pathPointsForEnemy = this.paths.filter()

			// For each one of these enemy spawns create a new enemy and add it to our enemies array
			const enemy = new Enemy({
	            scene: this.scene,
	            x: value.x,
	            y: value.y,
	            path: pathPoints
	        });

	        // TODO Add a parameter to Tiled and this to set the starting path point
	        this.scene.matter.add.sprite(enemy);
			this.enemies.push(enemy);
		});
	}

	update(){
		for(let enemy of this.enemies){
			enemy.update();
		}
	}

}