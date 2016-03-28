var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var SceneObjects;
        (function (SceneObjects) {
            var Sphere = (function () {
                function Sphere(center, radius, color) {
                    this.center = center;
                    this.radius = radius;
                    this.color = color;
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
                Sphere.prototype.getColor = function () {
                    return this.color;
                };
                return Sphere;
            })();
            SceneObjects.Sphere = Sphere;
        })(SceneObjects = RayTracer.SceneObjects || (RayTracer.SceneObjects = {}));
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
