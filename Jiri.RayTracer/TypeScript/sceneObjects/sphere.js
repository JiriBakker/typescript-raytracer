var Sphere = (function () {
    function Sphere(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    Sphere.prototype.intersect = function (ray) {
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
        }
        else {
            return {
                object: this,
                ray: ray,
                distance: distance
            };
        }
    };
    return Sphere;
})();
