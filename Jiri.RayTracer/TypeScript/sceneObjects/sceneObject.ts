namespace Jiri.RayTracer.SceneObjects {

    export abstract class SceneObject {

        constructor(private color: Color, private lambert: number, private ambient: number, private specular: number) { }

        public abstract intersect(ray: Ray);

        public abstract getNormalAt(position: Vector3);

        public getLambert() {
            return this.lambert;
        }

        public getAmbient() {
            return this.ambient;
        }

        public getSpecular() {
            return this.specular;
        }

        public getColor() {
            return this.color;
        }

    }

}