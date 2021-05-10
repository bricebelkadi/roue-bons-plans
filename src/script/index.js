import Konva from 'konva';
import { Wedge } from '../model/wedge';


var width = window.innerWidth;
var height = window.innerHeight;

Konva.angleDeg = false;
var angularVelocity = 6;
var angularVelocities = [];
var lastRotation = 0;
var controlled = false;
var numWedges = 15;
var angularFriction = 0.2;
var target, activeWedge, stage, layer, wheel, pointer;
var finished = false;

function getAverageAngularVelocity() {
    var total = 0;
    var len = angularVelocities.length;

    if (len === 0) {
        return 0;
    }

    for (var n = 0; n < len; n++) {
        total += angularVelocities[n];
    }

    return total / len;
}

function animate(frame) {
    // handle wheel spin
    var angularVelocityChange =
        (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
    angularVelocity -= angularVelocityChange;

    // activate / deactivate wedges based on point intersection
    var shape = stage.getIntersection({
        x: stage.width() / 2,
        y: 100,
    });

    if (controlled) {
        if (angularVelocities.length > 10) {
            angularVelocities.shift();
        }

        angularVelocities.push(
            ((wheel.rotation() - lastRotation) * 1000) / frame.timeDiff
        );
    } else {
        var diff = (frame.timeDiff * angularVelocity) / 1000;
        if (diff > 0.0001) {
            wheel.rotate(diff);
        } else if (!finished && !controlled) {
            if (shape) {
                var text = shape.getParent().findOne('Text').text();
                var price = text.split('\n').join('');
                console.log('You price is ' + price);
            }
            finished = true;
        }
    }
    lastRotation = wheel.rotation();

    if (shape) {
        if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
            pointer.y(20);

            new Konva.Tween({
                node: pointer,
                duration: 0.3,
                y: 30,
                easing: Konva.Easings.ElasticEaseOut,
            }).play();

            if (activeWedge) {
                activeWedge.fillPriority('radial-gradient');
            }
            shape.fillPriority('fill');
            activeWedge = shape;
        }
    }
}
function init() {
    stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
    });
    layer = new Konva.Layer();
    wheel = new Konva.Group({
        x: stage.width() / 2,
        y: 410,
    });

    for (var n = 0; n < numWedges; n++) {
        const wedge = new Wedge(numWedges, n)
        wheel.add(wedge.group);
    }
    pointer = new Konva.Wedge({
        fillRadialGradientStartPoint: {
            x:0,
            y:0
        },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndPoint: {
            x:0,
            y:0
        },
        fillRadialGradientEndRadius: 30,
        fillRadialGradientColorStops: [0, 'white', 1, 'red'],
        stroke: 'white',
        strokeWidth: 2,
        lineJoin: 'meter',
        angle: 1,
        radius: 30,
        x: stage.width() / 2,
        y: 33,
        rotation: -90,
        shadowColor: 'black',
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 2,
        shadowOpacity: 0.5,
    });

    // add components to the stage
    layer.add(wheel);
    layer.add(pointer);
    stage.add(layer);

    // bind events
    wheel.on('mousedown touchstart', function (evt) {
        angularVelocity = 0;
        controlled = true;
        target = evt.target;
        finished = false;
    });
    // add listeners to container
    stage.addEventListener(
        'mouseup touchend',
        function () {
            controlled = false;
            angularVelocity = getAverageAngularVelocity() * 5;

            if (angularVelocity > 20) {
                angularVelocity = 20;
            } else if (angularVelocity < -20) {
                angularVelocity = -20;
            }

            angularVelocities = [];
        },
        false
    );

    stage.addEventListener(
        'mousemove touchmove',
        function (evt) {
            var mousePos = stage.getPointerPosition();
            if (controlled && mousePos && target) {
                var x = mousePos.x - wheel.getX();
                var y = mousePos.y - wheel.getY();
                var atan = Math.atan(y / x);
                var rotation = x >= 0 ? atan : atan + Math.PI;
                var targetGroup = target.getParent();

                wheel.rotation(
                    rotation - targetGroup.startRotation - target.angle() / 2
                );
            }
        },
        false
    );

    var anim = new Konva.Animation(animate, layer);

    // wait one second and then spin the wheel
    setTimeout(function () {
        anim.start();
    }, 1000);
}
init();
