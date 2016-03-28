declare namespace Jiri.RayTracer.SceneObjects {
    class Sphere extends SceneObject {
        private center;
        private radius;
        constructor(center: Vector3, radius: number, color: Color, lambert: number, ambient: number);
        intersect(ray: Ray): any;
        getNormalAt(position: Vector3): Vector3;
    }
}
