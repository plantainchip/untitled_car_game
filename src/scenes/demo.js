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
    let SPEED = 300;
    setGravity(2000);
    // setCamScale(1);

    // creating level 00 - demo +++++++++++++++++++++++++++++++
    layer(["background", "game", "foreground"])

    //the background =========================================
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
        rect(5120,10),
        opacity(1),
        pos(0,350),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    // platforms ---------------------

    add([
        rect(180,10),
        opacity(1),
        pos(394,77),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        rect(100,10),
        opacity(1),
        pos(937,184),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        pos(1080, 146),
        polygon([vec2(0,0), vec2(300,-100), vec2(300,-80), vec2(0,20)]),
        color(127,200,255),
        area(),
        body({isStatic: true}),
    ])

    add([
        pos(1380, 66),
        polygon([vec2(0,0), vec2(300,100), vec2(300,80), vec2(0,-20)]),
        color(127,200,255),
        area(),
        body({isStatic: true}),
    ])

    add([
        pos(1680,146),
        opacity(1),
        rect(140,20),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        pos(1900,240),
        opacity(1),
        rect(290,10),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    

    

    



    // player hand =========================================
    const player = add([
        sprite("hand"),
        scale(1.5),
        pos(128, 280),
        anchor("center"),
        area(),
        body(),
        doubleJump(2),
        "player"
    ])

    // onUpdate("player", (player)=>{
    //     debug.log("p", player.pos.x)

    // }) 

    // onMouseMove((pos) => {
    //     debug.log(pos.x + " " + pos.y)
    // })

    // onMouseMove((pos) => {
    //     debug.log("x",player.pos.x, "y", pos.y )
    //     debug.log(" ")
    // })

    const window_frame = add([ 
        sprite("border"),
        scale(2),
        pos(0,0),
        body({isStatic: true})
    ])

    // hand movement logic ----------------

    onKeyDown("d", () => {
        player.move(SPEED, 0)
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0)
    });

    onKeyPress("w", () => {
        // if(player.isGrounded() ){
        //     player.jump();
        // }
        player.doubleJump()
    })

    // camera logic =========================================

    const invisible_player = add([
        sprite("onion"),
        scale(0.3),
        pos(128, 380),
        anchor("center"),
        area(),
        body()
    ])

    add([
        rect(5120,10),
        opacity(1),
        pos(0,400),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    // camera logic to follow cam ---------------------------
    onKeyDown("space", () => {
        if(invisible_player.pos.x <= 2736){
            if((invisible_player.pos.x - player.pos.x) <= 199){
            invisible_player.move(SPEED-50, 0);
            window_frame.move(SPEED-50,0)
            }
        }
        
    })
    // camera position -----------------------------------
    const original_cam_posx = invisible_player.pos.x
    invisible_player.onUpdate(() => {
        if((invisible_player.pos.x - player.pos.x) <= 200){
            setCamPos(invisible_player.pos.x +original_cam_posx, height()/2  ) // updates cam
            debug.log(invisible_player.pos.x.toFixed(0) + " " + invisible_player.pos.y.toFixed(0));
        }
    })

    // car spawning =========================================

    let max = 4; // frequency of cars
    // MOVING CARS
    function spawnCar() {
        max -= 0.1;
        const box = add([
            sprite("car"),
            scale(2),
            area(),
            body(),
            pos(3500, 350),
            anchor("botleft"),
            move(LEFT, 260),
            offscreen(), 
            "obstacle",
        ]);

        // if player dodges box and it moves off screen
        box.onUpdate(() => {
            if(box.pos.x <= -200) {
                box.destroy();
            }
        });

        if (max <= 1){
            max = 3;    
        }

        wait(rand(1, max), () => {
            if((invisible_player.pos.x ) <= 400){
                console.log("spawn")
                spawnCar()
            }
            if(invisible_player.pos.x >= 1500 && invisible_player.pox.x <2700){
                spawnCar()
            }
        });
    }

    // this makes it rain cars
    // invisible_player.onUpdate(() => {
    //     if((invisible_player.pos.x ) <= 200){
    //         spawnCar()
    //     }
    // })


    spawnCar();

    


}