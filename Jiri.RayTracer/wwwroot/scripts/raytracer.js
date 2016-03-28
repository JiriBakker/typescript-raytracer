var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer_1) {
        var RayTracer = (function () {
            function RayTracer(context, width, height) {
                this.context = context;
                this.width = width;
                this.height = height;
            }
            RayTracer.prototype.render = function (viewport, scene) {
                var imageData = this.context.getImageData(0, 0, this.width, this.height);
                for (var x = 0; x < this.width; x++) {
                    for (var y = 0; y < this.height; y++) {
                        var ray = viewport.getRayForPixel(x, y);
                        var closestIntersection = null;
                        for (var i = 0; i < scene.objects.length; i++) {
                            var intersection = scene.objects[i].intersect(ray);
                            if (intersection != null) {
                                if (closestIntersection == null || closestIntersection.distance < intersection.distance) {
                                    closestIntersection = intersection;
                                }
                            }
                        }
                        var color = closestIntersection != null ? closestIntersection.object.getColor() : Color.BLACK;
                        var index = (x * 4) + (y * this.width * 4);
                        imageData.data[index + 0] = color.getRed();
                        imageData.data[index + 1] = color.getGreen();
                        imageData.data[index + 2] = color.getBlue();
                        imageData.data[index + 3] = 255;
                    }
                }
                this.context.putImageData(imageData, 0, 0);
            };
            return RayTracer;
        }());
        RayTracer_1.RayTracer = RayTracer;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
