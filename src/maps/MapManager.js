import EntityManager from '../entities/EntityManager';
import RoomManager from './RoomManager';

export default class {
  constructor(level = 1, scene) {
    this.level = level;
    this.scene = scene;
    this.loadLevel();

    this.entityManager = new EntityManager(scene, this.map);
    this.roomManager = new RoomManager(scene, this.map, this.entityManager.getInteractables());
  }

  getCameraBounds() {
    return {
      width: this.map.widthInPixels,
      height: this.map.heightInPixels
    }
  }

  loadLevel() {
    const map = this.scene.make.tilemap({ key: `level_${this.level}` });

    const tileset = map.addTilesetImage("testtiles", "tiles");
    const baseLayer = map.createDynamicLayer("floor", tileset, 0, 0);
    const collisionsLayer = map.createDynamicLayer("collisions", tileset, 0, 0);

    collisionsLayer.setCollisionByProperty({ collides: true });
    collisionsLayer.setCollisionFromCollisionGroup();
    this.mapCollisions = this.scene.matter.world.convertTilemapLayer(collisionsLayer);
    console.log(this.mapCollisions);
    this.map = map;

    const cameraWidth = this.getCameraBounds().width;
    const cameraHeight = this.getCameraBounds().height;

    this.scene.matter.world.setBounds(0, 0, cameraWidth, cameraHeight);
  }

  update() {

    this.entityManager.update();
    
    for(let enemy of 
      this.entityManager.enemies){
        this.rayCastToPlayer(enemy);
      }

    this.roomManager.revealRoomsForPlayer(this.entityManager.getPlayer());
    this.roomManager.render();

    // show how many left
    let UI = this.scene.scene.manager.getScene('UI');
    const enemiesLeft = this.getEntityManager().enemies.length - this.getInjuredOrTrappedEnemies();
    UI.enemiesLeftText.setText(`Intruders remaining: ${enemiesLeft}`)
    if(enemiesLeft === 0) {
      this.scene.scene.switch('WinScene');
    }
  }
  
  rayCastToPlayer(enemy){
    const player = this.entityManager.getPlayer();
    const bodies = this.mapCollisions.world.localWorld.bodies;
    const lineToPlayer = new Phaser.Geom.Line(player.x, player.y,enemy.x, enemy.y);

    for(let body of bodies){
      if (!Phaser.Geom.LineToRectangle(lineToPlayer, body)) {
        console.log("line to player success");
      }
    }

  }

  loadNextLevel() {
    this.level++;
    this.loadLevel();
  }

  getEntityManager() {
    return this.entityManager;
  }

  getRoomManager() {
    return this.roomManager;
  }

  getInjuredOrTrappedEnemies() {
    let count = 0;
    let enemies = this.getEntityManager().enemies;
    for(let room of this.getRoomManager().rooms) {
      count+=room.enemyTrappedInRoomCount(enemies);
    }
    for(let enemy of enemies) {
      if(enemy.injured) count++;
    }
    return count;
  }
}