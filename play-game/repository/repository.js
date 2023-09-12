// RESET button
// TODO: Update spells 
// TODO: Style -- Make description area fill entire space
// TODO:Add coven spells

// STYLE TODOS
// TODO: SetTimeout in a loop? Make each spell come after a short delay rather than all at once (In findSpells function)
// TODO: add sparkle effect upon spell cast
// SEE CSS: spell "slide-up" effect, clean up spell look

// JS CLEAN_UP TODOS
// TODO: Destructure 'this' in render function and adjust ingredient function
// TODO: check if any retooling is necessary for objects -- should any of the properties or methods live on the prototype rather than the instances? YES! Make adjustIngredient (ingredient) and render (spell) prototype properties. (see Colt steele 305)  Did I even specify a prototype? Should I just make everything into classes?
// TODO: check if query string is legit. if not, send back to main page. (You can't just type the address/play to get to the spellbook) GOOD! Just need to fix redirect link when I put it on github.
// TODO: make render method private to protect from malicious HTML
// TODO  Make modules -- Move spells into a different file and import (to clean up code and allow spells array to be found by gametye when it is called at the top of the file)
// TODO: Bundle with webpack (which should also run babel transpiler)

// TOOLS:
const parser = new DOMParser();

// Parameters from main page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

// On doc load, check if search params are correct
window.addEventListener('DOMContentLoaded', () => {
    if (!urlParams.has('game') || !urlParams.has('character') || !urlParams.has('familiar')) {
        window.location.replace('http://127.0.0.1:5500/HOTN/main/main.html');
    }
})


// DOM constants

const ingredientsSection = document.querySelector('#ingredients-section');
const spellsSection = document.querySelector('#spells-section');
const backBtn = document.querySelector('#back-btn');
const canCastTitle = document.querySelector('#can-cast-title');
const oneMoreTitle = document.querySelector('#one-more-title');
const familiarIcon = document.querySelector('#familiar-icon');

// SPELLBOOK INGREDIENTS OBJECTS (Ingredient/numen buttons and amounts), also familiar toggler checkbox

class Ingredient {
    constructor(name, count, upButton, downButton) {
        this.name = name;
        this.icon = `../img/${this.name}icon.png`;
        this.amount = 0;
        this.count = document.querySelector(count);
        this.upButton = document.querySelector(upButton);
        this.downButton = document.querySelector(downButton);
    }
    adjustIngredient(value) {
        const newAmount = this.amount + value;
        if (newAmount >= 0 && newAmount <= 5) {
            this.amount += value;
            this.count.textContent = this.amount;
        }
    }
}

const flora = new Ingredient('flora', '#flora', '#flora-up', '#flora-down');
const fauna = new Ingredient('fauna', '#fauna', '#fauna-up', '#fauna-down');
const mineral = new Ingredient('mineral', '#mineral', '#mineral-up', '#mineral-down');
const rite = new Ingredient('rite', '#rite', '#rite-up', '#rite-down');
const divination = new Ingredient('divination', '#divination', '#divination-up', '#divination-down');
const symbol = new Ingredient('symbol', '#symbol', '#symbol-up', '#symbol-down');
const trance = new Ingredient('trance', '#trance', '#trance-up', '#trance-down');
const demon = new Ingredient('demon', '#demon', '#demon-up', '#demon-down');
const deity = new Ingredient('deity', '#deity', '#deity-up', '#deity-down');
const numen = new Ingredient('deity', '#numen', '#numen-up', '#numen-down');

const allIngredients = [flora, fauna, mineral, rite, divination, symbol, trance, demon, deity, numen];


// INGREDIENTS FUNCTIONS
// add event listeners to all ingredient buttons to access adjustIngredient function.

function addIngredientListeners() {
    for (let ingredient of allIngredients) {
        ingredient.upButton.addEventListener('click', () => ingredient.adjustIngredient(1));
        ingredient.downButton.addEventListener('click', () => ingredient.adjustIngredient(-1));
    }
}
addIngredientListeners();


// FAMILIAR OBJECT

class Familiar {
    constructor(type) {
        this.type = type,
            this.checkbox = document.querySelector(`#familiar-chk`),
            this.url = `url(../img/${this.type}icon.png)`,
            this.color = `var(--${this.type})`
    }
    setImage() {
        familiarIcon.style.backgroundImage = this.url;
        familiarIcon.style.backgroundColor = this.color;
    }
}

const familiar = new Familiar(urlParams.get('familiar'));
familiar.setImage();

// WITCHES OBJECT
const witches = {
    earthMother: flora,
    folkHealer: fauna,
    oldWorldShaman: rite,
    wanderingMystic: divination,
    voodooQueen: trance,
    nightDemoness: demon
}

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

const potion = new Spell('Potion', 'Add Influence', 'influence', 0, flora, fauna);
const incantation = new Spell('Incantation', 'Add Influence', 'influence', 0, rite, divination);
const evocation = new Spell('Evocation', 'Add Influence', 'influence', 0, trance, demon);
const counterspell = new Spell(
    'Counterspell',
    'Remove effect of any enduring spell (Protections or curse)',
    'protection',
    0,
    fauna, divination, deity
);
const changeling = new Spell(
    'Changeling',
    'Subtract one accusation.',
    'protection',
    0,
    fauna, rite
);
const incenseOffering = new Spell(
    'Incense Offering',
    'Hide number on influences. (Change all instances of the chosen number to 0)',
    'protection',
    0,
    flora, symbol
);
const sigil = new Spell(
    'Sigil',
    'Add number of choice to one opponent\'s influence',
    'curse',
    0,
    symbol, demon
);
const supplication = new Spell(
    'Supplicaiton',
    'Gain one specific ingredient',
    'other',
    0,
    mineral, divination, deity
);
const seance = new Spell(
    'Seance',
    'Gain two ingredients. The ingredients must be different and cannot be your innate ingredient. Can only cast once per turn.',
    'other',
    0,
    divination, trance
);
const elixirOfImmortality = new Spell(
    'Elixir of Immortality',
    'Come back to life after death.',
    'other',
    0,
    mineral, symbol, deity
);
const sabbat = new Spell(
    'Sabbat',
    'Double influence. This influence is worth two, and any earth energy on this space is worth double.',
    'influence',
    1,
    flora, symbol, deity
);
const astralProjecttion = new Spell(
    'Astral Projection',
    'Move one influence up to two spaces',
    'influence',
    1,
    mineral, trance
);
const evilEye = new Spell(
    'Evil Eye',
    'Look at one earth energy token\'s value, then move it to any adjacent space.',
    'influence',
    1,
    divination, symbol, demon
);
const talisman = new Spell(
    'Talisman',
    'Protect one influence from curses.',
    'protection',
    1,
    fauna, mineral, deity
);
const lovePotion = new Spell(
    'Love Potion',
    'Move one accusation from you to opponent.',
    'protection',
    1,
    rite, trance, deity
);
const conjurationOfFlame = new Spell(
    'Conjuration of Flame',
    'Destroy any influence (Double influence becomes single)',
    'curse',
    1,
    flora, rite, demon
);
const hexBag = new Spell(
    'Hex Bag',
    'Place hex bag token on opponent\'s influence. At the end of the game, gain all earth energy points on that influence.',
    'curse',
    1,
    mineral, divination, demon
);
const voodooDoll = new Spell(
    'Voodoo Doll',
    'Look at opponent\'s hand and take two cards. Opponent discards all remaining cards.',
    'curse',
    1,
    rite, symbol, trance
);
const friendshipCharm = new Spell(
    'Friendship Charm',
    'Steal one opponent\'s familiar',
    'curse',
    1,
    fauna, mineral, trance
);
const lunarOration = new Spell(
    'Lunar Oration',
    'Remove numbers on all influences in one numen. (change to 0)',
    'protection',
    2,
    flora, rite, divination
);
const witchesChant = new Spell(
    'Witches\' Chant',
    'Subtract all accusations',
    'protection',
    2,
    fauna, mineral, divination, trance
);
const bloodSacrifice = new Spell(
    'Blood Sacrifice',
    'Protect one numen from curses.',
    'protection',
    2,
    flora, fauna, symbol, deity
);
const curseTablet = new Spell(
    'Curse Tablet',
    'Curse influence. (Influence counts as -1 influence. Earth energy is worth -1 times its value. If curse is removed, influence is removed.',
    'curse',
    2,
    flora, mineral, demon, trance
);
const plague = new Spell(
    'Plague',
    'Destroy area. (Destroy influence and no new influence can be placed here. Earth energy is destroyed. This curse cannot be reversed.',
    'curse',
    2,
    fauna, rite, demon, deity
);
const diabolicalPact = new Spell(
    'Diabolical Pact',
    'Replace adjacent opponent\'s influence with your influence. This curse cannot be blocked by talisman.',
    'curse',
    2,
    flora, rite, symbol, demon
)

const standardSpells = [
    potion,
    incantation,
    evocation,
    counterspell,
    changeling,
    incenseOffering,
    sigil,
    supplication,
    seance,
    elixirOfImmortality,
    sabbat,
    astralProjecttion,
    evilEye,
    talisman,
    lovePotion,
    conjurationOfFlame,
    hexBag,
    voodooDoll,
    friendshipCharm,
    lunarOration,
    witchesChant,
    bloodSacrifice,
    curseTablet,
    plague,
    diabolicalPact
];


// GAME INFO FROM MAIN FORM & SETUP:
// (Familiar info is in the familiar object)

const gametype = urlParams.get('game');
// const gametype = urlParams.get('gametype');
// const witch = 'nightDemoness';
const witch = urlParams.get('character');
const innate = witches[witch];

// Set innate ingredient
function setInnate() {
    innate.amount = 1;
    innate.count.textContent = 'Innate';
    innate.upButton.setAttribute('disabled', true);
    innate.downButton.setAttribute('disabled', true);
}
setInnate();


// FIND SPELLS & render to page
// Find Spells Button
const findSpellsBtn = document.querySelector('#find-spells');
const oneMoreBtn = document.querySelector('#one-more-btn');
const canCastBtn = document.querySelector('#can-cast-btn');
// spells containers (can cast & one-more)
const canCast = document.querySelector('#spells-wrap-can-cast');
const oneMore = document.querySelector('#spells-wrap-one-more');



// Find spells function
// Gametype is set by form before entering the spellbook page
// Show the spalls, adjust spell to hold info and ingredients, apply animation
function showSpell(spell, query) {
    const parent = canCast;
    const parsedElement = parser.parseFromString(spell.render(query), 'text/html');
    const newElement = parsedElement.body.firstElementChild;
    if (query === 'can cast') {
        const spellButton = newElement.querySelector(`#${spell.id}`);
        spellButton.addEventListener('click', () => castSpell(spell));
    }
    parent.append(newElement);
}

function checkSpell(spell, query) {
    let checkNumen = numen.amount;
    // Reset spell
    spell.canCast = false;
    // Check ingredients needed
    let ingredientsNeeded = spell.ingredients.length;
    // Count to see how many ingredients the player has
    let counter = 0;
    // Check familiar. Add one to counter / numen if familiar is appropriate type (also check is spell is 2 ingredients because you must have at least 1 non-innate ingredient)
    if (familiar.checkbox.checked) {
        switch (familiar.type) {
            case 'snake':
                if (spell.type === 'curse') {
                    if (!(spell.ingredients.includes(innate) && ingredientsNeeded === 2)) counter++;
                }
                break;
            case 'owl':
                if (spell.type === 'protection') {
                    if (!(spell.ingredients.includes(innate) && ingredientsNeeded.length === 2)) counter++;
                }
                break;
            case 'goat':
                checkNumen = numen.amount + 1;
                break;
        }
    }
    // Check numen (if not enough, can't cast spell)
    if (spell.numen > checkNumen) {
        spell.canCast = false;
    }
    // Check ingredients and up counter
    else {
        for (let ingredient of spell.ingredients) {
            if (ingredient.amount > 0) {
                counter++;
            }
        }
        // Check if spell can be cast
        if (counter >= spell.ingredients.length) {
            spell.canCast = true;
        }
        else if (counter >= spell.ingredients.length - 1) {
            spell.canCast = 'almost';
        }
    }
    if (query === 'can cast') {
        if (spell.canCast === true) {
            showSpell(spell, query);
            return 100;
        }
        else return 0;
    }
    else if (query === 'one more') {
        if (spell.canCast === 'almost') {
            showSpell(spell, query);
            return 100;
        }
        else return 0;
    }
    else return 0;
}

// Find spells to print
function findSpells(query) {
    // Reset spells
    canCast.textContent = '';
    let game;
    gametype === 'standard' ? game = standardSpells : game = standardSpells;
    // timeout between spells -- for animation delay
    let animationDelay = 1000;

    for (let spell of game) {
        checkSpell(spell, query);
    }
}

// Cast spell

function castSpell(spell) {
    // console.log(spell);
    for (let ingredient of spell.ingredients) {
        if (innate !== ingredient && ingredient.amount > 0) {
            ingredient.amount--;
            ingredient.count.textContent = ingredient.amount;
        }
    }
    scroll(ingredientsSection);
}

// ANIMATIONS AND SCROLL

function scroll(section) {
    section.scrollIntoView({ behavior: 'smooth' });
}

// Find spells addEventListener

findSpellsBtn.addEventListener('click', () => {
    canCastTitle.classList.remove('hidden');
    oneMoreTitle.classList.add('hidden');
    scroll(spellsSection);
    findSpells('can cast');
});
oneMoreBtn.addEventListener('click', () => {
    canCastTitle.classList.add('hidden');
    oneMoreTitle.classList.remove('hidden');
    findSpells('one more')
});
canCastBtn.addEventListener('click', () => {
    canCastTitle.classList.remove('hidden');
    oneMoreTitle.classList.add('hidden');
    findSpells('can cast')
}
);
backBtn.addEventListener('click', () => scroll(ingredientsSection));
window.addEventListener('resize', () => scroll(ingredientsSection));
