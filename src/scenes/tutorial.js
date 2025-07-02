import "kaplay/global"; 

export default function() {

    loadSprite("hand","./sprites/hand_still1.png");
    loadSprite("test_level","./sprites/test_level.png");

    let SPEED = 200;
    setGravity(1650);
    setCamScale(1.5);
    
    // level design
    const testlvl = add([
        sprite("test_level"),
        pos(0, height() - 80),
        anchor("left"),
        body({ isStatic: true }),
        layer("foreground")
    ]);

    layer(["background", "game", "foreground"], "game")



    // player
    const player = add([
        sprite("hand"),
        scale(1),
        pos(60,height()),
        area(),
        body(),
        anchor("center"),
        layer("game")
    ])

    // invisible player
    const invisible_player = add([
        sprite("onion"),
        opacity(0.5),
        scale(0.6),
        pos(270,height()),
        area(),
        body(),
        anchor("center"),
        layer("game")
    ])

    // platform floor
    add([
        rect(1000, 80),
        opacity(1),
        pos(0, height()),
        outline(4),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
        layer("game")
    ]);


    // camera following invisible player
    onKeyDown("space", () => {
        if((invisible_player.pos.x - player.pos.x) <= 300){
            invisible_player.move(SPEED, 0)
        }
    })
    // camera position
    invisible_player.onUpdate(() => {
        if((invisible_player.pos.x - player.pos.x) <= 300){
            setCamPos(invisible_player.pos.x - 100, invisible_player.pos.y - 32) // updates cam
            // debug.log(invisible_player.pos.x.toFixed(0) + " " + invisible_player.pos.y.toFixed(0));
        }
    })

    // player running
    onKeyDown("d", () => {
            player.move(SPEED, 0)
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0)
    });

}