import CharacterStat, { CharacterMinMaxStat } from './character-stat';
import { freshSave, type SaveFile } from './save-load';

export function getCookie(cookieName: string) {
	return document.cookie.split(";").find(i => i.trim().startsWith(cookieName))?.split("=")[1];
}

export function setFromAttribute(
	parent: { getAttribute: (name: string) => string|null, [key: string]: any },
	attrName: string,
	paramName: string = attrName,
	transform: (value: string) => any = v => v
) {
	const value = parent.getAttribute(attrName);
	if (value !== null && typeof parent[paramName] !== 'undefined') {
		parent[paramName] = transform(value);
	}
}

export function toBoolean(value: any) {
	if (value === 'false') {
		return false;
	}

	return !!value;
}

export function getAllStats() {
	const health = getStatFromQuerySelector<CharacterMinMaxStat>('character-min-max[label="Health"]', 'health');
	const gold = getStatFromQuerySelector<CharacterStat>('character-stat[label="Gold"]', 'gold');
	const attack = getStatFromQuerySelector<CharacterStat>('character-stat[label="Attack"]', 'attack');
	const defence = getStatFromQuerySelector<CharacterStat>('character-stat[label="Defence"]', 'defence');
	const drunkenness = getStatFromQuerySelector<CharacterStat>('character-stat[label="Drunkenness"]', 'drunkenness');

	return {health, gold, attack, defence, drunkenness};
}

export function getStatFromQuerySelector<T extends Element>(selector: string, label: string) {
	const statElement = document.querySelector<T>(selector);
	if (!statElement) {
		throw new Error(`Missing ${label}`);
	}

	return statElement;
}

export function getAllStatValues() {
	const statElements = getAllStats();
	const stats: SaveFile['stats'] = freshSave.stats;

	const keys = Object.keys(statElements) as (keyof typeof statElements)[];
	for (const key of keys) {
		const element = statElements[key];
		if (typeof stats[key] === 'number') {
			stats[key] = parseInt(element.getAttribute('value') ?? '0');
		}

		switch (typeof stats[key]) {
			case 'object':
				stats[key] = {
					max: parseInt(element.getAttribute('max') ?? '0'),
					value: parseInt(element.getAttribute('value') ?? '0')
				};
				break;
			case 'number':
				break;
		}
	}
}