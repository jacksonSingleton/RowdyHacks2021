import React from 'react';
import * as PIXI from "pixi.js";

function play() {
    
    var audio = new Audio('../assets/nice.wav');
    audio.play();
  }

// Based somewhat on this article by Spicy Yoghurt
// URL for further reading: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
const app = new PIXI.Application({ backgroundColor: 0x1B1B1B, width: 1280, height: 720});


app.loader.add('room', '/src/assets/lumosBG.png');


// Options for how objects interact
// How fast the red square moves
let movementSpeed = 0;

// Strength of the impulse push between two objects

// Test For Hit
// A basic AABB check between two different squares
// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
// Listen for animate update

let crateTexture = PIXI.Texture.from('../assets/crateTexture.png')
const redSquare = new PIXI.Sprite(crateTexture);
redSquare.width = 256;
redSquare.height = 256;
redSquare.position.set(920, 480);
//redSquare.tint = '0xFF0000';
redSquare.acceleration = new PIXI.Point(0);
redSquare.mass = 1; 

function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

app.ticker.add((delta) => {
    // Applied deacceleration for both squares, done by reducing the
    // acceleration by 0.01% of the acceleration every loop
    redSquare.acceleration.set(redSquare.acceleration.x * 2.45, redSquare.acceleration.y * 2.45);

    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    // If the mouse is off screen, then don't update any further
    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
        // Get the red square's center point
        const redSquareCenterPosition = new PIXI.Point(
            redSquare.x + (redSquare.width * 0.5),
            redSquare.y + (redSquare.height * 0.5),
        );

        // Calculate the direction vector between the mouse pointer and
        // the red square
        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y,
        );

        // Use the above to figure out the angle that direction has
        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

        // Figure out the speed the square should be travelling by, as a
        // function of how far away from the mouse pointer the red square is
        const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition,
        );
        const redSpeed = distMouseRedSquare * movementSpeed;

        // Calculate the acceleration of the red square
        redSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }
    redSquare.x += redSquare.acceleration.x * delta;
    redSquare.y += redSquare.acceleration.y * delta;
});

// Add to stage

function setup(loader, resources){
    const background = new PIXI.Sprite(resources.room.texture);
    app.stage.addChild(background);
    app.stage.addChild(redSquare);
    background.width = app.screen.width;
    background.height = app.screen.height;
}
app.loader.load(setup);

const WingardiumLeviosa = () => {
    return (
        document.body.appendChild(app.view)
    );
};

export default WingardiumLeviosa;

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
        
        if (('Wingardium Leviosa' === transcript) == true) {
            movementSpeed = 0.09;
            console.log("video played");
            play();
            button.destroy();
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