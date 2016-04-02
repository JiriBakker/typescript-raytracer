var SceneObjects = Jiri.RayTracer.SceneObjects;
var Viewport = Jiri.RayTracer.Viewport;
var RayTracer = Jiri.RayTracer.RayTracer;
var Texture = Jiri.RayTracer.Texture;
var TextureManager = Jiri.RayTracer.TextureManager;
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var textureManager = new TextureManager({
        "earth": new Texture("textures/earth.png", 1640, 820),
        "moon": new Texture("textures/moon.png", 1440, 720),
        "moon-bump": new Texture("textures/moon-bump.jpg", 4096, 2048)
    });
    textureManager.preloadTextures(function () {
        var startTick = new Date().getTime();
        var rayTracer = new RayTracer(canvas.getContext("2d"), canvas.width, canvas.height);
        var viewport = new Viewport(new Vector3(0.0, 0.0, 20), new Vector3(0.0, 0, -1), canvas.width, canvas.height, 60);
        var globalAmbient = 0.2;
        var globalSpecular = 0;
        var scene = {
            objects: [
                new SceneObjects.Plane(Vector3.BACKWARD, -10.0, Color.GREEN, 0.7, globalAmbient, globalSpecular, null, null),
                new SceneObjects.Plane(Vector3.UP, -10.0, Color.PURPLE, 0.7, globalAmbient, globalSpecular, null, null),
                new SceneObjects.Plane(Vector3.DOWN, -10.0, Color.CYAN, 0.7, globalAmbient, globalSpecular, null, null),
                new SceneObjects.Plane(Vector3.RIGHT, -10.0, Color.YELLOW, 0.7, globalAmbient, globalSpecular, null, null),
                new SceneObjects.Plane(Vector3.LEFT, -10.0, Color.BLUE, 0.7, globalAmbient, globalSpecular, null, null),
                new SceneObjects.Sphere(new Vector3(-6.0, -2.0, -5.0), 2.0, Color.WHITE, 0.7, globalAmbient, globalSpecular, null, "moon-bump"),
                new SceneObjects.Sphere(new Vector3(3.0, -2.0, -6.0), 5.0, Color.BLACK, 1, globalAmbient, globalSpecular, "earth", null)
            ],
            lights: [
                { origin: new Vector3(-8.0, 8.0, 0.0), color: Color.WHITE }
            ]
        };
        var samplesPerAxis = 2;
        rayTracer.render(viewport, scene, textureManager, samplesPerAxis);
        var endTick = new Date().getTime();
        document.getElementById("renderTime").innerHTML = (endTick - startTick) + "ms";
    });
});
