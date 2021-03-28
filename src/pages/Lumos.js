import React from 'react';
import * as PIXI from "pixi.js";
function play() {

    var audio = new Audio('../assets/nice.wav');
    audio.play();
}

const app = new PIXI.Application({width: 1280, height: 720});


// Inner radius of the circle
var radius = 0;

// The blur amount
const blurSize = 56;

app.loader.add('room', '/src/assets/lumosBG.png');
app.loader.add('roomb', '/src/assets/lumosblackBG.png');
app.loader.load(setupOne);
function setupOne(loader, resources) {
    const background = new PIXI.Sprite(resources.roomb.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    app.stage.interactive = true;

}

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
function update(rad){
    radius = rad;
    app.loader.load(setup);
}
const Lumos = () => {
    return (
        document.body.appendChild(app.view)
    );
};

export default Lumos;

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

        if (('lumos' === transcript) == true) {
            play();
            update(100);
            console.log("video played");
        }
        if (('Knox' === transcript) == true) {
            play();
            app.stage.removeChild(focus);
            play();
            update(0);
            app.loader.load(setupOne);
            console.log("video played");
        }
    };

    // start recognition
    recognition.start();


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
