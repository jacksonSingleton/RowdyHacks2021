import React from 'react';
import * as PIXI from "pixi.js";
import "../components/VoiceRec.js";



const ExpectoPatronum = () => {
    const app = new PIXI.Application({ backgroundAlpha: true });
    document.body.appendChild(app.view)
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
        .moveTo(100, 30)
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
    button.on('pointertap', onPlayVideo);

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
    return (
        app.view
    );
};

export default ExpectoPatronum;
