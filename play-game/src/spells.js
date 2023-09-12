import { flora, fauna, mineral, rite, divination, symbol, trance, demon, deity, numen } from './ingredients.js';


// SPELLS OBJECTS

class Spell {
    constructor(name, description, type, numen, ...ingredients) {
        this.name = name;
        this.id = `${this.name.slice(0, 3).toLowerCase()}CastButton`;
        this.description = description;
        this.ingredients = ingredients;
        this.type = type;
        this.numen = numen;
        this.canCast = true;
    }
    cast() {
        console.log(this)
    }
    render(query) {
        return (
            `<div class="spell">
                <div class="spell-info">
                    <h4 class="${this.type}">${this.name}</h4>
                    ${this.ingredients.map(ingredient =>
                `<img alt="${ingredient.name}" src="${ingredient.icon}" class="ingredient ${ingredient.amount < 1 && 'no-have'}"></img>`).join('')}
                </div>
                <div class="spell-description">
                    <p style="max-width: ${(this.ingredients.length * 2.75 + 5)}rem">${this.description}</p>
                    ${query === 'can cast' ? `<button id="${this.id}" class="cast-button">Cast</button>` : ``}
                </div>
            </div>`
        )
    };
}

// STANDARD GAME SPELLS

export const potion = new Spell('Potion', 'Add Influence', 'influence', 0, flora, fauna);
export const incantation = new Spell('Incantation', 'Add Influence', 'influence', 0, rite, divination);
export const evocation = new Spell('Evocation', 'Add Influence', 'influence', 0, trance, demon);
export const counterspell = new Spell(
    'Counterspell',
    'Remove effect of any enduring spell (Protections or curse)',
    'protection',
    0,
    fauna, divination, deity
);
export const changeling = new Spell(
    'Changeling',
    'Subtract one accusation.',
    'protection',
    0,
    fauna, rite
);
export const witchesLadder = new Spell(
    'Witches\' Ladder',
    'Hide number on influences. (Change all instances of the chosen number to 0)',
    'protection',
    0,
    flora, symbol
);
export const sigil = new Spell(
    'Sigil',
    'Add number of choice to one opponent\'s influence',
    'curse',
    0,
    symbol, demon
);
export const seance = new Spell(
    'Seance',
    'Gain one specific ingredient',
    'other',
    0,
    mineral, divination, trance
);
export const supplication = new Spell(
    'Supplication',
    'Gain two ingredients. The ingredients must be different and cannot be your innate ingredient. Can only cast once per turn.',
    'other',
    0,
    divination, deity
);
export const elixirOfImmortality = new Spell(
    'Elixir of Immortality',
    'Come back to life after death.',
    'other',
    0,
    mineral, symbol, deity
);
export const sabbat = new Spell(
    'Sabbat',
    'Double influence. This influence is worth two, and any earth energy on this space is worth double.',
    'influence',
    1,
    flora, mineral, symbol
);
export const astralProjecttion = new Spell(
    'Astral Projection',
    'Move one influence up to two spaces',
    'influence',
    1,
    flora, deity
);
export const evilEye = new Spell(
    'Evil Eye',
    'Look at one earth energy token\'s value, then move it to any adjacent space.',
    'influence',
    1,
    flora, divination, trance
);
export const talisman = new Spell(
    'Talisman',
    'Protect one influence from curses.',
    'protection',
    1,
    fauna, symbol, deity
);
export const lovePotion = new Spell(
    'Love Potion',
    'Move one accusation from you to opponent.',
    'protection',
    1,
    mineral, rite, trance
);
export const conjurationOfFlame = new Spell(
    'Conjuration of Flame',
    'Destroy any influence (Double influence becomes single)',
    'curse',
    1,
    flora, rite, demon
);
export const hexBag = new Spell(
    'Hex Bag',
    'Place hex bag token on opponent\'s influence. At the end of the game, gain all earth energy points on that influence.',
    'curse',
    1,
    rite, symbol, trance
);
export const voodooDoll = new Spell(
    'Voodoo Doll',
    'Look at opponent\'s hand and take two cards. Opponent discards all remaining cards.',
    'curse',
    1,
    divination, demon, trance
);
export const friendshipCharm = new Spell(
    'Friendship Charm',
    'Steal one opponent\'s familiar',
    'curse',
    1,
    fauna, mineral, trance
);
export const lunarOration = new Spell(
    'Lunar Oration',
    'Remove numbers on all influences in one numen. (change to 0)',
    'protection',
    2,
    flora, fauna, deity
);
export const witchesChant = new Spell(
    'Witches\' Chant',
    'Subtract all accusations',
    'protection',
    2,
    fauna, mineral, rite, divination
);
export const bloodSacrifice = new Spell(
    'Blood Sacrifice',
    'Protect one numen from curses.',
    'protection',
    2,
    fauna, symbol, trance, deity
);
export const curseTablet = new Spell(
    'Curse Tablet',
    'Curse influence. (Influence counts as -1 influence. Earth energy is worth -1 times its value. If curse is removed, influence is removed.',
    'curse',
    2,
    flora, mineral, demon, trance
);
export const plague = new Spell(
    'Plague',
    'Destroy area. (Destroy influence and no new influence can be placed here. Earth energy is destroyed. This curse cannot be reversed.',
    'curse',
    2,
    rite, divination, demon, deity
);
export const diabolicalPact = new Spell(
    'Diabolical Pact',
    'Replace adjacent opponent\'s influence with your influence. This curse cannot be blocked by talisman.',
    'curse',
    2,
    mineral, rite, symbol, demon
)

