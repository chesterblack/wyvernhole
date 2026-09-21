import { initialiseGame } from './initialisers';
import { constructSaveFile, loadGameLocal, saveGameLocal } from './save-load.ts';

export * from './dialogue-speaker';
export * from './typewriter';
export * from './character-stat';


document.addEventListener('DOMContentLoaded', async () => {
	const {character} = await initialiseGame(loadGameLocal());

	const callback = ({detail: roomId}: CustomEvent<string>) => {
		const saveFile = constructSaveFile(character, roomId);
		saveGameLocal(saveFile);
	};
	window.addEventListener("room-moved", callback as EventListener);
});