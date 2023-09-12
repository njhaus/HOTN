
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

export const flora = new Ingredient('flora', '#flora', '#flora-up', '#flora-down');
export const fauna = new Ingredient('fauna', '#fauna', '#fauna-up', '#fauna-down');
export const mineral = new Ingredient('mineral', '#mineral', '#mineral-up', '#mineral-down');
export const rite = new Ingredient('rite', '#rite', '#rite-up', '#rite-down');
export const divination = new Ingredient('divination', '#divination', '#divination-up', '#divination-down');
export const symbol = new Ingredient('symbol', '#symbol', '#symbol-up', '#symbol-down');
export const trance = new Ingredient('trance', '#trance', '#trance-up', '#trance-down');
export const demon = new Ingredient('demon', '#demon', '#demon-up', '#demon-down');
export const deity = new Ingredient('deity', '#deity', '#deity-up', '#deity-down');
export const numen = new Ingredient('deity', '#numen', '#numen-up', '#numen-down');