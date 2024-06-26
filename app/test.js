"use client";
import { useEffect } from "react";
import Matter from "matter-js";

const MatterComponent = () => {
  useEffect(() => {
    // Matter.js code here

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Events = Matter.Events,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // create an engine
    var engine = Engine.create(),
      world = engine.world;

    // adjust the gravity
    engine.world.gravity.y = 0.85; // reduce this value to slow down the falling speed

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        background: "#080808",
        wireframes: false,
      },
    });

    // create bounds
    var ground = Bodies.rectangle(0, 300, window.innerWidth / 5, 250, {
      isStatic: true,
      render: {
        sprite: {
          texture: "7.png", // Replace with the path to your texture image
          xScale: 1, // Adjust the scale as needed
          yScale: 1, // Adjust the scale as needed
        },
      },
    });

    // Calculate position for bottom left corner
    var xPosition =
      ground.position.x + (ground.bounds.max.x - ground.bounds.min.x) / 2;
    var yPosition =
      window.innerHeight - (ground.bounds.max.y - ground.bounds.min.y) / 2;

    // Update ground object with new position
    Matter.Body.setPosition(ground, { x: xPosition, y: yPosition });

    var wallLeft = Bodies.rectangle(
      -80,
      window.innerHeight / 2,
      160,
      window.innerHeight,
      { isStatic: true }
    );
    var wallRight = Bodies.rectangle(
      window.innerWidth + 80,
      window.innerHeight / 2,
      160,
      1200,
      { isStatic: true }
    );
    var roof = Bodies.rectangle(
      window.innerWidth / 2 + 160,
      -80,
      window.innerWidth + 320,
      160,
      { isStatic: true }
    );

    // object colors & variables
    var arts = "#EDDC8C";
    var videos = "#B3E8F3";
    var abouts = "#4D4D4D";

    var border = 2;
    var radius = 20;

    // create objects

    //misc
    var s1 = Bodies.rectangle(360, 420, 108, 40, {
      chamfer: { radius: radius },
      render: { sprite: { texture: "6.png", xScale: 1, yScale: 1 } },
    });
    var s2 = Bodies.rectangle(600, 380, 92, 40, {
      chamfer: { radius: radius },
      render: { sprite: { texture: "5.png", xScale: 1, yScale: 1 } },
    });
    var s3 = Bodies.rectangle(400, 360, 86, 40, {
      chamfer: { radius: radius },
      render: { sprite: { texture: "4.png", xScale: 1, yScale: 1 } },
    });
    //about
    var s4 = Bodies.rectangle(230, 140, 87, 40, {
      chamfer: { radius: radius },
      render: { sprite: { texture: "1.png", xScale: 1, yScale: 1 } },
    });
    var s5 = Bodies.rectangle(420, 200, 40, 40, {
      id: "instagramBody",
      chamfer: { radius: radius },
      render: { sprite: { texture: "3.png", xScale: 1, yScale: 1 } },
    });
    var s6 = Bodies.rectangle(230, 180, 112, 40, {
      chamfer: { radius: radius },
      render: { sprite: { texture: "2.png", xScale: 1, yScale: 1 } },
    });

    // add all of the bodies to the world
    World.add(engine.world, [
      ground,
      wallLeft,
      wallRight,
      roof,
      s1,
      s2,
      s3,
      s4,
      s5,
      s6,
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // Allow page scrolling in matter.js window
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Detect clicks vs. drags
    let click = false;

    document.addEventListener("mousedown", () => (click = true));
    document.addEventListener("mousemove", () => (click = false));
    document.addEventListener("mouseup", () =>
      console.log(click ? "click" : "drag")
    );

    // Create a On-Mouseup Event-Handler
    Events.on(mouseConstraint, "mouseup", function (event) {
      var mouseConstraint = event.source;
      var bodies = engine.world.bodies;
      if (!mouseConstraint.bodyB) {
        for (let i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          // Check if clicked or dragged
          if (click === true) {
            if (
              Matter.Bounds.contains(
                body.bounds,
                mouseConstraint.mouse.position
              )
            ) {
              var bodyUrl = body.url;
              console.log("Body.Url >> " + bodyUrl);
              // Hyperlinking feature
              if (bodyUrl != undefined) {
                //window.location.href = bodyUrl;
                window.open(bodyUrl, "_blank");
                console.log("Hyperlink was opened");
              }
              break;
            }
          }
        }
      }
    });

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    // Cleanup on component unmount
    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return null;
};

export default MatterComponent;
