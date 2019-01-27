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
    this.load.svg('phone', 'src/assets/images/phone.svg', {
      scale: 1.3
    });
    this.load.svg('speaker_off', 'src/assets/images/icons/speaker_off.svg', {
      scale: 0.8
    });
    this.load.svg('speaker_on', 'src/assets/images/icons/speaker_on.svg', {
      scale: 0.8
    });
    this.load.svg('lock_off', 'src/assets/images/icons/lock_off.svg', {
      scale: 0.8
    });
    this.load.svg('lock_on', 'src/assets/images/icons/lock_on.svg', {
      scale: 0.8
    });
    this.load.svg('light_off', 'src/assets/images/icons/light_off.svg', {
      scale: 0.8
    });
    this.load.svg('light_on', 'src/assets/images/icons/light_on.svg', {
      scale: 0.8
    });
    this.load.svg('boomba_off', 'src/assets/images/icons/boomba_off.svg', {
      scale: 0.8
    });
    this.load.svg('boomba_on', 'src/assets/images/icons/boomba_on.svg', {
      scale: 0.8
    });
    this.load.svg('fridge_off', 'src/assets/images/icons/fridge_off.svg', {
      scale: 0.8
    });
    this.load.svg('fridge_on', 'src/assets/images/icons/fridge_on.svg', {
      scale: 0.8
    });

    this.load.audio('phone', 'src/assets/sounds/phone.ogg');
    this.load.audio('tap', 'src/assets/sounds/tap.wav');
  }

  create() {
    this.phone = this.add.image(0, 0, 'phone');

    const phoneHiddenY = this.sys.game.canvas.height + this.phone.height;
    const phoneActiveY = this.sys.game.canvas.height - this.phone.height / 2 - 20;
    this.phoneContainer = this.add.container(this.phone.width / 2 + 20, phoneHiddenY);
    this.phoneContainer.add(this.phone);

    this.input.keyboard.on('keydown-SPACE', () => {
      if(!this.inGame()) return;
      this.showPhone = !this.showPhone;

      this.sound.add('phone').play();
      if(this.showPhone) this.updateUI();

      this.tweens.add({
        targets: this.phoneContainer,
        y: this.showPhone ? phoneActiveY : phoneHiddenY,
        duration: 400,
        ease: 'Power2'
      });
    }, this);
  }

  updateUI() {
    let gameScene = this.scene.manager.getScene('Game')
    if(gameScene.mapManager) {
      let rooms = gameScene.mapManager.getRoomManager().rooms;
      let count = 0;
      for(let i=0; i<rooms.length; i++) {
        if(rooms[i].interactables.length > 0) {
          count++;
          const y = -this.phone.height/2 - 60 + count*110;

          let text = this.add.text(0, y, `ROOM ${count}`, {
            font: '14px monospace',
            fill: '#000'
          });
          text.setOrigin(0.5, 0);
          this.phoneContainer.add(text);

          const offset = 80;
          for(let j=0; j<rooms[i].interactables.length; j++) {
            switch(rooms[i].interactables[j].type) {
              case "smart_door": 
                this.phoneContainer.add(this.smartDoorIcon((j+1) * offset - (offset * (rooms[i].interactables.length + 1)) /2, y + 20));
                break;
              case "google_home":
                this.phoneContainer.add(this.smartSpeakerIcon((j+1) * offset - (offset * (rooms[i].interactables.length + 1)) /2, y + 20));
                break;
              case "boomba":
                this.phoneContainer.add(this.smartHooverIcon((j+1) * offset - (offset * (rooms[i].interactables.length + 1)) /2, y + 20));
                break;
              case "fridge_no_door":
                this.phoneContainer.add(this.smartFridgeIcon((j+1) * offset - (offset * (rooms[i].interactables.length + 1)) /2, y + 20));
                break;
            }
          }
          this.phoneContainer.add(this.smartLightIcon(-(offset * (rooms[i].interactables.length + 1))/2, y + 20));
        }
      }
    }
  }

  smartDoorIcon(x, y) {
    let icon = this.add.image(x, y, 'lock_off');
    icon.setInteractive().setOrigin(0, 0);
    // icon.x += icon.width / 2;

    icon.on('pointerdown', (pointer, x, y, event) => {
      // icon.setTexture(this.lockOn ? 'lock_on': 'lock_off')
    });

    return icon;
  }

  smartLightIcon(x, y) {
    let icon = this.add.image(x, y, 'light_off');
    icon.setInteractive().setOrigin(0, 0);
    // icon.x += icon.width / 2;

    icon.on('pointerdown', (pointer, x, y, event) => {
      // icon.setTexture(this.lockOn ? 'light_on': 'lock_off')
    });

    return icon;
  }

  smartSpeakerIcon(x, y) {
    let icon = this.add.image(x, y, 'speaker_off');
    icon.setInteractive().setOrigin(0, 0);
    // icon.x += icon.width / 2;

    icon.on('pointerdown', (pointer, x, y, event) => {
      // icon.setTexture(this.lockOn ? 'light_on': 'lock_off')
    });

    return icon;
  }

  smartHooverIcon(x, y) {
    let icon = this.add.image(x, y, 'boomba_off');
    icon.setInteractive().setOrigin(0, 0);
    // icon.x += icon.width / 2;

    icon.on('pointerdown', (pointer, x, y, event) => {
      // icon.setTexture(this.lockOn ? 'light_on': 'lock_off')
    });

    return icon;
  }

  smartFridgeIcon(x, y) {
    let icon = this.add.image(x, y, 'fridge_off');
    icon.setInteractive().setOrigin(0, 0);
    // icon.x += icon.width / 2;

    icon.on('pointerdown', (pointer, x, y, event) => {
      // icon.setTexture(this.lockOn ? 'light_on': 'lock_off')
    });

    return icon;
  }

  inGame() {
    return this.scene.manager.isActive('Game');
  }
}