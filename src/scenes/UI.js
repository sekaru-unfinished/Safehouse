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
      scale: 0.4
    });
    this.load.svg('speaker_on', 'src/assets/images/icons/speaker_on.svg', {
      scale: 0.4
    });
    this.load.svg('lock_off', 'src/assets/images/icons/lock_off.svg', {
      scale: 0.4
    });
    this.load.svg('lock_on', 'src/assets/images/icons/lock_on.svg', {
      scale: 0.4
    });
    this.load.svg('light_off', 'src/assets/images/icons/light_off.svg', {
      scale: 0.4
    });
    this.load.svg('light_on', 'src/assets/images/icons/light_on.svg', {
      scale: 0.4
    });
    this.load.svg('boomba_off', 'src/assets/images/icons/boomba_off.svg', {
      scale: 0.4
    });
    this.load.svg('boomba_on', 'src/assets/images/icons/boomba_on.svg', {
      scale: 0.4
    });
    this.load.svg('fridge_off', 'src/assets/images/icons/fridge_off.svg', {
      scale: 0.4
    });
    this.load.svg('fridge_on', 'src/assets/images/icons/fridge_on.svg', {
      scale: 0.4
    });

    this.load.audio('phone', 'src/assets/sounds/phone.ogg');
    this.load.audio('tap', 'src/assets/sounds/tap.wav');
  }

  create() {
    this.phone = this.add.image(0, 0, 'phone');
    this.phoneHiddenY = this.sys.game.canvas.height + this.phone.height;
    this.phoneActiveY = this.sys.game.canvas.height - this.phone.height / 2 - 20;
    this.createPhone();

    this.input.keyboard.on('keydown-SPACE', () => {
      if(!this.inGame()) return;
      this.showPhone = !this.showPhone;

      this.sound.add('phone').play();
      if(this.showPhone) this.updateUI();

      this.tweens.add({
        targets: this.phoneContainer,
        y: this.showPhone ? this.phoneActiveY : this.phoneHiddenY,
        duration: 400,
        ease: 'Power2'
      });
    }, this);
  }

  createPhone() {
    this.phoneContainer = this.add.container(this.phone.width / 2 + 60, this.phoneHiddenY);
    this.phoneContainer.add(this.phone);

    this.enemiesLeftText = this.add.text(0, 0, "Intruders remaining: ?", {
      font: '12px monospace',
      fill: '#ffffff'
    });
    this.enemiesLeftText.setOrigin(0.5, 0.5);
    this.enemiesLeftText.y -= 290;
    this.phoneContainer.add(this.enemiesLeftText);
  }

  updateUI() {
    let gameScene = this.scene.manager.getScene('Game');
 
    if(gameScene.mapManager && !this.uiSet) {
      this.uiSet = true;

      let rooms = gameScene.mapManager.getRoomManager().rooms;
      let count = 0;
      for(let i=0; i<rooms.length; i++) {
        count++;
        const y = -this.phone.height/2  + count*60;

        let text = this.add.text(0, y, `ROOM ${count}`, {
          font: '14px monospace',
          fill: '#000'
        });
        text.setOrigin(0.5, 0);
        this.phoneContainer.add(text);

        const offset = 35;
        if(rooms[i].interactables.length > 0) {
          for(let j=0; j<rooms[i].interactables.length; j++) {
            const displayX = (j+1) * offset - ((offset * (rooms[i].interactables.length + 1.3)) / 2);
            switch(rooms[i].interactables[j].type) {
              case "smart_door": 
                this.phoneContainer.add(this.smartDoorIcon(displayX, y + 20, rooms[i].id, j));
                break;
              case "google_home":
                this.phoneContainer.add(this.smartSpeakerIcon(displayX, y + 20, rooms[i].id, j));
                break;
              case "boomba":
                this.phoneContainer.add(this.smartHooverIcon(displayX, y + 20, rooms[i].id, j));
                break;
              case "fridge_no_door":
                this.phoneContainer.add(this.smartFridgeIcon(displayX, y + 20, rooms[i].id, j));
                break;
            }
          }
          
        }
        this.phoneContainer.add(this.smartLightIcon(-(offset * (rooms[i].interactables.length + 1.3))/2, y + 20, rooms[i].id));
      }
    }
  }

  smartDoorIcon(x, y, roomId, indexOfInteractable) {
    let icon = this.add.image(x, y, 'lock_off');
    icon.setInteractive().setOrigin(0, 0);
    icon.on('pointerdown', (pointer, x, y, event) => {
      let gameScene = this.scene.manager.getScene('Game');
      gameScene.mapManager.getRoomManager().triggerInteractionForRoom(roomId, indexOfInteractable, icon);
    });

    return icon;
  }

  smartLightIcon(x, y, roomId) {
    let icon = this.add.image(x, y, 'light_off');
    icon.setInteractive().setOrigin(0, 0);
    icon.on('pointerdown', (pointer, x, y, event) => {
      let gameScene = this.scene.manager.getScene('Game');
      gameScene.mapManager.getRoomManager().toggleLightForRoom(roomId, icon);
      icon.setTexture('light_on');
    });

    return icon;
  }

  smartSpeakerIcon(x, y, roomId, indexOfInteractable) {
    let icon = this.add.image(x, y, 'speaker_off');
    icon.setInteractive().setOrigin(0, 0);
    icon.on('pointerdown', (pointer, x, y, event) => {
      icon.setTexture('speaker_on');
      let gameScene = this.scene.manager.getScene('Game');

      const timer = setInterval(() => {
        gameScene.mapManager.getRoomManager().triggerLureForRoom(roomId, indexOfInteractable, gameScene.mapManager.getEntityManager().enemies);
      }, 1000);

      setTimeout(() => {
        icon.setTexture('speaker_off');
        clearInterval(timer);
      }, 5000);
     
    });

    return icon;
  }

  smartHooverIcon(x, y, roomId, indexOfInteractable) {
    let icon = this.add.image(x, y, 'boomba_off');
    icon.setInteractive().setOrigin(0, 0);
    icon.on('pointerdown', (pointer, x, y, event) => {
      let gameScene = this.scene.manager.getScene('Game');
      gameScene.mapManager.getRoomManager().triggerInteractionForRoom(roomId, indexOfInteractable);
      icon.setTexture('boomba_on');

      setTimeout(() => {
        icon.setTexture('boomba_off');
      }, 1000);
    });

    return icon;
  }

  smartFridgeIcon(x, y, roomId, indexOfInteractable) {
    let icon = this.add.image(x, y, 'fridge_off');
    icon.setInteractive().setOrigin(0, 0);
    icon.on('pointerdown', (pointer, x, y, event) => {
      icon.setTexture('fridge_on');
    });

    return icon;
  }

  inGame() {
    return this.scene.manager.isActive('Game');
  }

  update() {
    if(!this.inGame() && this.showPhone) {
      this.showPhone = false;
      this.phone.destroy();
      this.enemiesLeftText.destroy();
      this.phoneContainer.destroy();

      this.phone = this.add.image(0, 0, 'phone');
      this.createPhone();
      this.uiSet = false;
    }
  }
}