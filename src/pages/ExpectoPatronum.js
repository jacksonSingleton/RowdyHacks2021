import React from 'react';
import * as PIXI from "pixi.js";
var ret = false;

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

        if (('expecto patronum' === transcript) == true) {
            onPlayVideo();
            console.log("video played");
        }
    };

    // start recognition
    recognition.start();

    ret = false;
}


const app = new PIXI.Application({ width: 1280, height: 720, backgroundAlpha: true });
app.loader.add('room', '/src/assets/lumosBG.png');
app.loader.load(setup);
function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.room.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    app.stage.interactive = true;

}
function play() {

    var audio = new Audio('../assets/PatronusSound.wav');
    audio.play();
}
// Create play button that can be used to trigger the video
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




function onPlayVideo() {
    // Don't need the button anymore
    button.destroy();
    play();
    // create a video texture from a path
    const texture = PIXI.Texture.from('../assets/patronus.mp4');

    // create a new Sprite using the video texture (yes it's that easy)
    const videoSprite = new PIXI.Sprite(texture);

    // Stetch the fullscreen
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    app.stage.addChild(videoSprite);

}

const ExpectoPatronum = () => {
    return (
        document.body.appendChild(app.view)
    );
};

export default ExpectoPatronum;
