const Comp = Matter.Composite,
    Engine = Matter.Engine,
    BOTTOM_GAP = 50,
    TOP_GAP = 70

let W, H,
    world = Comp.create({
        label: "world"
    }),
    engine = Engine.create({
        world: world
    }),
    spacing = 200,
    rows = 5,
    pinRadius = 10,
    colors = [
        [255, 0, 98],
        [87, 180, 90],
        [200, 100, 0]
    ]

function setup() {
    W = windowWidth
    H = windowHeight
    createCanvas(W, H)
    background(0)
    rectMode(CENTER)
    Comp.add(world, Matter.Bodies.rectangle(W / 2, H, W, 50, {
        isStatic: true,
        label: "Floor"
    }))
    Comp.add(world, Matter.Bodies.rectangle(0, H / 2, 50, H, {
        isStatic: true,
        label: "WallR"
    }))
    Comp.add(world, Matter.Bodies.rectangle(W, H / 2, 50, H, {
        isStatic: true,
        label: "WallL"
    }))

    let rowy = TOP_GAP,
        ySpacing = floor((H - (TOP_GAP + BOTTOM_GAP)) / rows)

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < floor(W / spacing) + 1 ; j++) {
            console.log("data", (j * spacing) + (i % 2 == 0 ? spacing / 2 : 0), rowy, pinRadius)
            Comp.add(world, Matter.Bodies.circle((j * spacing) + ((i % 2 == 0) ? spacing / 2 : 0), rowy, pinRadius, {
                label: "pin",
                isStatic: true
            }))
            colors.push([random(256), random(256), random(256)])
            console.log(j, rowy)
        }
        rowy += ySpacing
    }

    for (const b of world.bodies) {
        console.log(`:)`, b.position)
    }
}

function mousePressed() {
    Comp.add(world, Matter.Bodies.circle(mouseX, mouseY, 60,{label:"pin", restitution:0.6}))
    colors.push([random(256), random(256), random(256)])
}

function calcW(body) {
    return [dist(body.vertices[0].x, body.vertices[0].y, body.vertices[1].x, body.vertices[1].y), dist(body.vertices[0].x, body.vertices[0].y, body.vertices[3].x, body.vertices[3].y)]
}

function draw() {
    background(0)
    let index = 0
    for (const bod of world.bodies) {
        resetMatrix()
        fill(colors[index][0], colors[index][1], colors[index][2])
        if (bod.label == "Rectangle Body") {
            let [w, h] = calcW(bod)
            translate(bod.position.x, bod.position.y)
            rotate(bod.angle)
            rect(0, 0, w, h)
        }
        if (bod.label == "Floor" || bod.label == "WallR" || bod.label == "WallL") {
            let [w, h] = calcW(bod)
            translate(bod.position.x, bod.position.y)
            rotate(bod.angle)
            rect(0, 0, w, h)
        }
        if (bod.label == "pin") {
            ellipse(bod.position.x, bod.position.y, 2 * bod.circleRadius)
        }

        index++
    }
    Engine.update(engine)
}