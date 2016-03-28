declare namespace Jiri.RayTracer.SceneObjects {
    abstract class SceneObject {
        private color;
        private lambert;
        private ambient;
        private specular;
        constructor(color: Color, lambert: number, ambient: number, specular: number);
        abstract intersect(ray: Ray): any;
        abstract getNormalAt(position: Vector3): any;
        getLambert(): number;
        getAmbient(): number;
        getSpecular(): number;
        getColor(): Color;
    }
}
