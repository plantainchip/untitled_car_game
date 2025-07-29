import "kaplay/global"; 

export default function() {

    // loading the assets
    loadSprite("border","./sprites/demo_border.png");
    loadSprite("car","./sprites/demo_car.png");
    loadAseprite("hand_move","./sprites/hand_move.png","./sprites/hand_move.json");
    loadSprite("bin","./sprites/demo_bin.png");
    loadSprite("sign","./sprites/demo_sign.png");
    loadSprite("ground","./sprites/demo_ground.png");
    loadSprite("midground","./sprites/demo_midground.png");
    loadSprite("sky","./sprites/demo_sky.png");

    // setting up variables
    let SPEED = 300;
    setGravity(2000);
    // setCamScale(1);

    // creating level 00 - demo +++++++++++++++++++++++++++++++


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

    add([ // bottom platform
        rect(5120,10),
        opacity(0),
        pos(0,350),
        area(),
        body({isStatic: true}),
        color(127,200,255),
        "floor"
    ])

    add([
        text("dont touch the floor",{
            size:16,
        }),
        pos(50,360),
    ])

    add([
        text("wasd to move player",{
            size:16,
        }),
        pos(50,280),
    ])
    add([
        text("left arrow to move car",{
            size:16,
        }),
        pos(50,300),
    ])

    // platforms ---------------------

    add([ //bin 1
        sprite("bin"),
        scale(2),
        pos(180,190)
    ])

    
    add([ // rec for bin1
        pos(180,190),
        rect(40,10),
        opacity(0),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([ //bin 2
        sprite("bin"),
        scale(2),
        pos(3300,230)
    ])

    
    add([ // rec for bin2
        pos(3300,230),
        rect(40,10),
        opacity(0),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([ //sign 
        sprite("sign"),
        scale(2),
        pos(2690,170)
    ])

    
    add([ // rec for sign
        pos(2690,170),
        rect(40,10),
        opacity(0),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        rect(180,10),
        opacity(0),
        pos(394,77),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        rect(40,10),
        opacity(0),
        pos(890,200),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        rect(100,10),
        opacity(0),
        pos(937,184),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        pos(1080, 146),
        opacity(0),
        polygon([vec2(0,0), vec2(300,-100), vec2(300,-80), vec2(0,20)]),
        color(127,200,255),
        area(),
        body({isStatic: true}),
    ])

    add([
        pos(1380, 66),
        opacity(0),
        polygon([vec2(0,0), vec2(300,100), vec2(300,80), vec2(0,-20)]),
        color(127,200,255),
        area(),
        body({isStatic: true}),
    ])

    add([
        pos(1680,146),
        opacity(0),
        rect(140,20),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        pos(1900,240),
        opacity(0),
        rect(290,10),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    add([
        pos(3500,280),
        opacity(0),
        rect(290,10),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])
    add([
        pos(3790,290),
        opacity(0),
        rect(290,10),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])


    // player hand =========================================
    const player = add([
        sprite("hand_move",{
            anim: "idle"
        }),
        scale(1.5),
        pos(180, 20),
        anchor("center"),
        area(),
        body(),
        doubleJump(2),
        animate(),
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

    

    // hand movement logic ----------------

    onKeyPress("d", () => {
        player.play("run")
    })

    onKeyDown("d", () => {
        
        player.move(SPEED, 0)

        // ENDING the game
        if(player.pos.x >= 3900){
            // this makes it rain cars
            invisible_player.onUpdate(() => {
                if((invisible_player.pos.x ) <= 4000){
                    spawnCar(4000);
                }
            })
            // this restarts the game
            wait(3, () => {
                go("demo");
            })
        }

    });

    onKeyRelease("d", () => {
        player.play("idle")
        
    });

    

    onKeyPress("a", () => {
        player.play("run")
    })

    onKeyDown("a", () => {
        player.move(-SPEED, 0)
        
    });

    onKeyRelease("a", () => {
        player.play("idle")
        
    });

    onKeyPress("w", () => {
        // if(player.isGrounded() ){
        //     player.jump();
        // }
        player.doubleJump()
        player.play("jump")
    })

    onKeyRelease("w", () => {
        player.play("idle")
        
    });

    // floor is lava - END GAME
    player.onCollide("floor", () => {
        // this restarts the game
        go("demo");
    })
    
    

    



    // camera logic =========================================

    const invisible_player = add([
        sprite("onion"),
        scale(0.3),
        opacity(0),
        pos(128, 380),
        anchor("center"),
        area(),
        body()
    ])

    add([ //invisible player floor
        rect(5120,10),
        opacity(0),
        pos(0,400),
        area(),
        body({isStatic: true}),
        color(127,200,255)
    ])

    // camera logic to follow cam ---------------------------
    onKeyDown("right", () => {
        if(invisible_player.pos.x <= 3500){
            if((invisible_player.pos.x - player.pos.x) <= 199){
            invisible_player.move(SPEED-50, 0);
            window_frame.move(SPEED-50,0)
            }
        }
        
    })
    // camera position -----------------------------------
    const original_cam_posx = invisible_player.pos.x

    // handles what happens when player moves foward
    invisible_player.onUpdate(() => {
        if((invisible_player.pos.x - player.pos.x) <= 200){
            setCamPos(invisible_player.pos.x +original_cam_posx, height()/2  ) // updates cam
            // debug.log(invisible_player.pos.x.toFixed(0) + " " + invisible_player.pos.y.toFixed(0));
        }

    })

    // car spawning =========================================

    let max = 4; // frequency of cars
    // MOVING CARS
    function spawnCar(x_axis = 600) {
        console.log(x_axis)
        max -= 0.1;
        const box = add([
            sprite("car"),
            scale(2),
            area(),
            body(),
            // pos(4000, 350),
            pos(x_axis, 350),
            anchor("botleft"),
            move(LEFT, 260),
            offscreen(), 
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
                console.log("spawn less than 400")
                spawnCar(1200)
            }else if(invisible_player.pos.x <= 3000){
                console.log("invisible player past 1500")
                spawnCar(3500)
            } else {
                return ;
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

    const window_frame = add([ 
        sprite("border"),
        scale(2),
        pos(0,0),
        body({isStatic: true}),
        z(10)
    ])
    

}