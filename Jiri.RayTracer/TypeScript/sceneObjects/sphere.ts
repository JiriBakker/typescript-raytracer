class Sphere implements SceneObject {

    constructor(private center: Vector3, private radius: number) { }

    public intersect(ray: Ray) {
        var eo = this.center.subtract(ray.origin);
        var v = eo.dotProduct(ray.direction);
        var distance = 0;
        if (v >= 0) {
            var disc = (this.radius * this.radius) - (eo.dotProduct(eo) - v * v);
            if (disc >= 0) {
                distance = v - Math.sqrt(disc);
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

}