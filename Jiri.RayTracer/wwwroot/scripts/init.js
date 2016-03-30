var SceneObjects = Jiri.RayTracer.SceneObjects;
var Viewport = Jiri.RayTracer.Viewport;
var RayTracer = Jiri.RayTracer.RayTracer;
var Texture = Jiri.RayTracer.Texture;
setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var rayTracer = new RayTracer(canvas, canvas.width, canvas.height);
    var globalAmbient = 0.0;
    var startTick = new Date().getTime();
    rayTracer.render(new Viewport(new Vector3(0.0, 3.0, 10.0), new Vector3(0.0, -1.0, -1.0), canvas.width, canvas.height, 90), {
        objects: [
            new SceneObjects.Plane(Vector3.BACKWARD, -10.0, Color.GREEN, 0.7, globalAmbient, 0, null),
            new SceneObjects.Plane(Vector3.UP, -10.0, Color.PURPLE, 0.7, globalAmbient, 0, null),
            new SceneObjects.Plane(Vector3.DOWN, -10.0, Color.CYAN, 0.7, globalAmbient, 0, null),
            new SceneObjects.Plane(Vector3.RIGHT, -10.0, Color.YELLOW, 0.7, globalAmbient, 0, null),
            new SceneObjects.Plane(Vector3.LEFT, -10.0, Color.BLUE, 0.7, globalAmbient, 0, null),
            new SceneObjects.Sphere(new Vector3(-4.0, -2.0, -2.0), 1.0, Color.RED, 0.9, globalAmbient, 0, null),
            new SceneObjects.Sphere(new Vector3(3.0, -2.0, -6.0), 5.0, Color.BLACK, 0.9, globalAmbient, 0, "earth")
        ],
        lights: [
            { origin: new Vector3(-8.0, 8.0, -2.0), color: Color.WHITE }
        ],
        textures: {
            "earth": new Texture("textures/earth.png", 1640, 820),
            "moon": new Texture("textures/moon.png", 1440, 720)
        }
    }, 1);
    var endTick = new Date().getTime();
    document.getElementById("renderTime").innerHTML = (endTick - startTick) + "ms";
}, 500);
