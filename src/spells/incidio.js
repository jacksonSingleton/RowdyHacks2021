import * as PIXI from "pixi.js";
require("./Particle.js");

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
		"start": 0.1,
		"end": 0.6,
		"minimumScaleMultiplier": 3
	},
	"color": {
		"start": "#fade6c",
		"end": "#d94d1f"
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
	"blendMode": "add",
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
