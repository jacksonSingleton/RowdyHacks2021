import * as PIXI from "pixi.js";


const app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: true
});
document.body.appendChild(app.view);

let circleCount = 15;

let fireCircles = [];

const fireColors = [
    0x261A18,
    0xA65233,
    0xF27F3D,
    0xF2AC57,
    0xF2E750
];

const fire = new PIXI.Graphics();

app.stage.addChild(fire);
app.stage.interactive = true;
window.app = app;

function getColor(colors){
    return colors[Math.floor(Math.random() * colors.length)]
}
function circleSize(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
function createFire(event) {
    fire.beginFill(getColor(fireColors));
    fire.drawCircle(event.data.global.x, event.data.global.y, circleSize(5,20))
    fire.endFill();
    console.log("mouse pressed");
}
let tick = 0;
app.ticker.add(() => {
     
    app.renderer.plugins.interaction.on('mousedown', createFire);
    tick += 0.1;
})