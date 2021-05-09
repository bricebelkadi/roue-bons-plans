/////////////////////////////
// wheel of fortune
/////////////////////////////

export default class Wheel {

    constructor(x, y, radius, segments, pinRadius, pinDistance) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.segments = segments;
        this.pinRadius = pinRadius;
        this.pinDistance = pinDistance;
    
        this.pX = this.x * ppm;
        this.pY = (physicsHeight - this.y) * ppm;
        this.pRadius = this.radius * ppm;
        this.pPinRadius = this.pinRadius * ppm;
        this.pPinPositions = [];
    
        this.deltaPI = TWO_PI / this.segments;
    
        this.createBody();
        this.createPins();
    }

    createBody() {
        this.body = new p2.Body({mass:1, position:[this.x, this.y]});
        this.body.angularDamping = 0.0;
        this.body.addShape(new p2.Circle(this.radius));
        this.body.shapes[0].sensor = true; //TODO use collision bits instead

        var axis = new p2.Body({position:[this.x, this.y]});
        var constraint = new p2.LockConstraint(this.body, axis);
        constraint.collideConnected = false;

        world.addBody(this.body);
        world.addBody(axis);
        world.addConstraint(constraint);
    }
    createPins() {
        var l = this.segments,
            pin = new p2.Circle(this.pinRadius);

        pin.material = pinMaterial;

        for (var i = 0; i < l; i++) {
            var x = Math.cos(i / l * TWO_PI) * this.pinDistance,
                y = Math.sin(i / l * TWO_PI) * this.pinDistance;

            this.body.addShape(pin, [x, y]);
            this.pPinPositions[i] = [x * ppm, -y * ppm];
        }
    }
    gotLucky() {
        var currentRotation = wheel.body.angle % TWO_PI,
            currentSegment = Math.floor(currentRotation / this.deltaPI);

        return (currentSegment % 2 === 0);
    }
    draw() {
        // TODO this should be cached in a canvas, and drawn as an image
        // also, more doodads
        ctx.save();
        ctx.translate(this.pX, this.pY);

        ctx.beginPath();
        ctx.fillStyle = '#DB9E36';
        ctx.arc(0, 0, this.pRadius + 24, 0, TWO_PI);
        ctx.fill();
        ctx.fillRect(-12, 0, 24, 400);

        ctx.rotate(-this.body.angle);

        for (var i = 0; i < this.segments; i++) {
            ctx.fillStyle = (i % 2 === 0) ? '#BD4932' : '#FFFAD5';
            ctx.beginPath();
            ctx.arc(0, 0, this.pRadius, i * this.deltaPI, (i + 1) * this.deltaPI);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();
        }

        ctx.fillStyle = '#401911';

        this.pPinPositions.forEach(function(p) {
            ctx.beginPath();
            ctx.arc(p[0], p[1], this.pPinRadius, 0, TWO_PI);
            ctx.fill();
        }, this);

        ctx.restore();
    }

}
