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