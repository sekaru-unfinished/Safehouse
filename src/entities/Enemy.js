
export default class extends Phaser.Physics.Matter.Sprite {

   constructor(config) {
        super(config.scene.matter.world, config.x, config.y, 'enemy');
        this.scene = config.scene;
        this.scene.add.existing(this);
 
        this.path = config.path;
        this.moving = false;

        this.currentPathPointIndex = 0;
        this.alerted = false;
        
        // Set the current position to be the current path
        const currentPathPoint = this.path.find((point) => point.id === this.currentPathPointIndex);
        this.x = currentPathPoint.x;
        this.y = currentPathPoint.y;
        this.currentPathPointIndex++;

        this.speed = 3;
    }

   	update(){
   		// Follow the path
      this.setVelocityX(0);
      this.setVelocityY(0);
   		const currentPathPoint = this.path.find((point) => point.id === this.currentPathPointIndex);
   			
   		if(currentPathPoint){

		   	const distanceToCurrentPoint = 
   				Phaser.Math.Distance.Between(
	   			currentPathPoint.x, 
	   			currentPathPoint.y,
	   			this.x,
	   			this.y);

        if(distanceToCurrentPoint > 5){
        
          const speed = this.speed;
          if(currentPathPoint.x < this.x){
            this.setVelocityX(-speed);
          }else if(currentPathPoint.x > this.x){
            this.setVelocityX(speed);
          }

          if(currentPathPoint.y < this.y){
            this.setVelocityY(-speed);
          }else if(currentPathPoint.y > this.y){
            this.setVelocityY(speed);
          }
        }else{
          if(currentPathPoint.finalPoint){
            this.currentPathPointIndex = 0;
          }else{
            this.currentPathPointIndex++;
          }

        }
   		}

      const moving = this.velocity.x > 0 || this.velocity.y > 0;

   		if(moving){
	        this.anims.play('enemy', true);
   		}else{
   			this.anims.stop('enemy');
   		}

   		if(!this.alerted){
   			// Follow the path
   		
   		}


   	}
}