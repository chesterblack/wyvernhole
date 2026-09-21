import { initialiseGame } from './initialisers';
import { SaveController } from './save-load.ts';

export * from './dialogue-speaker';
export * from './typewriter';
export * from './character-stat';

document.addEventListener('DOMContentLoaded', async () => {
	const saveController = new SaveController;
	initialiseGame(saveController);
});