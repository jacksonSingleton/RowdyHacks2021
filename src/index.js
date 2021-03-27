import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: true
});
document.body.appendChild(app.view);
let container = new PIXI.Container();
var emitter = new particles.Emitter(
   container,
{
	"alpha": {
		"start": 0.68,
		"end": 0.11
	},
	"scale": {
		"start": 0.15,
		"end": 0.6,
		"minimumScaleMultiplier": 3
	},
	"color": {
		"start": "#fade6c",
		"end": "#eb5905"
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
})

// Calculate the current time
var elapsed = Date.now();

// Update function every frame
var update = function(){

    // Update the next frame
    requestAnimationFrame(update);

    var now = Date.now();

    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter.update((now - elapsed) * 0.001);
    elapsed = now;

    // Should re-render the PIXI Stage
    // renderer.render(stage);
};

// Start emitting
emitter.emit = true;

// Start the update
update();