"use client";
import { useEffect } from "react";
import Matter from "matter-js";

// Utility functions
function clamp(min, val, max) {
  return Math.max(min, Math.min(val, max));
}

function vwToPx(vw) {
  return (vw * window.innerWidth) / 100;
}

function remToPx(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function calcVw(value) {
  const vw = parseFloat(value);
  return vwToPx(vw);
}

const min = 10; // min value in pixels
const max = 1000; // max value in pixels

const MatterComponent = () => {
  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;
    // Runner = Matter.Runner,
    // Events = Matter.Events,
    // MouseConstraint = Matter.MouseConstraint,
    // Mouse = Matter.Mouse;

    // create an engine
    const engine = Engine.create();

    // adjust the gravity
    engine.world.gravity.y = 0.85; // reduce this value to slow down the falling speed

    // create a renderer
    const container = document.getElementById("matter-container");
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        pixelRatio: 1,
        // background: "#080808",
        wireframes: false,
      },
    });

    // create bounds
    const ground = Bodies.rectangle(
      0,
      0,
      clamp(min, calcVw(19.444) + remToPx(0.1), max),
      clamp(min, calcVw(12.333) + remToPx(0.1), max),
      {
        isStatic: true,
        render: {
          sprite: {
            texture: "7.png", // Replace with the path to your texture image
            xScale: clamp(min, calcVw(19.444) + remToPx(0.1), max) / 350, // Adjust the scale as needed
            yScale: clamp(min, calcVw(12.333) + remToPx(0.1), max) / 222, // Adjust the scale as needed
          },
        },
      }
    );

    // Calculate position for bottom left corner
    const xPosition =
      ground.position.x + (ground.bounds.max.x - ground.bounds.min.x) / 2;
    const yPosition =
      container.clientHeight - (ground.bounds.max.y - ground.bounds.min.y) / 2;

    // Update ground object with new position
    Matter.Body.setPosition(ground, { x: xPosition, y: yPosition });

    const radius = clamp(min, calcVw(1.111) + remToPx(0.1), max);
    // create objects
    const ele1 = Bodies.rectangle(
      // clamp(min, calcVw(12.778) + remToPx(0.1), max),
      // clamp(min, calcVw(7.778) + remToPx(0.1), max),
      200, 120,
      clamp(min, calcVw(9.056) + remToPx(0.1), max),
      clamp(min, calcVw(4.5) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        render: {
          sprite: {
            texture: "1.png",
            xScale: 0.9 * clamp(min, calcVw(9.056) + remToPx(0.1), max) / 163,
            yScale: 0.9 * clamp(min, calcVw(4.5) + remToPx(0.1), max) / 81,
          },
        },
      }
    );
    const ele2 = Bodies.rectangle(
      // clamp(min, calcVw(12.778) + remToPx(0.1), max),
      // clamp(min, calcVw(10) + remToPx(0.1), max),
      400, 140,
      clamp(min, calcVw(21.611) + remToPx(0.1), max),
      clamp(min, calcVw(4.611) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        render: {
          sprite: {
            texture: "2.png",
            xScale: 0.9 * clamp(min, calcVw(21.611) + remToPx(0.1), max) / 389,
            yScale: 0.9 * clamp(min, calcVw(4.611) + remToPx(0.1), max) / 83,
          },
        },
      }
    );
    const ele3 = Bodies.rectangle(
      clamp(min, calcVw(23.333) + remToPx(0.1), max),
      clamp(min, calcVw(11.111) + remToPx(0.1), max),
      clamp(min, calcVw(11.222) + remToPx(0.1), max),
      clamp(min, calcVw(4.944) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        // id: "instagramBody",
        render: {
          sprite: {
            texture: "3.png",
            xScale: clamp(min, calcVw(11.222) + remToPx(0.1), max) / 202,
            yScale: clamp(min, calcVw(4.944) + remToPx(0.1), max) / 89,
          },
        },
      }
    );
    const ele4 = Bodies.rectangle(
      clamp(min, calcVw(22.222) + remToPx(0.1), max),
      clamp(min, calcVw(20) + remToPx(0.1), max),
      clamp(min, calcVw(17.722) + remToPx(0.1), max),
      clamp(min, calcVw(4.444) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        render: {
          sprite: {
            texture: "4.png",
            xScale: clamp(min, calcVw(17.722) + remToPx(0.1), max) / 319,
            yScale: clamp(min, calcVw(4.444) + remToPx(0.1), max) / 80,
          },
        },
      }
    );
    const ele5 = Bodies.rectangle(
      clamp(min, calcVw(33.333) + remToPx(0.1), max),
      clamp(min, calcVw(21.111) + remToPx(0.1), max),
      clamp(min, calcVw(7.222) + remToPx(0.1), max),
      clamp(min, calcVw(4.167) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        render: {
          sprite: {
            texture: "5.png",
            xScale: clamp(min, calcVw(7.222) + remToPx(0.1), max) / 130,
            yScale: clamp(min, calcVw(4.167) + remToPx(0.1), max) / 75,
          },
        },
      }
    );
    const ele6 = Bodies.rectangle(
      clamp(min, calcVw(20) + remToPx(0.1), max),
      clamp(min, calcVw(23.333) + remToPx(0.1), max),
      clamp(min, calcVw(18.333) + remToPx(0.1), max),
      clamp(min, calcVw(6.889) + remToPx(0.1), max),
      {
        chamfer: { radius: radius },
        render: {
          sprite: {
            texture: "6.png",
            xScale: clamp(min, calcVw(18.333) + remToPx(0.1), max) / 330,
            yScale: clamp(min, calcVw(6.889) + remToPx(0.1), max) / 124,
          },
        },
      }
    );

    // add all of the bodies to the world
    World.add(engine.world, [ground, ele1, ele2, ele3, ele4, ele5, ele6]);

    // add mouse control

    // run the engine
    Engine.run(engine);
    // Runner.run(Runner.create(), engine);

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
