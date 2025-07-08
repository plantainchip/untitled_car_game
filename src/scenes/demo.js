import "kaplay/global"; 

export default function() {

    // loading the assets
    loadSprite("border","./sprites/demo_border.png");
    loadSprite("car","./sprites/demo_car.png");
    loadSprite("hand","./sprites/demo_hand.png");
    loadSprite("ground","./sprites/demo_ground.png");
    loadSprite("midground","./sprites/demo_midground.png");
    loadSprite("sky","./sprites/demo_sky.png");


    // setting up variables
    let SPEED = 200;
    setGravity(2000);
    // setCamScale(1);

    // creating level 00 - demo +++++++++++++++++++++++++++++++
    layer(["background", "game", "foreground"])

    //the background -----------------
    add([
        sprite("sky"),
        scale(2),
    ])

    add([
        sprite("midground"),
        scale(2)
    ])

    add([
        sprite("ground"),
        scale(2)
    ])

    add([
        rect(2240,10),
        opacity(1),
        pos(0,350),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    const player = add([
        sprite("hand"),
        scale(2),
        pos(128, 280),
        anchor("center"),
        area(),
        body()
    ])

    add([
        sprite("car"),
        scale(2),
        pos(328, 300),
        anchor("center"),
        area(),
        body()
    ])

    add([ // keep the border at the bottom of file
        sprite("border"),
        scale(2)
    ])


    // hand movement logic ----------------

    onKeyDown("d", () => {
        player.move(SPEED, 0)
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0)
    });

    onKeyPress("w", () => {
        if(player.isGrounded() ){
            player.jump();
        }
    })


}