import React from 'react';
import * as PIXI from "pixi.js";

function play() {
    
    var audio = new Audio('../assets/nice.wav');
    audio.play();
  }

// Based somewhat on this article by Spicy Yoghurt
// URL for further reading: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
const app = new PIXI.Application({ backgroundColor: 0x1B1B1B });


// Options for how objects interact
// How fast the red square moves
const movementSpeed = 1.00;

// Strength of the impulse push between two objects
const impulsePower = 5;

// Test For Hit
// A basic AABB check between two different squares
function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
function collisionResponse(object1, object2) {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

// Calculate the distance between two given points
function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

// The green square we will knock about
const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
greenSquare.width = 100;
greenSquare.height = 100;
greenSquare.tint = '0x00FF00';
greenSquare.acceleration = new PIXI.Point(0);
greenSquare.mass = 3;

// The square you move around
const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
//redSquare.position.set(0, 0);
//redSquare.width = 100;
//redSquare.height = 100;
redSquare.tint = '0xFFFFFE';
redSquare.acceleration = new PIXI.Point(0);
redSquare.mass = 1;

// Listen for animate update
app.ticker.add((delta) => {
    // Applied deacceleration for both squares, done by reducing the
    // acceleration by 0.01% of the acceleration every loop
    redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99);
    greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99);

    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    // Check whether the green square ever moves off the screen
    // If so, reverse acceleration in that direction
    if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100)) {
        greenSquare.acceleration.x = -greenSquare.acceleration.x;
    }

    if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100)) {
        greenSquare.acceleration.y = -greenSquare.acceleration.y;
    }

    // If the green square pops out of the cordon, it pops back into the
    // middle
    if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30))
        || greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30)) {
        greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
    }

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

    // If the two squares are colliding
    if (testForAABB(greenSquare, redSquare)) {
        // Calculate the changes in acceleration that should be made between
        // each square as a result of the collision
        const collisionPush = collisionResponse(greenSquare, redSquare);
        // Set the changes in acceleration for both squares
        redSquare.acceleration.set(
            (collisionPush.x * greenSquare.mass),
            (collisionPush.y * greenSquare.mass),
        );
        greenSquare.acceleration.set(
            -(collisionPush.x * redSquare.mass),
            -(collisionPush.y * redSquare.mass),
        );
    }

    greenSquare.x += greenSquare.acceleration.x * delta;
    greenSquare.y += greenSquare.acceleration.y * delta;

    redSquare.x += redSquare.acceleration.x * delta;
    redSquare.y += redSquare.acceleration.y * delta;
});

// Add to stage
app.stage.addChild(redSquare, greenSquare);


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