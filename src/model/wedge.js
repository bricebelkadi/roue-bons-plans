import Konva from "konva"

export class Wedge {

    background;
    text;
    group;
    value;
    angle;
    number;
    type;
    circle;
    colors = [
        "#943690",
        "#BCD247",
        "#1C68B5",
        "#EFDD00",
        "#D563A6",
        "#2D95DB",
        "#33A232",
        "#E6221F",
        "#309A81",
        "#F7A51F",
        "#CD4997",
        "#ED660A",
        "#5A479C",
        "#E51D7E",
        "#34A57F"
    ]


    constructor(numWedges, n, type, value) {
        this.group = new Konva.Group({
            rotation: (2 * n * Math.PI) / numWedges,
        });

        this.type = type;
                
        this.group.add(this.generateBackground(numWedges, n, type));
        
        this.group.add(this.generateText(type, value));
        this.text.cache();
        
        this.group.add(this.generateNumber(n));
        this.number.cache()
        
        
        this.group.setAttr('type', this.type);
        
        this.group.startRotation = this.group.rotation();
        this.group.add(this.generateCircle(n))
        // this.circle.cache()
    }

    turnOnLight() {
        console.log("cous")
        this.fill = "red";
        // window.setTimeout(() => this.fill("transparent"), 500)
    }

    generateCircle(i) {
        var circle = new Konva.Circle({
            x: 231,
            y: 119,
            radius: 5,
            stroke: '#ccc',
            fill:"transparent",
            strokeWidth: .5,
            id:`led`
        })
        circle.on('up', function() {
            let circle = this;
            circle.fill("red")
            // window.setTimeout(function () {
            //     circle.fill("transparent")
            // }, 750)
        })
        circle.on('down', function() {
            let circle = this;
            circle.fill("transparent")
        })
        return circle;
    }

    generateBackground(numWedges, n, type) {
        this.angle = (2 * Math.PI) / numWedges;
        let color;
        switch (type) {
            case "crash":
                color = "black";
                break;
            case "passe":
                color = "#fcd900";
                break;
            case "chance":
                color = "#BCBCBE";
                break;
            case "super chance":
                color = "#F8BB55"
                break;
            default:
                color = this.colors[n] ? this.colors[n] : this.colors[n - this.colors.length];
                break;
        }
        this.background = new Konva.Wedge({
            radius: 250,
            angle: this.angle,
            fillRadialGradientStartPoint: {
                x: 0,
                y: 0
            },
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndPoint: {
                x: 0,
                y: 0
            },
            fillRadialGradientEndRadius: 300,
            fillRadialGradientColorStops: [0, color, 1, color],
            fill: '#64e9f8',
            fillPriority: 'radial-gradient',
            stroke: '#000',
            strokeWidth: .5,
        });

        return this.background;
    }

    generateText(type, value) {
        switch (type) {
            case "win":
                return this.generateWinText(value);
            case "crash":
                return this.generateCrashText();
            case "passe":
                return this.generatePasseText();
            case "chance":
                return this.generateChanceText();
            case "super chance":
                return this.generateSuperChanceText();
        }
    }

    generateWinText(value) {
        const price = new Konva.Text({
            text: value.toString(),
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 35,
            fill: 'white',
            align: 'right',
            // padding: 40,
            strokeWidth: 0,
            rotation: (Math.PI + this.angle) / 2,
            x: 240,
            y: value.toString().length > 2 ? 9 : 18,
            listening: false,
            align: "center",
            id: "value"
        });
        const euro = new Konva.Text({
            text: "€",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 30,
            align: 'right',
            fill: 'white',
            rotation: (Math.PI + this.angle) / 2,
            x: 205,
            y: 22,
            listening: false,
            align: "center",
            id: "value"
        });
        this.text = new Konva.Group();
        this.text.add(price);
        this.text.add(euro);
        return this.text;
    }

    generateCrashText() {
        const C = new Konva.Text({
            text: "C",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 50,
            align: 'right',
            fill: 'white',
            strokeWidth: 2,
            stroke: "red",
            rotation: (Math.PI + this.angle) / 2,
            x: 245,
            y: 21,
            listening: false,
            align: "center",
            id: "value"
        });
        const R = new Konva.Text({
            text: "R",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 45,
            align: 'right',
            fill: 'white',
            strokeWidth: 2,
            stroke: "red",
            rotation: (Math.PI + this.angle) / 2,
            x: 205,
            y: 17,
            listening: false,
            align: "center",
            id: "value"
        });
        const A = new Konva.Text({
            text: "A",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 40,
            align: 'right',
            fill: 'white',
            strokeWidth: 2,
            stroke: "red",
            rotation: (Math.PI + this.angle) / 2,
            x: 170,
            y: 13,
            listening: false,
            align: "center",
            id: "value"
        });
        const S = new Konva.Text({
            text: "S",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 35,
            align: 'right',
            fill: 'white',
            strokeWidth: 2,
            stroke: "red",
            rotation: (Math.PI + this.angle) / 2,
            x: 139,
            y: 10,
            listening: false,
            align: "center",
            id: "value"
        });
        const H = new Konva.Text({
            text: "H",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 30,
            align: 'right',
            fill: 'white',
            strokeWidth: 2,
            stroke: "red",
            rotation: (Math.PI + this.angle) / 2,
            x: 110,
            y: 6,
            listening: false,
            align: "center",
            id: "value"
        });


        this.text = new Konva.Group();
        this.text.add(C)
        this.text.add(R)
        this.text.add(A)
        this.text.add(S)
        this.text.add(H)

        return this.text;
    }

    generatePasseText() {
        const P = new Konva.Text({
            text: "P",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 50,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 245,
            y: 21,
            listening: false,
            align: "center",
            id: "value"
        });
        const A = new Konva.Text({
            text: "A",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 45,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 205,
            y: 15,
            listening: false,
            align: "center",
            id: "value"
        });
        const S1 = new Konva.Text({
            text: "S",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 40,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 170,
            y: 12,
            listening: false,
            align: "center",
            id: "value"
        });
        const S2 = new Konva.Text({
            text: "S",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 35,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 139,
            y: 9,
            listening: false,
            align: "center",
            id: "value"
        });
        const E = new Konva.Text({
            text: "E",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 30,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 110,
            y: 7,
            listening: false,
            align: "center",
            id: "value"
        });


        this.text = new Konva.Group();
        this.text.add(P)
        this.text.add(A)
        this.text.add(S1)
        this.text.add(S2)
        this.text.add(E)

        return this.text;
    }

    generateChanceText() {
        const C = new Konva.Text({
            text: "C",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 50,
            strokeWidth: 1,
            stroke: "gold",
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 245,
            y: 21,
            listening: false,
            align: "center",
            id: "value"
        });
        const H = new Konva.Text({
            text: "H",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 45,
            strokeWidth: 1,
            stroke: "gold",
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 207,
            y: 17,
            listening: false,
            align: "center",
            id: "value"
        });
        const A = new Konva.Text({
            text: "A",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 40,
            strokeWidth: 1,
            stroke: "gold",
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 175,
            y: 13,
            listening: false,
            align: "center",
            id: "value"
        });
        const N = new Konva.Text({
            text: "N",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 35,
            strokeWidth: 1,
            stroke: "gold",
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 145,
            y: 10,
            listening: false,
            align: "center",
            id: "value"
        });
        const C2 = new Konva.Text({
            text: "C",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 30,
            strokeWidth: 1,
            stroke: "gold",
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 118,
            y: 7,
            listening: false,
            align: "center",
            id: "value"
        });
        const E = new Konva.Text({
            text: "E",
            fontFamily: 'Arial',
            fontStyle: "bold",
            strokeWidth: 1,
            stroke: "gold",
            fontSize: 25,
            align: 'right',
            fill: 'black',
            rotation: (Math.PI + this.angle) / 2,
            x: 95,
            y: 6,
            listening: false,
            align: "center",
            id: "value"
        });



        this.text = new Konva.Group();
        this.text.add(C)
        this.text.add(H)
        this.text.add(A)
        this.text.add(N)
        this.text.add(C2)
        this.text.add(E)
        return this.text;
    }

    generateSuperChanceText() {
        const superTxt = new Konva.Text({
            text: "SUPER",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 20,
            strokeWidth: 1,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 249,
            y: 5,
            listening: false,
            align: "center",
            id: "value",
        })
        const C = new Konva.Text({
            text: "C",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 45,
            strokeWidth: 2,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 230,
            y: 21,
            listening: false,
            align: "center",
            id: "value"
        });
        const H = new Konva.Text({
            text: "H",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 40,
            strokeWidth: 2,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 195,
            y: 17,
            listening: false,
            align: "center",
            id: "value"
        });
        const A = new Konva.Text({
            text: "A",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 35,
            strokeWidth: 2,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 165,
            y: 14,
            listening: false,
            align: "center",
            id: "value"
        });
        const N = new Konva.Text({
            text: "N",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 30,
            strokeWidth: 2,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 138,
            y: 11,
            listening: false,
            align: "center",
            id: "value"
        });
        const C2 = new Konva.Text({
            text: "C",
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 25,
            strokeWidth: 2,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 115,
            y: 9,
            listening: false,
            align: "center",
            id: "value"
        });
        const E = new Konva.Text({
            text: "E",
            fontFamily: 'Arial',
            fontStyle: "bold",
            strokeWidth: 1,
            fontSize: 20,
            stroke: "red",
            align: 'right',
            fill: 'red',
            rotation: (Math.PI + this.angle) / 2,
            x: 94,
            y: 8,
            listening: false,
            align: "center",
            id: "value"
        });



        this.text = new Konva.Group();
        this.text.add(superTxt)
        this.text.add(C)
        this.text.add(H)
        this.text.add(A)
        this.text.add(N)
        this.text.add(C2)
        this.text.add(E)
        return this.text;
    }




    generateNumber(i) {
        let number = i > 9 ? i - 10 : i;
        this.number = new Konva.Text({
            text: number.toString(),
            fontFamily: 'Arial',
            fontStyle: "bold",
            fontSize: 15,
            fill: 'white',
            align: 'right',
            rotation: (Math.PI + this.angle) / 2,
            x: 70,
            y: 7,
            listening: false,
            id: "number"
        });

        return this.number
    }
}