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
    }

    shouldRoomRevealForPlayer(player) {
        if (Phaser.Geom.Rectangle.Overlaps(player.getBounds(), this.overlay)) {
            this.showRoom = false;
        } else {
            this.showRoom = true;
        }
    }

    render() {
        const target = this.showRoom ? 1 : 0;
        this.shownAlpha += (target - this.shownAlpha) * 0.2;
        this.graphics.fillStyle(0x26243c, this.shownAlpha);

        this.graphics.fillRectShape(this.overlay);
    }
}