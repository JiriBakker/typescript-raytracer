declare namespace Jiri.RayTracer.SceneObjects {
    class Plane extends SceneObject {
        private normalVector;
        private offset;
        constructor(normalVector: Vector3, offset: number, color: Color, lambert: number, ambient: number);
        intersect(ray: Ray): any;
        getNormalAt(position: Vector3): Vector3;
    }
}
