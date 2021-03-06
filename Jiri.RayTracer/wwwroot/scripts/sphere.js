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
            var Sphere = (function (_super) {
                __extends(Sphere, _super);
                function Sphere(center, radius, color, lambert, ambient, specular, textureIdentifier, bumpMapTextureIdentifier) {
                    _super.call(this, color, lambert, ambient, specular, textureIdentifier, bumpMapTextureIdentifier);
                    this.center = center;
                    this.radius = radius;
                }
                Sphere.prototype.intersect = function (ray) {
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
                    }
                    else {
                        return {
                            object: this,
                            ray: ray,
                            distance: distance
                        };
                    }
                };
                Sphere.prototype.getNormalAt = function (position) {
                    return position.subtract(this.center).normalize();
                };
                Sphere.prototype.getTextureCoordinates = function (intersectionNormal) {
                    var u = 0.5 + (Math.atan2(intersectionNormal.getZ(), intersectionNormal.getX()) / (2 * Math.PI));
                    var v = 0.5 - (Math.asin(intersectionNormal.getY()) / Math.PI);
                    return { u: u, v: v };
                };
                return Sphere;
            }(SceneObjects.SceneObject));
            SceneObjects.Sphere = Sphere;
        })(SceneObjects = RayTracer.SceneObjects || (RayTracer.SceneObjects = {}));
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
