import { initialiseRoom } from "./initialisers";
import type { RoomAction as RoomActionData } from "./room-data";
import { setFromAttribute } from "./utils";

export default class RoomAction extends HTMLElement {
	newRoomId?: string;

	connectedCallback() {
		this.classList.add('button');
		this.addEventListener('click', this.moveRooms);
		
		setFromAttribute(this, 'to', 'newRoomId');
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
