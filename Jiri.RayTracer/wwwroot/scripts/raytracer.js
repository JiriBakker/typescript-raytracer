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
            RayTracer.prototype.render = function (viewport, scene, samplesPerPixel) {
                var _this = this;
                var imageData = this.context.getImageData(0, 0, this.width, this.height);
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        var color = this.superSample(samplesPerPixel, function (dx, dy) {
                            var ray = viewport.getRayForPixel(x + dx, y + dy);
                            return _this.trace(ray, scene, 3);
                        });
                        this.setColor(x, y, color, imageData);
                    }
                }
                this.context.putImageData(imageData, 0, 0);
            };
            RayTracer.prototype.setColor = function (x, y, color, imageData) {
                var index = (x * 4) + ((this.height - y) * this.width * 4);
                imageData.data[index + 0] = color.getRed();
                imageData.data[index + 1] = color.getGreen();
                imageData.data[index + 2] = color.getBlue();
                imageData.data[index + 3] = 255;
            };
            RayTracer.prototype.superSample = function (samplesPerPixel, sampleFunc) {
                var combinedColor = Color.BLACK;
                for (var dx = 0.5 / samplesPerPixel; dx < 1; dx += 1 / samplesPerPixel) {
                    for (var dy = 0.5 / samplesPerPixel; dy < 1; dy += 1 / samplesPerPixel) {
                        var color = sampleFunc(dx - 0.5, dy - 0.5);
                        combinedColor = combinedColor.add(color.scale(1 / (samplesPerPixel * samplesPerPixel)));
                    }
                }
                return combinedColor;
            };
            RayTracer.prototype.trace = function (ray, scene, depth) {
                if (depth < 0) {
                    return Color.BLACK;
                }
                var intersection = this.findIntersection(ray, scene);
                if (intersection == null) {
                    return Color.BLACK;
                }
                var intersectionPoint = ray.direction.scale(intersection.distance).add(ray.origin);
                var intersectionNormal = intersection.object.getNormalAt(intersectionPoint);
                var lambertContribution = 0;
                if (intersection.object.lambert > 0) {
                    lambertContribution = this.computeLambert(intersectionPoint, intersectionNormal, scene);
                }
                var specularColor = Color.BLACK;
                if (intersection.object.specular > 0) {
                    var reflectionDirection = ray.direction.subtract(intersectionNormal.scale(2 * intersectionNormal.dotProduct(ray.direction)));
                    specularColor = this.trace({ origin: intersectionPoint, direction: reflectionDirection }, scene, depth - 1);
                }
                return Color.BLACK
                    .add(intersection.object.getColor().scale(lambertContribution * intersection.object.lambert))
                    .add(intersection.object.getColor().scale(intersection.object.ambient))
                    .add(specularColor);
            };
            RayTracer.prototype.computeLambert = function (intersectionPoint, intersectionNormal, scene) {
                var lambertContribution = 0;
                for (var i = 0; i < scene.lights.length; i++) {
                    var lightOrigin = scene.lights[i].origin;
                    var vectorLightToIntersection = intersectionPoint.subtract(lightOrigin);
                    var lightIntersection = this.findIntersection({ origin: lightOrigin, direction: vectorLightToIntersection.normalize() }, scene);
                    if (lightIntersection == null || Math.abs(lightIntersection.distance - vectorLightToIntersection.length()) > 0.00001) {
                        continue;
                    }
                    var lightContribution = lightOrigin.subtract(intersectionPoint).normalize().dotProduct(intersectionNormal);
                    if (lightContribution > 0) {
                        lambertContribution += lightContribution;
                    }
                }
                return Math.min(1, lambertContribution);
            };
            RayTracer.prototype.findIntersection = function (ray, scene) {
                var closestIntersection = null;
                for (var i = 0; i < scene.objects.length; i++) {
                    var intersection = scene.objects[i].intersect(ray);
                    if (intersection != null) {
                        if (closestIntersection == null || closestIntersection.distance > intersection.distance) {
                            closestIntersection = intersection;
                        }
                    }
                }
                return closestIntersection;
            };
            return RayTracer;
        }());
        RayTracer_1.RayTracer = RayTracer;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
