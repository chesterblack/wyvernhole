import DialogueSpeaker from './dialogue-speaker';
import Typewriter from './typewriter';
import { roomData, type RoomId } from './room-data';
import RoomAction from './room-action';


function initialiseNarrator(roomId: RoomId) {
	const root = document.querySelector('.narrator');
	const room = roomData[roomId];

	const promise = new Promise<void>((resolve) => {
		if (!root || !room.message) {
			resolve();
			return;
		}

		const typewriter = new Typewriter;
		typewriter.build(room.message);
		root.appendChild(typewriter);
		typewriter.type();

		typewriter.addEventListener('finished', () => {
			resolve();
		});
	});

	return promise;
}

async function initialiseDialogue(roomId: RoomId) {
	const root = document.querySelector('.dialogue');
	const room = roomData[roomId];

	const promise = new Promise<void>(async (resolve) => {
		if (!root || !room.dialogue) {
			resolve();
			return;
		}

		for (const statement of room.dialogue) {
			const dialogueSpeaker = new DialogueSpeaker();
			dialogueSpeaker.build(statement);
			root.appendChild(dialogueSpeaker);
			await initialiseStatement(dialogueSpeaker);
		}

		resolve();
	});

	return promise;
}

function initialiseStatement(dialogueSpeaker: DialogueSpeaker) {
	const promise = new Promise<void>((resolve) => {
		dialogueSpeaker.addEventListener('finished', () => {
			resolve();
		});
		dialogueSpeaker.runMessage();
	});

	return promise;
}

function initialiseActions(roomId: RoomId) {
	const root = document.querySelector('.actions');
	const room = roomData[roomId];

	if (!root || !room.actions) {
		return;
	}

	room.actions.forEach((action) => {
		const roomAction = new RoomAction;
		roomAction.build(action);
		root.appendChild(roomAction);
	});
}

function clearRoom() {
	[
		document.querySelector('.narrator'),
		document.querySelector('.dialogue'),
		document.querySelector('.actions')
	].forEach((container) => {
		if (!container) {
			return;
		}
		container.innerHTML = '';
	});
}

export async function initialiseRoom(roomId: RoomId) {
	document.cookie = `lastroom=${roomId};path=/`;
	clearRoom();
	await initialiseNarrator(roomId);
	await initialiseDialogue(roomId);
	initialiseActions(roomId);
}