namespace Jiri.RayTracer.SceneObjects {

    export class Plane extends SceneObject {

        constructor(private normalVector: Vector3, private offset: number, color: Color, lambert: number, ambient: number, specular: number) {
            super(color, lambert, ambient, specular);
        }

        public intersect(ray: Ray) {
            var denom = this.normalVector.dotProduct(ray.direction);
            if (denom > 0) {
                return null;
            }
            return {
                object: <SceneObject>this,
                ray: ray,
                distance: (this.normalVector.scale(this.offset).subtract(ray.origin).dotProduct(this.normalVector)) / denom
            };
        }   

        public getNormalAt(position: Vector3) {
            return this.normalVector;
        }


    }

}