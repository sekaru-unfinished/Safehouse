import Room from './Room';

export default class {
  constructor(scene, map, interactables) {
    this.map = map;

    this.rooms = [];

    // Load the rooms from the map
    const rooms = this.map.filterObjects("rooms", (value, index, array) => {
      this.rooms = array;
    });

    this.graphics = scene.add.graphics({ fillStyle: { color: 0x0f0c27 } });

    this.rooms = this.rooms.map((room) => {
      // Remap the rooms to make more sense and be renderable
      const roomIdProperty = room.properties.find((property) => property.name == "room");

      const createdRoom = new Room(
        scene,
        room.x,
        room.y,
        room.width,
        room.height,
        roomIdProperty.value,
        this.graphics);

      // Check if the room collides with any interactables and add them to the room if they do
      for (let interactable of interactables) {
        createdRoom.addInteractableIfCollides(interactable);
      }

      return createdRoom;
    })
  }

  revealRoomsForPlayer(player) {
    for (let room of this.rooms) {
      room.shouldRoomRevealForPlayer(player);
    }
  }

  render() {
    this.graphics.clear();
    // Render the rooms
    for (const room of this.rooms) {
      room.render();
    }
  }

  triggerInteractionForRoom(roomId, indexOfInteractable) {
    const room = this.rooms.find((room) => room.id === roomId);
    room.triggerInteractable(indexOfInteractable);
  }

  toggleLightForRoom(roomId) {
    for (let room of this.rooms) {
      room.forceReveal = false;
    }
    this.rooms[roomId].forceReveal = !this.rooms[roomId].forceReveal;
  }
}