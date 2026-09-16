import { initialiseRoom } from "./initialisers";
import type { RoomAction as RoomActionData } from "./room-data";

export default class RoomAction extends HTMLElement {
	newRoomId?: string;

	connectedCallback() {
		this.classList.add('button');
		this.addEventListener('click', this.moveRooms);
		
		const roomIdAttr = this.getAttribute('to');
		if (roomIdAttr) {
			this.newRoomId = roomIdAttr;
		}
	}

	build(roomAction: RoomActionData) {
		this.textContent = roomAction.text;
		this.newRoomId = roomAction.id;
	}

	moveRooms() {
		if (!this.newRoomId) {
			console.error('Missing room id');
			return;
		}

		initialiseRoom(this.newRoomId);
	}
}

customElements.define('room-action', RoomAction);
