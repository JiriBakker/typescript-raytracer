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
    var globalAmbient = 0.1;
    var globalSpecular = 0;
    var startTick = new Date().getTime();
    rayTracer.render(new Viewport(new Vector3(0.0, 0.0, 10), new Vector3(0.0, 0, -1), canvas.width, canvas.height, 60), {
        objects: [
            new SceneObjects.Sphere(new Vector3(-6.0, -2.0, -5.0), 2.0, Color.WHITE, 0.7, globalAmbient, globalSpecular, null, "moon-bump"),
            new SceneObjects.Sphere(new Vector3(3.0, -2.0, -6.0), 5.0, Color.BLACK, 1, globalAmbient, globalSpecular, "earth", null)
        ],
        lights: [
            { origin: new Vector3(-8.0, 8.0, 0.0), color: Color.WHITE }
        ],
        textures: {
            "earth": new Texture("textures/earth.png", 1640, 820),
            "moon": new Texture("textures/moon.png", 1440, 720),
            "moon-bump": new Texture("textures/moon-bump.jpg", 4096, 2048)
        }
    }, 2);
    var endTick = new Date().getTime();
    document.getElementById("renderTime").innerHTML = (endTick - startTick) + "ms";
}, 500);
