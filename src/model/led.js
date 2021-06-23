import Konva from "konva"

export class Led {

    circle;
    
    constructor() {
        this.circle = new Konva.Circle({
            x: 240,
            y: 120,
            radius: 20,
            fill: "red"
        })
    }
}