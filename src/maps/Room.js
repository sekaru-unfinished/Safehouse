export default class {

    constructor(scene, x, y, width, height, id, graphics) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.scene = scene;

        this.graphics = graphics;
        this.graphics.setDepth(4);
        this.overlay = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
        this.shownAlpha = 1;

        this.interactables = [];
    }

    shouldRoomRevealForPlayer(player) {
        if (Phaser.Geom.Rectangle.Overlaps(player.getBounds(), this.overlay)) {
            this.showRoom = true;
        } else {
            this.showRoom = false;
        }
    }

    addInteractableIfCollides(interactable){
    	if(interactable){   
	    	if (Phaser.Geom.Rectangle.Overlaps(interactable.getBounds(), this.overlay)) {
            	this.interactables.push(interactable);
        	}
    	}
    }

    render() {
        const target = (this.showRoom || this.forceReveal) ? 0 : 1;
        this.shownAlpha += (target - this.shownAlpha) * 0.2;
        this.graphics.fillStyle(0x26243c, this.shownAlpha);

        this.graphics.fillRectShape(this.overlay);
    }

    triggerInteractable(indexOfInteractable){
      const interactable = this.interactables[indexOfInteractable];
      interactable.trigger();
    }
}