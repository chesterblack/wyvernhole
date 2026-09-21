import type { Character } from './character';
import type { RoomId } from './room-data';
import { getCookie } from './utils';

export type SaveFile = {
	roomId: RoomId;
	stats: {
		health: {
			value: number;
			max: number;
		};
		gold: number;
		attack: number;
		defence: number;
		drunkenness: number;
	};
};


export const freshSave: SaveFile = {
	roomId: '1',
	stats: {
		health: {
			value: 100,
			max: 100
		},
		gold: 50,
		attack: 0,
		defence: 0,
		drunkenness: 0
	}
}


export function constructSaveFile(character: Character, roomId: RoomId): SaveFile {
	return {
		roomId,
		stats: character.getStatValues()
	}
}


export function loadGameLocal(): SaveFile {
	const saveFileString = getCookie('savedgame');
	return saveFileString ? JSON.parse(saveFileString) : freshSave;
}


export function saveGameLocal(saveFile: SaveFile) {
	document.cookie = `savedgame=${JSON.stringify(saveFile)};path=/`;
}


function saveGameFile(saveFile: SaveFile) {
	const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveFile));
	const downloadEl = document.createElement('a');
	downloadEl.setAttribute("href", data);
	downloadEl.setAttribute("download", "savefile.wyvhl");
	document.body.appendChild(downloadEl);
	downloadEl.click();
	downloadEl.remove();
}
