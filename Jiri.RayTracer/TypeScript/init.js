var SceneObjects = Jiri.RayTracer.SceneObjects;
var Viewport = Jiri.RayTracer.Viewport;
var RayTracer = Jiri.RayTracer.RayTracer;
setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d");
    var rayTracer = new RayTracer(context, canvas.width, canvas.height);
    rayTracer.render(new Viewport(new Vector3(0.0, 0.0, 4.0), new Vector3(0.0, 0.0, -1.0), canvas.width, canvas.height, 70), {
        objects: [
            new SceneObjects.Plane(new Vector3(0.0, -1.0, 0.0), 10.0, Color.PURPLE),
            new SceneObjects.Plane(new Vector3(0.0, 0.0, 1.0), 10.0, Color.WHITE),
            new SceneObjects.Sphere(new Vector3(0.0, -5.0, -12.25), 1.0, Color.CYAN)
        ],
        lights: []
    });
}, 500);
