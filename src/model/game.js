export default class Game {
    cumul;
    cumulHTML;
    number;
    numberHTML;
    launch;
    bonus;
    constructor() {
        this.cumul = 0;
        this.cumulHTML = document.getElementById('cumul');
        this.launch = 0;
        this.bonus = 1;
        this.numberHTML = document.getElementById('number')
        this.number = ""
    }

    updateState(type, price, number) {
        if (this.bonus > 1) this.bonus = 1;
        this.launch++;
        switch (type) {
            case "win":
                this.number += number.toString();
                this.cumul += price * this.bonus;
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
                break;         
            }
        this.updateHTML()
    }

    updateHTML() {
        this.numberHTML.innerHTML = this.number;
        this.cumulHTML.innerHTML = this.cumul + " €";
    }

    isEnd() {
        return this.launch === 5;
    }

}