var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var SceneObjects;
        (function (SceneObjects) {
            var SceneObject = (function () {
                function SceneObject(color, lambert, ambient) {
                    this.color = color;
                    this.lambert = lambert;
                    this.ambient = ambient;
                }
                SceneObject.prototype.getLambert = function () {
                    return this.lambert;
                };
                SceneObject.prototype.getAmbient = function () {
                    return this.ambient;
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