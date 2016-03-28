setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d");
    var rayTracer = new RayTracer(context, 800, 600);
    rayTracer.render({
        objects: [
            //new Plane(new Vector3(0.0, 1.0, 0.0), 0.0),
            new Sphere(new Vector3(0.0, 1.0, -2.25), 1.0)
        ],
        lights: []
    });
}, 500);
