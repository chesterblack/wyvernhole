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

export class SaveController {
	static freshSave: SaveFile = {
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

	saveFile: SaveFile = SaveController.freshSave;

	shouldAutosave: boolean = true;

	constructor() {
		this.addAutosaveButtonListener();
		this.setAutosaveLabel();
	}

	addAutosaveButtonListener() {
		const autosaveButton = document.querySelector('.toggle-autosave');

		if (!autosaveButton) return;

		autosaveButton.addEventListener('click', () => {
			this.toggleAutosave();
		});
	}

	setAutosaveListener(character: Character) {
		const callback = ({detail: roomId}: CustomEvent<string>) => {
			if (this.shouldAutosave) {
				const saveFile = this.constructSaveFile(character, roomId);
				this.saveGame(saveFile);
			}
		};
		window.addEventListener('room-moved', callback as EventListener);
	}

	toggleAutosave() {
		this.shouldAutosave = !this.shouldAutosave;
		this.setAutosaveLabel();
		this.saveGame(this.saveFile);
	}
	
	setAutosaveLabel() {
		const autosaveLabel = document.querySelector('.autosave-label');

		if (!autosaveLabel) return;

		autosaveLabel.textContent = this.shouldAutosave ? 'On' : 'Off';
	}

	constructSaveFile(character: Character, roomId: RoomId): SaveFile {
		return {
			roomId,
			stats: character.getStatValues()
		}
	}
	
	loadGame() {
		return this.loadGameLocal();
	}

	loadGameLocal(): SaveFile {
		const saveFileString = getCookie('savedgame');
		this.saveFile = saveFileString ? JSON.parse(saveFileString) : SaveController.freshSave;
		return this.saveFile;
	}

	saveGame(saveFile: SaveFile) {
		this.saveGameLocal(saveFile);
	}

	saveGameLocal(saveFile: SaveFile) {
		document.cookie = `savedgame=${JSON.stringify(saveFile)};path=/`;
		this.saveFile = saveFile;
	}

	saveGameFile(saveFile: SaveFile) {
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveFile));
		const downloadEl = document.createElement('a');
		downloadEl.setAttribute("href", data);
		downloadEl.setAttribute("download", "savefile.wyvhl");
		document.body.appendChild(downloadEl);
		downloadEl.click();
		downloadEl.remove();
	}
}

