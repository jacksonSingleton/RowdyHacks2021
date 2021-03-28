import React from 'react';
import styled from "styled-components";
import * as PIXI from "pixi.js";
require("../spells/Particle.js");


const app = new PIXI.Application({
    backgroundAlpha: false
});
app.loader.add('room', '/src/assets/lumosBG.png');
app.loader.load(setup);
function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.room.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    app.stage.interactive = true;

}
const Incindio = () => {
    return (
        document.body.appendChild(app.view)
    );
};
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


function play() {
    
    var audio = new Audio('../assets/nice.wav');
    audio.play();
  }
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #fffffe;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  margin: 3em;
  padding: 4em;
  background: #1b1b1b;
`;



export default Incindio;

function listenToUser(phrase){
    var transcript = "";
    var confidence = "";
    // New speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    //recognition.continuous = true;

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("Voice Recognition listening. Speak into the microphone.");
    };

    recognition.onspeechend = function() {
        // Stop when user is done speaking
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        transcript = event.results[0][0].transcript;
        confidence = event.results[0][0].confidence;
        console.log(transcript);
        
        if (('incendio' === transcript) == true) {
            onPlayVideo();
            console.log("video played");
        }
    };

    // start recognition
    recognition.start();
     
    ret = false;
}

const button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);

// Position the button
button.x = (app.screen.width - button.width) / 2;
button.y = (app.screen.height - button.height) / 2;

// Enable interactivity on the button
button.interactive = true;
button.buttonMode = true;

// Add to the stage
app.stage.addChild(button);

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', listenToUser);