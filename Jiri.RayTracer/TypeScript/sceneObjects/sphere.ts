namespace Jiri.RayTracer.SceneObjects {

    export class Sphere extends SceneObject {

        constructor(private center: Vector3, private radius: number, color: Color, lambert: number, ambient: number, specular: number) {
            super(color, lambert, ambient, specular);
        }

        public intersect(ray: Ray) {
            var eyeToCenter = this.center.subtract(ray.origin);
            var v = eyeToCenter.dotProduct(ray.direction);
            var distance = 0;
            if (v >= 0) {
                var discriminant = (this.radius * this.radius) - (eyeToCenter.dotProduct(eyeToCenter) - v * v);
                if (discriminant >= 0) {
                    distance = v - Math.sqrt(discriminant);
                }
            }
            if (distance === 0) {
                return null;
            } else {
                return {
                    object: <SceneObject>this,
                    ray: ray,
                    distance: distance
                };
            }
        }

        public getNormalAt(position: Vector3) {
            return position.subtract(this.center).normalize();            
        }

    }

}