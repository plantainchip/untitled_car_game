import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

// const k = kaplay();
kaplay({
    width: 512,
    height: 448,
    background: [0, 0, 255,],
    scale: 1
})

// loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("onion", "./sprites/onion.png");
loadSprite("map", "./sprites/map.png");

add([sprite("onion"), pos(80, 40)]);

onClick(() => addKaboom(mousePos()));

scene("game", () => {
    let SPEED = 200;
    setGravity(1650);
    setCamPos(130, 320);
    setCamScale(2);
    add([sprite("map")])

    // player
    const player = add([
        sprite("onion"),
        scale(0.6),
        pos(60,0),
        area(),
        body(),
        anchor("center"),
    ])

    // invisible player
    const invisible_player = add([
        sprite("onion"),
        opacity(0.5),
        scale(0.6),
        pos(90,0),
        area(),
        body(),
        anchor("center"),
    ])

    // platform floor
    add([
        rect(800, 48),
        pos(0, height() - 48),
        outline(4),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);

    // camera following player
    onKeyDown("space", () => {
        invisible_player.move(SPEED, 0)
    })

    invisible_player.onUpdate(() => {
        setCamPos(invisible_player.pos)
        if((invisible_player.pos.x - player.pos.x) >= 240){
            // invisible_player.onUpdate.cancel();
            // debug.log(invisible_player.pos)

            // NOTE TO SELF - make this into another function???
            debug.log("player= " + player.pos.x + " cam= " + invisible_player.pos.x + " distance= " + (invisible_player.pos.x - player.pos.x))
        }
        // debug.log("player= " + player.pos.x + " cam= " + invisible_player.pos.x + " distance= " + (invisible_player.pos.x - player.pos.x))
    })
    // make this into an event and then cancel it
    // https://kaplayjs.com/doc/KEventController/

    // woke up and foud this
    // https://kaplayjs.com/doc/ctx/cancel/

})


go("game");