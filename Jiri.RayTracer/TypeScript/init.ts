import SceneObjects = Jiri.RayTracer.SceneObjects;
import Viewport = Jiri.RayTracer.Viewport;
import RayTracer = Jiri.RayTracer.RayTracer;


setTimeout(function () {
    var canvas = document.createElement("canvas");
    canvas.width  = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d");
    var rayTracer = new RayTracer(context, canvas.width, canvas.height);

    rayTracer.render(
        new Viewport(
            new Vector3(0.0, 0.0, 4.0),
            new Vector3(0.0, 0.0, -1.0),
            canvas.width,
            canvas.height,
            70),
        {
            objects: [
                new SceneObjects.Plane(Vector3.BACKWARD, -11.0, Color.WHITE), // back wall
                new SceneObjects.Plane(Vector3.UP, -2.0, Color.PURPLE), // floor
                new SceneObjects.Plane(Vector3.DOWN, -2.0, Color.RED),   // ceiling
                new SceneObjects.Plane(Vector3.RIGHT, -2.0, Color.YELLOW), // left wall
                new SceneObjects.Plane(Vector3.LEFT, -2.0, Color.BLUE),  // right wall
                
                new SceneObjects.Sphere(new Vector3(0.0, -5.0, -12.25), 1.0, Color.CYAN)
            ],
            lights: []
        });
}, 500);