import * as PIXI from "pixi.js";
require("./avadaKadevra.js");

// This is some extra shit that ties into
// other projects
/*
const app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: false
});
document.body.appendChild(app.view);
new ParticleExample(
	["./assets/particle.png"],
{
	"alpha": {
		"start": 0.68,
		"end": 0.11
	},
	"scale": {
		"start": 0.4,
		"end": 0.2,
		"minimumScaleMultiplier": 3
	},
	"color": {
		"start": "#fade6c",
		"end": "#eb2305"
	},
	"speed": {
		"start": 250,
		"end": 300,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 3,
		"y": -2500
	},
	"maxSpeed": 250,
	"startRotation": {
		"min": 7,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.28,
		"max": 0.9
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 500,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
})*/


const app = new PIXI.Application({width: 1280, height: 720});
document.body.appendChild(app.view);

// Inner radius of the circle
const radius = 100;

// The blur amount
const blurSize = 56;

app.loader.add('room', '/src/assets/lumosBG.png');
app.loader.load(setup);

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.room.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
    const focus = new PIXI.Sprite(texture);

    app.stage.addChild(focus);
    background.mask = focus;

    app.stage.interactive = true;
    app.stage.on('mousemove', pointerMove);
    function pointerMove(event) {
        focus.position.x = event.data.global.x - focus.width / 2;
        focus.position.y = event.data.global.y - focus.height / 2;
    }
}
