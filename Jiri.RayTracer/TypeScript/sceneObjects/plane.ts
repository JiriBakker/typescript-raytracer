class Plane implements SceneObject {

    constructor(private normalVector: Vector3, private offset: number) { }

    public intersect(ray: Ray) {
        var denom = this.normalVector.dotProduct(ray.direction);
        if (denom > 0) {
            return null;
        }
        else {
            var sceneObject
            return {
                object: <SceneObject>this,
                ray: ray,
                distance: (this.normalVector.dotProduct(ray.origin) + this.offset) / (-denom)
            };
        }
    }

}