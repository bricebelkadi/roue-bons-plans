import Konva from 'konva';
import { Wedge } from '../model/wedge';
import Config from "../service/config";
import Game from "../model/game"
import "../style/index.css";
import sound from "../asset/click.mp3";


var game = null

var width = window.innerWidth;
var height = window.innerHeight * .8;

Konva.angleDeg = false;
var angularVelocity = 6;
var angularVelocities = [];
var lastRotation = 0;
var controlled = false;
var numWedges = 20;
var angularFriction = 0.2;
var target, activeWedge, stage, layer, wheel, pointer, border;
var finished = false;
var anim;

var click, audioIndex;

var isTest = false;


function launch() {
    isTest = false;
    initEventListener()
    game = new Game();
    anim = new Konva.Animation(animate, layer);
}

function test() {
    isTest = true;
    initEventListener()
    anim = new Konva.Animation(animate, layer);
}

function onMouseDown(evt) {
    angularVelocity = 0;
    controlled = true;
    target = evt.target;
    finished = false;
    anim.start()
}

function onMouseUp() {
    controlled = false;
    angularVelocity = getAverageAngularVelocity() * 5;
    if (angularVelocity > 20) {
        angularVelocity = 20;
    } else if (angularVelocity < -20) {
        angularVelocity = -20;
    }
    angularVelocities = [];
}

function onMouseMove(evt) {
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
}

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

function initEventListener() {
    wheel.on('mousedown touchstart', onMouseDown);
    stage.addEventListener('mouseup touchend', onMouseUp, false);
    stage.addEventListener('mousemove touchmove', onMouseMove, false);
}

function removeEventListener() {
    wheel.off('mousedown touchstart');
    stage.removeEventListener('mouseup touchend', onMouseUp);
    stage.removeEventListener('mousemove touchmove', onMouseMove);
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
                const type = shape.getParent().getAttrs()['type'];
                var text = shape.getParent().findOne('#value').text();
                var price = text.split('\n')
                var number = shape.getParent().findOne('#number').text();
                if (!isTest) {
                    game.updateState(type, parseInt(price, 10), number.toString());
                    if (game.isEnd()) {
                        removeEventListener()
                    }
                } else {
                    removeEventListener()
                }   
            }
            finished = true;
        }
    }
    lastRotation = wheel.rotation();

    if (shape) {
        if (shape && (!activeWedge || shape._id !== activeWedge._id)) {

            pointer.y(50);
            new Konva.Tween({
                node: pointer,
                duration: 0.3,
                y: stage.height() / 2 -250,
                easing: Konva.Easings.ElasticEaseOut,
            }).play();

            if (audioIndex === 9) audioIndex = 0;
            else audioIndex++;

            click[audioIndex].play()


            if (activeWedge) {
                activeWedge.fillPriority('radial-gradient');
                activeWedge.getParent().findOne("#led").fillPriority('radial-gradient');
            }

            shape.fillPriority('fill');
            shape.getParent().findOne("#led").fillPriority('fill');
            activeWedge = shape;
        }
    }
}

function init() {
    const roueConfig = Config.getConfig();

    audioIndex = 0;

    click = [
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound),
        new Audio(sound)
    ]

    stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
    });
    layer = new Konva.Layer();
    wheel = new Konva.Group({
        x: stage.width() / 2,
        y: stage.height() / 2,
    });

    pointer = new Konva.Wedge({
        fillRadialGradientStartPoint: {
            x: 0,
            y: 0
        },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndPoint: {
            x: 0,
            y: 0
        },
        fillRadialGradientEndRadius: 30,
        fillRadialGradientColorStops: [0, 'white', 1, 'red'],
        stroke: 'white',
        strokeWidth: 2,
        lineJoin: 'meter',
        angle: 1,
        radius: 30,
        x: stage.width() / 2,
        y: stage.height() / 2 -260,
        rotation: -90,
        shadowColor: 'black',
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 2,
        shadowOpacity: 0.5,
    });

    border = new Konva.Circle({
        radius: 270,
        fill: 'transparent',
        stroke: '#ccc',
        strokeWidth: 3,
        fill: "rgb(245, 229, 27)",
        x: 0,
        y: 0,

    })
    wheel.add(border)

    for (var n = 0; n < numWedges; n++) {
        const wedge = new Wedge(numWedges, n, roueConfig[n].type, roueConfig[n].value)
        wheel.add(wedge.group);
    }

    
    // add components to the stage
    layer.add(wheel);
    layer.add(pointer);
    stage.add(layer);

    document.getElementById('launch').addEventListener('click', launch);
    document.getElementById('test').addEventListener('click', test)

}


init();
