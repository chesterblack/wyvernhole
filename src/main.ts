import { initialiseRoom } from './initialisers.ts';
import { getCookie } from './utils.ts';

export * from './dialogue-speaker.ts';
export * from './typewriter';

document.addEventListener('DOMContentLoaded', async () => {
  // const lastRoom = getCookie('lastroom');
  // initialiseRoom(lastRoom ?? '1');

  initialiseRoom('1');
});