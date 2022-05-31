interface Attributes {
	ancestryHp: number;
	classHp: number;
	bonusHp: number;
	bonusHpPerLevel: number;
	speed: number;
	speedBonus: number;
}

interface Abilities {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
}

interface Proficiencies {
	classDC: number;
	perception: number;
	fortitude: number;
	reflex: number;
	will: number;
	heavy: number;
	medium: number;
	light: number;
	unarmored: number;
	advanced: number;
	martial: number;
	simple: number;
	unarmed: number;
	castingArcane: number;
	castingDivine: number;
	castingOccult: number;
	castingPrimal: number;
	acrobatics: number;
	arcana: number;
	athletics: number;
	crafting: number;
	deception: number;
	diplomacy: number;
	intimidation: number;
	medicine: number;
	nature: number;
	occultism: number;
	performance: number;
	religion: number;
	society: number;
	stealth: number;
	survival: number;
	thievery: number;
}

type Feat = any[];
type Lore = any[];
type Equipment = any[];

interface SpecificProficiencies {
	trained: unknown[];
	expert: unknown[];
	master: unknown[];
	legendary: unknown[];
}

interface Weapon {
	name: string;
	qty: number;
	prof: string;
	die: string;
	pot: number;
	str: string;
	mat: null | unknown;
	display: string;
	runes: unknown[];
}

interface Money {
	pp: number;
	gp: number;
	sp: number;
	cp: number;
}

interface SpellGroup {
	spellLevel: number;
	list: string[];
}

interface SpellCaster {
	name: string;
	magicTradition: string;
	spellcastingType: string;
	ability: string;
	proficiency: number;
	focusPoints: number;
	spells: SpellGroup[];
	perDay: number[];
}

interface Pet {
	type: string;
	name: string;
	specific: null | unknown;
	abilities: unknown[];
}

interface ArmorClassTotal {
	acProfBonus: number;
	acAbilityBonus: number;
	acItemBonus: number;
	acTotal: number;
}

interface PathBuilder2ECharacter {
	name: string;
	class: string;
	level: number;
	ancestry: string;
	heritage: string;
	background: string;
	alignment: string;
	gender: string;
	age: string;
	deity: string;
	size: number;
	keyAbility: string;
	languages: string[];
	attributes: Attributes;
	abilities: Abilities;
	proficiencies: Proficiencies;
	feats: Feat[];
	specials: string[];
	lores: Lore[];
	equipment: Equipment[];
	specificProficiencies: SpecificProficiencies;
	weapons: Weapon[];
	money: Money;
	armor: unknown[];
	spellCasters: SpellCaster[];
	formula: unknown[];
	pets: Pet[];
	acTotal: ArmorClassTotal;
}
