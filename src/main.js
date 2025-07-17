import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

import tutorial from "./scenes/tutorial";
import demo from "./scenes/demo";


// const k = kaplay();
kaplay({
    width: 512,
    height: 448,
    background: [255, 255, 255,],
    scale: 1,
})

// loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("onion", "./sprites/onion.png");
loadSprite("map", "./sprites/map.png");
loadSprite("background_sky","./sprites/background.png");
loadSprite("platform","./sprites/tutorial_platform.png");


onClick(() => addKaboom(mousePos()));


scene("demo", demo)

go("demo");