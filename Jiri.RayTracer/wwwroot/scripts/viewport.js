var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var Viewport = (function () {
            function Viewport(cameraOrigin, cameraForward, screenWidth, screenHeight, fieldOfView) {
                this.cameraOrigin = cameraOrigin;
                this.cameraForward = cameraForward;
                this.cameraRight = this.cameraForward.crossProduct(Vector3.ALMOST_UP).normalize();
                this.cameraUp = this.cameraRight.crossProduct(this.cameraForward).normalize();
                var heightWidthRatio = screenHeight / screenWidth;
                this.halfWidth = Math.tan(Math.PI * (fieldOfView / 2) / 180);
                this.halfHeight = heightWidthRatio * this.halfWidth;
                this.pixelWidth = (this.halfWidth * 2) / (screenWidth - 1);
                this.pixelHeight = (this.halfHeight * 2) / (screenHeight - 1);
            }
            Viewport.prototype.getRayForPixel = function (x, y) {
                var xVector = this.cameraRight.scale((x * this.pixelWidth) - this.halfWidth);
                var yVector = this.cameraUp.scale((y * this.pixelHeight) - this.halfHeight);
                return {
                    origin: this.cameraOrigin,
                    direction: this.cameraForward
                        .add(xVector)
                        .add(yVector)
                        .normalize()
                };
            };
            return Viewport;
        }());
        RayTracer.Viewport = Viewport;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
