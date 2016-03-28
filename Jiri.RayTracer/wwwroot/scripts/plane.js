var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var SceneObjects;
        (function (SceneObjects) {
            var Plane = (function (_super) {
                __extends(Plane, _super);
                function Plane(normalVector, offset, color, lambert, ambient) {
                    _super.call(this, color, lambert, ambient);
                    this.normalVector = normalVector;
                    this.offset = offset;
                }
                Plane.prototype.intersect = function (ray) {
                    var denom = this.normalVector.dotProduct(ray.direction);
                    if (denom > 0) {
                        return null;
                    }
                    return {
                        object: this,
                        ray: ray,
                        distance: (this.normalVector.scale(this.offset).subtract(ray.origin).dotProduct(this.normalVector)) / denom
                    };
                };
                Plane.prototype.getNormalAt = function (position) {
                    return this.normalVector;
                };
                return Plane;
            }(SceneObjects.SceneObject));
            SceneObjects.Plane = Plane;
        })(SceneObjects = RayTracer.SceneObjects || (RayTracer.SceneObjects = {}));
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
