namespace Jiri.RayTracer.SceneObjects {

    export class Plane extends SceneObject {

        constructor(private normalVector: Vector3, private offset: number, color: Color, lambert: number, ambient: number, specular: number, textureIdentifier: string, bumpMapTextureIdentifier: string) {
            super(color, lambert, ambient, specular, textureIdentifier, bumpMapTextureIdentifier);
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

        public getTextureCoordinates(intersectionNormal: Vector3) {
            return { u: 0, v: 0 }; // TODO JB
        }


    }

}