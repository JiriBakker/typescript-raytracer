declare namespace Jiri.RayTracer.SceneObjects {
    class Sphere implements SceneObject {
        private center;
        private radius;
        private color;
        constructor(center: Vector3, radius: number, color: Color);
        intersect(ray: Ray): any;
        getColor(): Color;
    }
}
