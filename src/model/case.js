export const caseType = ["win", "chance", "super chance", "crash", "passe"];

export default class Case {
    type;
    value;
    wedge;

    constructor(type, value) {
        if (value) this.value = value;
        if (type && caseType.includes(type)) this.type = type;
    }
}