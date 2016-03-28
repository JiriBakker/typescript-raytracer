var Plane = (function () {
    function Plane(normalVector, offset) {
        this.normalVector = normalVector;
        this.offset = offset;
    }
    Plane.prototype.intersect = function (ray) {
        var denom = this.normalVector.dotProduct(ray.direction);
        if (denom > 0) {
            return null;
        }
        else {
            var sceneObject;
            return {
                object: this,
                ray: ray,
                distance: (this.normalVector.dotProduct(ray.origin) + this.offset) / (-denom)
            };
        }
    };
    return Plane;
}());
