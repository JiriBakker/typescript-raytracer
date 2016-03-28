declare namespace Jiri.RayTracer.SceneObjects {
    abstract class SceneObject {
        private color;
        private lambert;
        private ambient;
        constructor(color: Color, lambert: number, ambient: number);
        abstract intersect(ray: Ray): any;
        abstract getNormalAt(position: Vector3): any;
        getLambert(): number;
        getAmbient(): number;
        getColor(): Color;
    }
}
