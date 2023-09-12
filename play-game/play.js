// RESET button
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

// Import ingredients objects 
import { flora, fauna, mineral, rite, divination, symbol, trance, demon, deity, numen } from './src/ingredients.js';

// Import spells objects
import { potion, incantation, evocation, counterspell, changeling, witchesLadder, sigil, supplication, seance, elixirOfImmortality, sabbat, astralProjecttion, evilEye, talisman, lovePotion, voodooDoll, hexBag, friendshipCharm, conjurationOfFlame, lunarOration, witchesChant, bloodSacrifice, curseTablet, plague, diabolicalPact } from './src/spells.js';

// TOOLS:
const parser = new DOMParser();

// Parameters from main page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// On doc load, check if search params are correct
window.addEventListener('DOMContentLoaded', () => {
    if (!urlParams.has('game') || !urlParams.has('character') || !urlParams.has('familiar')) {
        window.location.replace('http://127.0.0.1:5500/HOTN/index.html');
    }
})

// DOM constants
// Main layout
const mainTitle = document.querySelector('#main-title');
const ingredientsSection = document.querySelector('#ingredients-section');
const spellsSection = document.querySelector('#spells-section');
const backBtn = document.querySelector('#back-btn');
const canCastTitle = document.querySelector('#can-cast-title');
const oneMoreTitle = document.querySelector('#one-more-title');
const familiarIcon = document.querySelector('#familiar-icon');

// FIND SPELLS buttons
const findSpellsBtn = document.querySelector('#find-spells-btn');
const oneMoreBtn = document.querySelector('#one-more-btn');
const canCastBtn = document.querySelector('#can-cast-btn');
// spells containers (can cast & one-more)
const canCast = document.querySelector('#spells-wrap-can-cast');
const oneMore = document.querySelector('#spells-wrap-one-more');


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

// GAME INFO FROM MAIN FORM & SETUP:
// (Familiar info is in the familiar object)

const gametype = urlParams.get('game');
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



// SPELLBOOK INGREDIENTS OBJECTS (Ingredient/numen buttons and amounts), also familiar toggler checkbox

const allIngredients = [flora, fauna, mineral, rite, divination, symbol, trance, demon, deity, numen];

// INGREDIENTS FUNCTIONS
// add event listeners to all ingredient buttons to access adjustIngredient function.
const events = ['click', 'touchstart'];

function addIngredientListeners() {
    for (let ingredient of allIngredients) {
        if (ingredient !== innate) {
            events.forEach(event => ingredient.upButton.addEventListener(event, (e) => {
                e.preventDefault();
                ingredient.adjustIngredient(1)
            }));
            events.forEach(event => ingredient.downButton.addEventListener(event, (e) => {
                e.preventDefault();
                ingredient.adjustIngredient(-1)
            }));
        }
    }
}
addIngredientListeners();


// SPELLS 

const standardSpells = [
    potion,
    incantation,
    evocation,
    counterspell,
    changeling,
    witchesLadder,
    sigil,
    supplication,
    seance,
    elixirOfImmortality,
    sabbat,
    astralProjecttion,
    evilEye,
    talisman,
    lovePotion,
    voodooDoll,
    hexBag,
    friendshipCharm,
    conjurationOfFlame,
    lunarOration,
    witchesChant,
    bloodSacrifice,
    curseTablet,
    plague,
    diabolicalPact
];


// Find spells function -- Set off by find spells button or cancast/onemore button
// Gametype is set by form before entering the spellbook page
// Show the spells, adjust spell to hold info and ingredients, apply animation
function showSpell(spell, query) {
    const parent = canCast;
    const parsedElement = parser.parseFromString(spell.render(query), 'text/html');
    const newElement = parsedElement.body.firstElementChild;
    if (query === 'can cast') {
        const spellButton = newElement.querySelector(`#${spell.id}`);
        events.forEach(event => spellButton.addEventListener(event, (e) => {
            e.preventDefault();
            castSpell(spell);
        }));
    }
    parent.append(newElement);
}

// Check each spell to see if can be cast (Called by findSpells)
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
            if (spell.ingredients.length === 2 && spell.ingredients.includes(innate) && spell.ingredients.find(sp => sp !== innate).amount === 0) {
                spell.canCast = 'almost';
            }
            else {
                spell.canCast = true;
            }
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

// Find spells than can be cast and print
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

// ANIMATIONS, SCROLL, and DEVICE ROTATE/RESIZE WINDOW

function scroll(section) {
    console.log(section);
    section.scrollIntoView({ behavior: 'smooth' });
    section.scrollIntoView();
    section.scroll({ left: 0 });
}

// Find spells buttons event listeners

events.forEach(event => findSpellsBtn.addEventListener(event, (e) => {
    e.preventDefault();
    console.log('clicked the find spells button');
    scroll(spellsSection);
    console.log(windowWidth);
    canCastTitle.classList.remove('hidden');
    oneMoreTitle.classList.add('hidden');
    canCastBtn.classList.add('hidden');
    oneMoreBtn.classList.remove('hidden');
    findSpells('can cast');
}));
events.forEach(event => oneMoreBtn.addEventListener(event, (e) => {
    e.preventDefault();
    canCastTitle.classList.add('hidden');
    oneMoreTitle.classList.remove('hidden');
    canCastBtn.classList.remove('hidden');
    oneMoreBtn.classList.add('hidden');
    findSpells('one more')
}));
events.forEach(event => canCastBtn.addEventListener(event, (e) => {
    e.preventDefault();
    canCastTitle.classList.remove('hidden');
    oneMoreTitle.classList.add('hidden');
    canCastBtn.classList.add('hidden');
    oneMoreBtn.classList.remove('hidden');
    findSpells('can cast')
}
));
events.forEach(event => backBtn.addEventListener(event, (e) => {
    e.preventDefault();
    scroll(ingredientsSection);
}));

// orient screen changes
window.addEventListener('resize', () => scroll(ingredientsSection));
screen.orientation.addEventListener('change', () => mainTitle.scroll({top: 20}));
