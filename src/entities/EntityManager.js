import Enemy from "./Enemy";
import Player from "./Player";
import Roomba from './interactables/Roomba';
import Fridge from './interactables/Fridge';
import SmartDoor from './interactables/SmartDoor';
import GoogleHome from './interactables/GoogleHome';

export default class {

    constructor(scene, map) {
        this.scene = scene;
        this.map = map;

        this.enemies = [];
        this.interactables = [];
        
        this.loadPlayer();
        this.loadEnemies(map);
        this.loadInteractables(map);
    }

    loadPlayer() {
        this.player = new Player({
            scene: this.scene,
            x: 40,
            y: 40,
            key: 'player'
        });
        this.scene.matter.add.sprite(this.player);
    }

    loadEnemies(map) {
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
                path: pathPoints,
                player: this.player
            }, this.scene);

            // TODO Add a parameter to Tiled and this to set the starting path point
            this.scene.matter.add.sprite(enemy);
            this.enemies.push(enemy);
        });
    }

    loadInteractables(map){
        this.map.filterObjects("interactables", (value, index, array) => {
            // Pull out the properties required
            const typeProperty = value.properties.find(
                (property) => property.name === "type");

            let interactable = null;
            switch(typeProperty.value){
                case "roomba":
                    // Get the direction property for this interactable
                    const directionProperty = value.properties.find(
                            (property) => property.name === "direction");
            
                    const roomba = new Roomba(this.scene, value.x, value.y, directionProperty.value);
                    this.scene.matter.add.sprite(roomba);
                    interactable = roomba;
                    
                    break;
                case "fridge":
                    // Get the direction property for this interactable
        
                    const fridge = new Fridge(this.scene, value.x, value.y);
                    this.scene.matter.add.sprite(fridge);
                    interactable = fridge;
                    
                    break;
                case "smart door":
                    // Get the direction property for this interactable
        
                    const door = new SmartDoor(this.scene, value.x, value.y);
                    this.scene.matter.add.sprite(door);
                    interactable = door;
                    
                    break;
                case "google home":
                    const googleHome = new GoogleHome(this.scene, value.x, value.y, this.enemies);
                    this.scene.matter.add.sprite(googleHome);
                    interactable = googleHome;
                    
                    break;
                default:
                    break;
            }
            if(interactable){
                this.interactables.push(interactable);  
            }
        });
    }

    update() {

        for (let enemy of this.enemies) {
            enemy.update();
        }

        if(this.player) this.player.handleMovement();
    }

    getPlayer(){
    	return this.player;
    }

    getInteractables(){
        return this.interactables;
    }
}