import Phaser from "phaser";

export default class UI extends Phaser.Scene {
  constructor() {
    super({ key: 'UI', active: true });

    this.phoneContainer = null;
    this.showPhone = false;
    this.phone = null;
    this.speakerOn = false;
  }

  preload() {
    this.load.image('phone', 'src/assets/images/phone.png');
    this.load.image('speaker_off', 'src/assets/images/icons/speaker_off.svg');
    this.load.image('speaker_on', 'src/assets/images/icons/speaker_on.svg');
  }

  create() {
    this.phone = this.add.image(0, 0, 'phone');
    this.phone.setScale(0.75);

    let speaker = this.add.image(0, 0, 'speaker_off').setInteractive();

    const phoneHiddenY = this.sys.game.canvas.height + this.phone.height;
    const phoneActiveY = this.sys.game.canvas.height - this.phone.height / 2 + 30;
    this.phoneContainer = this.add.container(this.phone.width / 2, phoneHiddenY);

    this.phoneContainer.add([
      this.phone,
      speaker
    ]);

    speaker.on('pointerdown', (pointer, x, y, event) => {
      this.speakerOn = !this.speakerOn;
      speaker.setTexture(this.speakerOn ? 'speaker_on': 'speaker_off')
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      if(!this.inGame()) return;
      this.showPhone = !this.showPhone;
      this.tweens.add({
        targets: this.phoneContainer,
        y: this.showPhone ? phoneActiveY : phoneHiddenY,
        duration: 400,
        ease: 'Power2'
      });
    }, this);
  }

  inGame() {
    return this.scene.manager.isActive('Game');
  }
}