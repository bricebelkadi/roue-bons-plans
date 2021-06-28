export default class Game {
    cumul;
    cumulHTML;
    number;
    numberHTML;
    launch;
    bonus;
    bonusHTML;
    isBonusUsed;
    constructor() {
        this.cumul = 0;
        this.cumulHTML = document.getElementById('cumul');
        this.launch = 0;
        this.bonus = 1;
        this.numberHTML = document.getElementById('number')
        this.number = ""
        this.bonusHTML = document.getElementById('bonus');
        this.isBonusUsed = false;
    }

    updateState(type, price, number) {
        if (this.isBonusUsed && this.bonus > 1) {
            this.bonus = 1;
            this.updateBonusHTML()
        }
        if (!this.isBonusUsed) this.isBonusUsed = true;
        this.launch++;
        switch (type) {
            case "win":
                this.number += number.toString();
                this.cumul += (price * this.bonus);
                break;
            case "crash":
                this.number += number.toString();
                this.cumul = 0;
                break;
            case "passe":
                this.number += number.toString();
                break;
            case "chance":
                this.launch--
                break;
            case "super chance":
                this.launch--
                this.bonus = Math.random() >= .5 ? 3 : 2;
                this.isBonusUsed = false;
                this.updateBonusHTML()
                break;         
            }
        this.updateHTML()
    }

    updateHTML() {
        this.numberHTML.innerHTML = "n° <br/>" + this.number;
        this.cumulHTML.innerHTML = "gains <br/>" +  this.cumul + " €";
    }

    updateBonusHTML() {
        if (this.bonus > 1) this.bonusHTML.innerHTML = "bonus <br/>" + this.bonus;
        else this.bonusHTML.innerHTML = "";
    }

    isEnd() {
        return this.launch === 5;
    }

}