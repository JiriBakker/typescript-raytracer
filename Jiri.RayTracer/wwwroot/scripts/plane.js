var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var SceneObjects;
        (function (SceneObjects) {
            var Plane = (function () {
                function Plane(normalVector, offset, color) {
                    this.normalVector = normalVector;
                    this.offset = offset;
                    this.color = color;
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
                Plane.prototype.getColor = function () {
                    return this.color;
                };
                return Plane;
            }());
            SceneObjects.Plane = Plane;
        })(SceneObjects = RayTracer.SceneObjects || (RayTracer.SceneObjects = {}));
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
