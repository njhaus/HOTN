// GLOBAL DOM CONSTANTS

// Form headers for scrolling
const gameHeading = document.getElementById("game-heading");
const characterHeading = document.getElementById("character-heading");
const familiarHeading = document.getElementById("familiar-heading");

// Submit (play) button
const submitButton = document.getElementById("submit-button");

// Inputs
// Game radio buttons
const gameInputs = Array.from(document.querySelectorAll('.game-radio'));
const characterInputs = Array.from(document.querySelectorAll('.character-radio'));
const familiarInputs = Array.from(document.querySelectorAll('.familiar-radio'));
// Back button
const backButton = document.getElementById('back-button');
// Attribution links
const attributionLinks = Array.from(document.getElementsByClassName('attribution-links'));


// GLOBAL VARIABLES

// FUNCIONALITY

// Scroll function -- scrolls to appropriate area in form and shows correct photo attribution links
// currentIndex tells where in the form we are 
let currentIndex = 0;

function scrollForm(direction) {
    // direction is 1 or -1 and specifies whether to move forwards or back
    // The list of headings makes it easy to tell which index to scroll to.
    const headingList = [gameHeading, characterHeading, familiarHeading, submitButton];
    // Scroll the form to the heading which = currentIndex + 1 or -1! (after waiting 350ms so we can see the animations)
    setTimeout(() => {
        currentIndex += direction;
        headingList[(currentIndex)].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        // update currentIndex
        console.log(currentIndex);
        console.log(headingList[currentIndex]);
        if (currentIndex > 0) {
            backButton.classList.remove('hidden');
        }
        else {
            backButton.classList.add('hidden');
        }
        // show appropriate image attribution
        if (currentIndex === 0) {
            attributionLinks[0].classList.remove('hidden');
            attributionLinks[1].classList.add('hidden');
        }
        else if (currentIndex == 2) {
            attributionLinks[0].classList.add('hidden');
            attributionLinks[1].classList.remove('hidden');
        }
        else {
            attributionLinks[0].classList.add('hidden');
            attributionLinks[1].classList.add('hidden');
        }
    }, 350);
    // Show or hide back button 
}

// set game button color
function setGame(e) {
    target = e.target;
    if (target.getAttribute("id") === "game-standard") {
        submitButton.classList.remove("submit-button-coven");
        submitButton.classList.add("submit-button-standard");
    }
    else {
        submitButton.classList.remove("submit-button-standard");
        submitButton.classList.add("submit-button-coven");
    }
}

// Event listeners
const events = ['touchstart', 'click']

gameInputs.forEach(input => events.forEach(event => input.addEventListener(event, (e) => {
    scrollForm(1);
    setGame(e);
})));
characterInputs.forEach(input => events.forEach(event => input.addEventListener(event, (e) => {
    scrollForm(1);
})));
familiarInputs.forEach(input => events.forEach(event => input.addEventListener(event, (e) => {
    scrollForm(1);
})));
events.forEach(event => backButton.addEventListener(event, (e) => {
    e.preventDefault();
    scrollForm(-1)
}));

// foreach, contains return nothing or number of index;