var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var SceneObjects;
        (function (SceneObjects) {
            var SceneObject = (function () {
                function SceneObject(color, lambert, ambient, specular) {
                    this.color = color;
                    this.lambert = lambert;
                    this.ambient = ambient;
                    this.specular = specular;
                }
                SceneObject.prototype.getLambert = function () {
                    return this.lambert;
                };
                SceneObject.prototype.getAmbient = function () {
                    return this.ambient;
                };
                SceneObject.prototype.getSpecular = function () {
                    return this.specular;
                };
                SceneObject.prototype.getColor = function () {
                    return this.color;
                };
                return SceneObject;
            }());
            SceneObjects.SceneObject = SceneObject;
        })(SceneObjects = RayTracer.SceneObjects || (RayTracer.SceneObjects = {}));
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
