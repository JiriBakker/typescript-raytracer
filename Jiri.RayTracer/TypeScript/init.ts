﻿import SceneObjects = Jiri.RayTracer.SceneObjects;
import Viewport = Jiri.RayTracer.Viewport;
import RayTracer = Jiri.RayTracer.RayTracer;


setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width  = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d");
    var rayTracer = new RayTracer(context, canvas.width, canvas.height);


    var startTick = new Date().getTime();

    rayTracer.render(
        new Viewport(
            new Vector3(0.0, 0.0, 10.0),
            new Vector3(0.0, 0.0, -1.0),
            canvas.width,
            canvas.height,
            90),
        {
            objects: [
                new SceneObjects.Plane(Vector3.BACKWARD, -10.0, Color.GREEN, 0.7, 0.2), // back wall
                new SceneObjects.Plane(Vector3.UP, -10.0, Color.PURPLE, 0.7, 0.2), // floor
                new SceneObjects.Plane(Vector3.DOWN, -10.0, Color.CYAN, 0.7, 0.2),   // ceiling
                new SceneObjects.Plane(Vector3.RIGHT, -10.0, Color.YELLOW, 0.7, 0.2), // left wall
                new SceneObjects.Plane(Vector3.LEFT, -10.0, Color.BLUE, 0.7, 0.2),  // right wall
                
                new SceneObjects.Sphere(new Vector3(2.0, -2.0, -7.0), 1.0, Color.RED, 0.7, 0.2)
            ],
            lights: [
                { origin: new Vector3(0.0, 3.0, -5.0), color: Color.WHITE }
            ]
        });

    var endTick = new Date().getTime();
    
    document.getElementById("renderTime").innerHTML = (endTick - startTick) + "ms";

}, 500);