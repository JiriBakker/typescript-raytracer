declare namespace Jiri.RayTracer.SceneObjects {
    class Plane implements SceneObject {
        private normalVector;
        private offset;
        private color;
        constructor(normalVector: Vector3, offset: number, color: Color);
        intersect(ray: Ray): any;
        getColor(): Color;
    }
}
