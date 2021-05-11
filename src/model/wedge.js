import Utils from "../utils/random";

export class Wedge {

    background;
    text;
    group;
    value;
    angle;
    number;

    constructor(numWedges, n) {
        this.group = new Konva.Group({
            rotation: (2 * n * Math.PI) / numWedges,
        });

        this.group.add(this.generateBackground(numWedges, n));

        this.group.add(this.generateText());
        this.text.cache();

        this.group.add(this.generateNumber(n));
        this.number.cache()

        this.group.startRotation = this.group.rotation();

    }

    generateBackground(numWedges, n) {
        var s = Utils.getRandomColor();
        var r = s[0];
        var g = s[1];
        var b = s[2];
        this.angle = (2 * Math.PI) / numWedges;

        var endColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        r += 100;
        g += 100;
        b += 100;

        var startColor = 'rgb(' + r + ',' + g + ',' + b + ')';

        this.background = new Konva.Wedge({
            radius: 250,
            angle: this.angle,
            fillRadialGradientStartPoint: {
                x:0,
                y:0
            },
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndPoint: {
                x:0,
                y:0
            },
            fillRadialGradientEndRadius: 300,
            fillRadialGradientColorStops: [0, startColor, 1, endColor],
            fill: '#64e9f8',
            fillPriority: 'radial-gradient',
            stroke: '#ccc',
            strokeWidth: 2,
        });

        return this.background;
    }

    generateText() {
        const reward = Utils.getRandomReward();
        this.text = new Konva.Text({
            text: reward,
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 'white',
            align: 'right',
            // padding: 40,
            stroke: 'black',
            strokeWidth: 1,
            rotation: (Math.PI + this.angle) / 2,
            x: 240,
            y: 25,
            listening: false,
            id: "value"
        });

        return this.text
    }

    generateNumber(i) {
        let number = i > 9 ? i-10 : i;
        this.number = new Konva.Text({
            text: number.toString(),
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 'white',
            align: 'right',
            stroke: 'black',
            strokeWidth: 1,
            rotation: (Math.PI + this.angle) / 2,
            x: 70,
            y: 8,
            listening: false,
            id: "number"
        });

        return this.number
    }}