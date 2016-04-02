var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer_1) {
        var RayTracer = (function () {
            function RayTracer(renderContext, width, height) {
                this.renderContext = renderContext;
                this.width = width;
                this.height = height;
            }
            RayTracer.prototype.render = function (viewport, scene, textureManager, samplesPerPixel) {
                var findIntersection = function (ray) {
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
                var computeLambert = function (intersectionPoint, intersectionNormal) {
                    var lambertContribution = 0;
                    for (var i = 0; i < scene.lights.length; i++) {
                        var lightOrigin = scene.lights[i].origin;
                        var vectorLightToIntersection = intersectionPoint.subtract(lightOrigin);
                        var lightIntersection = findIntersection({ origin: lightOrigin, direction: vectorLightToIntersection.normalize() });
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
                var trace = function (ray, depth) {
                    if (depth < 0) {
                        return Color.BLACK;
                    }
                    var intersection = findIntersection(ray);
                    if (intersection == null) {
                        return Color.BLACK;
                    }
                    var intersectionPoint = ray.direction.scale(intersection.distance).add(ray.origin);
                    var intersectionNormal = intersection.object.getNormalAt(intersectionPoint);
                    var baseColor = intersection.object.getColor();
                    if (intersection.object.getTextureIdentifier() !== null) {
                        var texture = textureManager.getTexture(intersection.object.getTextureIdentifier());
                        var textureCoordinates = intersection.object.getTextureCoordinates(intersectionNormal);
                        baseColor = baseColor.add(texture.getPixelColorByUV(textureCoordinates.u, textureCoordinates.v));
                    }
                    var ambientColor = baseColor.scale(intersection.object.ambient);
                    var lambertColor = Color.BLACK;
                    if (intersection.object.lambert > 0) {
                        if (intersection.object.getBumpMapTextureIdentifier() !== null) {
                            var bumpMapTexture = textureManager.getTexture(intersection.object.getBumpMapTextureIdentifier());
                            var bumpMapTextureCoordinates = intersection.object.getTextureCoordinates(intersectionNormal);
                            var bumpMapTextureColor = bumpMapTexture.getPixelColorByUV(bumpMapTextureCoordinates.u, bumpMapTextureCoordinates.v);
                            var bumpMapNormal = new Vector3(bumpMapTextureColor.getRed(), bumpMapTextureColor.getGreen(), bumpMapTextureColor.getBlue())
                                .scale(2 / 255)
                                .subtract(new Vector3(1, 1, 1))
                                .normalize();
                            var onbu = intersectionNormal.crossProduct(Vector3.ALMOST_UP).normalize();
                            var onbv = onbu.crossProduct(intersectionNormal).normalize();
                            intersectionNormal =
                                intersectionNormal
                                    .add(onbu.crossProduct(intersectionNormal).scale(bumpMapNormal.getX()))
                                    .add(onbv.crossProduct(intersectionNormal).scale(bumpMapNormal.getY()))
                                    .normalize();
                        }
                        var lambertContribution = computeLambert(intersectionPoint, intersectionNormal) * intersection.object.lambert;
                        lambertColor = baseColor.scale(lambertContribution);
                    }
                    var specularColor = Color.BLACK;
                    if (intersection.object.specular > 0) {
                        var reflectionDirection = ray.direction.subtract(intersectionNormal.scale(2 * intersectionNormal.dotProduct(ray.direction)));
                        specularColor = trace({ origin: intersectionPoint, direction: reflectionDirection }, depth - 1)
                            .scale(intersection.object.specular);
                    }
                    return Color.BLACK
                        .add(ambientColor)
                        .add(lambertColor)
                        .add(specularColor);
                };
                var imageData = this.renderContext.getImageData(0, 0, this.width, this.height);
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        var color = this.superSample(samplesPerPixel, function (dx, dy) {
                            var ray = viewport.getRayForPixel(x + dx, y + dy);
                            return trace(ray, 3);
                        });
                        this.setColor(x, y, color, imageData);
                    }
                }
                this.renderContext.putImageData(imageData, 0, 0);
            };
            RayTracer.prototype.setColor = function (x, y, color, imageData) {
                var index = (x * 4) + ((this.height - y) * this.width * 4);
                imageData.data[index + 0] = color.getRed();
                imageData.data[index + 1] = color.getGreen();
                imageData.data[index + 2] = color.getBlue();
                imageData.data[index + 3] = 255;
            };
            RayTracer.prototype.superSample = function (samplesPerAxis, sampleFunc) {
                var combinedColor = Color.BLACK;
                for (var dx = 0.5 / samplesPerAxis; dx < 1; dx += 1 / samplesPerAxis) {
                    for (var dy = 0.5 / samplesPerAxis; dy < 1; dy += 1 / samplesPerAxis) {
                        var color = sampleFunc(dx - 0.5, dy - 0.5);
                        combinedColor = combinedColor.add(color.scale(1 / (samplesPerAxis * samplesPerAxis)));
                    }
                }
                return combinedColor;
            };
            return RayTracer;
        }());
        RayTracer_1.RayTracer = RayTracer;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
