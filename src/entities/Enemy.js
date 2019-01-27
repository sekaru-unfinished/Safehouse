export default class extends Phaser.Physics.Matter.Sprite {
    constructor(config, sceneContext) {
        super(config.scene.matter.world, config.x, config.y, 'enemy');
        this.config = config;

        this.scene = config.scene;
        this.scene.add.existing(this);

        this.sceneContext = sceneContext;

        this.path = config.path;
        this.moving = false;

        this.currentPathPointIndex = 0;
        this.alerted = false;

        this.speed = 0.5;
        this.enemyAngle = this.shownAngle = 0;

        this.player = config.player;
        this.spottedPlayer = false;

        this.setDepth(3);
        
        setTimeout(() => {
            this.spottedPlayer = true;
            this.spotPlayer();
        }, 5000);

        this.investigateLure();
    }

    spotPlayer() {
        this.anims.stop('enemy');
        this.anims.play('enemy-shoot');
        this.on('animationupdate', this.shootAnimUpdate, this);

        let rads = Phaser.Math.Angle.BetweenPoints(
            new Phaser.Geom.Point(this.x, this.y),
            new Phaser.Geom.Point(this.player.x, this.player.y)
        )
        this.enemyAngle = rads * (180 / Math.PI);
    }

    shootAnimUpdate(animation, frame, gameobject, sceneContext) {
        if(frame.index === 8) {
            this.scene.sound.add('pistol').play();

            let bullet = this.scene.add.image(this.x, this.y, 'bullet');
            bullet.setRotation(
                Phaser.Math.Angle.BetweenPoints(
                    new Phaser.Geom.Point(this.x, this.y),
                    new Phaser.Geom.Point(this.player.x, this.player.y)
                )
            )
            this.scene.tweens.add({
                targets: bullet,
                x: this.player.x,
                y: this.player.y,
                duration: 150,
                onComplete: this.destroyBullet,
                onCompleteParams: [this]
            });
        }
    }

    destroyBullet(tween, gameObjects, sceneContext) {
        gameObjects[0].scene.sound.stopAll();
        sceneContext.sceneContext.scene.switch('LoseScene');

        gameObjects[0].scene.tweens.add({
            targets: gameObjects[0],
            alpha: 0,
            duration: 200
        });
    }

    investigateLure() {
        let lureX = 110;
        let lureY = 220;


        let shortestPoint; 
        
        for(let point of this.path){
            let distancePathPointToLure =  Phaser.Math.Distance.Between(lureX, lureY, point.x, point.y);

            if(shortestPoint == null){
                shortestPoint = {
                    point: point, distance: distancePathPointToLure
                };
            }else{
                if(shortestPoint.distance > distancePathPointToLure){
                    shortestPoint = {
                        point: point, distance: distancePathPointToLure
                    };
                }
            }
        }

        this.shortestPointToLure = shortestPoint.point;
        this.targetLure = {x: lureX, y: lureY};
  
        // for (let point of this.path) {
        //     if (point !== null) {
        //         let pointDistance = {}
        //         let enemyX = this.config.x;
        //         let enemyY = this.config.y;
    
        //         let distancePathPointToLure = this.getDistanceBetweenPathPointToLure(lureX, lureY, point, enemyX, enemyY);
        //         pointDistance.id = point.id;
        //         pointDistance.distance = distancePathPointToLure;
        //         pointDistance.coords = point.distance;

        //         distances.push(pointDistance);

        //         let shortestDistance = this.getShortestDistanceToLure(distances, enemyX, enemyY);
        //         console.log(shortestDistance);
        //     }
        // }
    }

    getDistanceBetweenPathPointToLure(lureX, lureY, point) {
        let pointX = point.x;
        let pointY = point.y;

        return Phaser.Math.Distance.Between(lureX, lureY, pointX, pointY);
    }

    getShortestDistanceToLure(distances, enemyX, enemyY) {
        let shortestDistance = {id: null, distance: null};
        let enemyFromLure = Phaser.Math.Distance.Between(distances.coords.x, distances.coords.y, enemyX, enemyY);

        for (let dist of distances) {
            shortestDistance.id = dist.id;
            shortestDistance.distance = dist.distance;

            if (shortestDistance && ( dist.distance < shortestDistance.distance )) {
                shortestDistance.id = dist.id;
                shortestDistance.distance = dist.distance;
            }
        }

        return shortestDistance;
    }

    update() {
        // Follow the path
        this.setVelocityX(0);
        this.setVelocityY(0);
        const currentPathPoint = this.path.find((point) => point.id === this.currentPathPointIndex);
        let moving = false;

        this.shownAngle += (((((this.enemyAngle - this.shownAngle) % 360) + 540) % 360) - 180) * 0.1;
        this.setAngle(this.shownAngle);

        if(this.spottedPlayer) return;
        if (currentPathPoint) {


            const distanceToCurrentPoint =
                Phaser.Math.Distance.Between(
                    currentPathPoint.x,
                    currentPathPoint.y,
                    this.x,
                    this.y);

            if(this.movingToLure){
                let rads = Phaser.Math.Angle.BetweenPoints(
                    new Phaser.Geom.Point(this.x, this.y),
                    new Phaser.Geom.Point(this.targetLure.x, targetLure.y)
                )
                this.enemyAngle = rads * (180 / Math.PI);
                // Make a beeline to the lure
                const speed = this.speed;
                if (this.targetLure.x < this.x) {
                    this.setVelocityX(-speed);
                } else if (this.targetLure.x > this.x) {
                    this.setVelocityX(speed);
                }

                if (this.targetLure.y < this.y) {
                    this.setVelocityY(-speed);
                } else if (this.targetLure.y > this.y) {
                    this.setVelocityY(speed);
                }
            }else{
                let rads = Phaser.Math.Angle.BetweenPoints(
                    new Phaser.Geom.Point(this.x, this.y),
                    new Phaser.Geom.Point(currentPathPoint.x, currentPathPoint.y)
                )
                this.enemyAngle = rads * (180 / Math.PI);
            }

            if (distanceToCurrentPoint > 5) {
                moving = true;
                const speed = this.speed;
                if (currentPathPoint.x < this.x) {
                    this.setVelocityX(-speed);
                } else if (currentPathPoint.x > this.x) {
                    this.setVelocityX(speed);
                }

                if (currentPathPoint.y < this.y) {
                    this.setVelocityY(-speed);
                } else if (currentPathPoint.y > this.y) {
                    this.setVelocityY(speed);
                }
            } else {
                if(this.shortestPointToLure && this.shortestPointToLure.id == currentPathPointIndex){
                    // If our shortesPointToLure is the same as the current point
                    
                    // Move to the lure now we have reached the shortest point
                    this.movingToLure = true;
                }

                if (currentPathPoint.finalPoint) {
                    this.currentPathPointIndex = 0;
                    moving = false;
                } else {
                    this.currentPathPointIndex++;
                    moving = false;
                }

            }
        }

        if (moving) {
            this.anims.play('enemy', true);

        } else {
            this.anims.stop('enemy');
        }

        if (!this.alerted) {
            // Follow the path
        }
    }
}