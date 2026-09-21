import DialogueSpeaker from './dialogue-speaker';
import Typewriter from './typewriter';
import { roomData, type RoomId } from './room-data';
import RoomAction from './room-action';
import { Character } from './character';
import type CharacterStat from './character-stat';
import { CharacterMinMaxStat } from './character-stat';
import type { SaveController, SaveFile } from './save-load';

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

	if (!root || !room.actions) return;

	room.actions.forEach((action) => {
		const roomAction = new RoomAction;
		roomAction.build(action);
		root.appendChild(roomAction);
	});
}

function initialiseStats(stats: SaveFile['stats']) {
	const statElements: Record<keyof SaveFile['stats'], CharacterMinMaxStat|CharacterStat|null> = {
		health: document.querySelector<CharacterMinMaxStat>('character-min-max[label="Health"]'),
		gold: document.querySelector<CharacterStat>('character-stat[label="Gold"]'),
		attack: document.querySelector<CharacterStat>('character-stat[label="Attack"]'),
		defence: document.querySelector<CharacterStat>('character-stat[label="Defence"]'),
		drunkenness: document.querySelector<CharacterStat>('character-stat[label="Drunkenness"]'),
	}

	const keys = Object.keys(stats) as (keyof typeof stats)[];
	for (const key of keys) {
		const element = statElements[key];
		if (!element) {
			continue;
		}

		switch (typeof stats[key]) {
			case 'object':
				element.setAttribute('max', stats[key].max.toString());
				element.setAttribute('value', stats[key].value.toString());
				break;
			case 'number':
				element.setAttribute('value', stats[key].toString());
				break;
		}

		element.setAttributes();
		element.build();
	}
}

function initialiseCharacter() {
	const character = new Character();
	return character;
}

function clearRoom() {
	[
		document.querySelector('.narrator'),
		document.querySelector('.dialogue'),
		document.querySelector('.actions')
	].forEach((container) => {
		if (!container) return;
		container.innerHTML = '';
	});
}

export async function initialiseRoom(roomId: RoomId) {
	document.cookie = `lastroom=${roomId};path=/`;
	clearRoom();
	await initialiseNarrator(roomId);
	await initialiseDialogue(roomId);
	initialiseActions(roomId);
	window.dispatchEvent(new CustomEvent('room-moved', {detail: roomId}));
}

export async function initialiseGame(saveController: SaveController) {
	const saveFile = saveController.loadGame();

	initialiseStats(saveFile.stats);
	const character = initialiseCharacter();
	saveController.setAutosaveListener(character);
	await initialiseRoom(saveFile.roomId);

	return {character};
}