import { initialiseGame, type SaveFile } from './initialisers.ts';

export * from './dialogue-speaker.ts';
export * from './typewriter';
export * from './character-stat';


document.addEventListener('DOMContentLoaded', async () => {
	// const lastRoom = getCookie('lastroom');
	// initialiseRoom(lastRoom ?? '1');

	const freshSave: SaveFile = {
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

	initialiseGame(freshSave)
});