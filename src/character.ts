import CharacterStat, { CharacterMinMaxStat } from './character-stat'

export class Character {
	health: CharacterMinMaxStat;
	gold: CharacterStat;
	attack: CharacterStat;
	defence: CharacterStat;
	drunkenness: CharacterStat;

	constructor() {
		this.health = this.getFromQuerySelector<CharacterMinMaxStat>('character-min-max[label="Health"]', 'health');
		this.gold = this.getFromQuerySelector<CharacterStat>('character-stat[label="Gold"]', 'gold');
		this.attack = this.getFromQuerySelector<CharacterStat>('character-stat[label="Attack"]', 'attack');
		this.defence = this.getFromQuerySelector<CharacterStat>('character-stat[label="Defence"]', 'defence');
		this.drunkenness = this.getFromQuerySelector<CharacterStat>('character-stat[label="Drunkenness"]', 'drunkenness');
	}

	getFromQuerySelector<T extends Element>(selector: string, label: string) {
		const statElement = document.querySelector<T>(selector);
		if (!statElement) {
			throw new Error(`Missing ${label}`);
		}

		return statElement;
	}
}