/////////////////////////////
// arrow on top of the wheel of fortune
/////////////////////////////

export default class Arrow {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.verts = [];
    
        this.pX = this.x * ppm;
        this.pY = (physicsHeight - this.y) * ppm;
        this.pVerts = [];
    
        this.createBody();
    }

    createBody() {
        this.body = new p2.Body({mass:1, position:[this.x, this.y]});
        this.body.addShape(this.createArrowShape());

        var axis = new p2.Body({position:[this.x, this.y]});
        var constraint = new p2.RevoluteConstraint(this.body, axis, {
            worldPivot:[this.x, this.y]
        });
        constraint.collideConnected = false;

        var left = new p2.Body({position:[this.x - 2, this.y]});
        var right = new p2.Body({position:[this.x + 2, this.y]});
        var leftConstraint = new p2.DistanceConstraint(this.body, left, {
            localAnchorA:[-this.w * 2, this.h * 0.25],
            collideConnected:false
        });
        var rightConstraint = new p2.DistanceConstraint(this.body, right, {
            localAnchorA:[this.w * 2, this.h * 0.25],
            collideConnected:false
        });
        var s = 32,
            r = 4;

        leftConstraint.setStiffness(s);
        leftConstraint.setRelaxation(r);
        rightConstraint.setStiffness(s);
        rightConstraint.setRelaxation(r);

        world.addBody(this.body);
        world.addBody(axis);
        world.addConstraint(constraint);
        world.addConstraint(leftConstraint);
        world.addConstraint(rightConstraint);
    }

    createArrowShape() {
        this.verts[0] = [0, this.h * 0.25];
        this.verts[1] = [-this.w * 0.5, 0];
        this.verts[2] = [0, -this.h * 0.75];
        this.verts[3] = [this.w * 0.5, 0];

        this.pVerts[0] = [this.verts[0][0] * ppm, -this.verts[0][1] * ppm];
        this.pVerts[1] = [this.verts[1][0] * ppm, -this.verts[1][1] * ppm];
        this.pVerts[2] = [this.verts[2][0] * ppm, -this.verts[2][1] * ppm];
        this.pVerts[3] = [this.verts[3][0] * ppm, -this.verts[3][1] * ppm];

        var shape = new p2.Convex(this.verts);
        shape.material = arrowMaterial;

        return shape;
    }
    hasStopped() {
        var angle = Math.abs(this.body.angle % TWO_PI);

        return (angle < 1e-3 || (TWO_PI - angle) < 1e-3);
    }

    update() {

    }

    draw() {
        ctx.save();
        ctx.translate(this.pX, this.pY);
        ctx.rotate(-this.body.angle);

        ctx.fillStyle = '#401911';

        ctx.beginPath();
        ctx.moveTo(this.pVerts[0][0], this.pVerts[0][1]);
        ctx.lineTo(this.pVerts[1][0], this.pVerts[1][1]);
        ctx.lineTo(this.pVerts[2][0], this.pVerts[2][1]);
        ctx.lineTo(this.pVerts[3][0], this.pVerts[3][1]);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

}