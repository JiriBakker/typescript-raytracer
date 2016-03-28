namespace Jiri.RayTracer {

    export class RayTracer {

        constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) { }

        public render(viewport: Viewport, scene: Scene) {
            var imageData = this.context.getImageData(0, 0, this.width, this.height);

            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {

                    var ray = viewport.getRayForPixel(x, y);

                    var color = this.trace(ray, scene, 3);

                    var index = (x * 4) + ((this.height - y) * this.width * 4)
                    imageData.data[index + 0] = color.getRed();
                    imageData.data[index + 1] = color.getGreen();
                    imageData.data[index + 2] = color.getBlue();
                    imageData.data[index + 3] = 255;
                }
            }

            this.context.putImageData(imageData, 0, 0);
        }

        private trace(ray: Ray, scene: Scene, depth: number) {
            if (depth < 0) {
                return Color.BLACK;
            }

            var intersection = this.findIntersection(ray, scene);
            if (intersection == null) {
                return Color.BLACK;
            }

            var intersectionPoint  = ray.direction.scale(intersection.distance).add(ray.origin);
            var intersectionNormal = intersection.object.getNormalAt(intersectionPoint);

            var lambertContribution = 0;
            if (intersection.object.lambert > 0) {
                for (var i = 0; i < scene.lights.length; i++) {
                    var lightOrigin = scene.lights[i].origin;
                    var vectorLightToIntersection = intersectionPoint.subtract(lightOrigin);
                    var lightIntersection = this.findIntersection({ origin: lightOrigin, direction: vectorLightToIntersection.normalize() }, scene);
                    if (lightIntersection == null || Math.abs(lightIntersection.distance - vectorLightToIntersection.length()) > 0.001) {
                        continue;
                    }

                    var lightContribution = lightOrigin.subtract(intersectionPoint).normalize().dotProduct(intersectionNormal);
                    if (lightContribution > 0) {
                        lambertContribution += lightContribution;
                    }
                }

                lambertContribution = Math.min(1, lambertContribution);
            }

            var specularColor = Color.BLACK;
            if (intersection.object.specular > 0) {
                var reflectionDirection = ray.direction.subtract(
                                                    intersectionNormal.scale(2 * intersectionNormal.dotProduct(ray.direction))
                                                );

                specularColor = this.trace({ origin: intersectionPoint, direction: reflectionDirection }, scene, depth - 1);
            }           

            return Color.BLACK
                        .add(intersection.object.getColor().scale(lambertContribution * intersection.object.lambert))
                        .add(intersection.object.getColor().scale(intersection.object.ambient))
                        .add(specularColor);

        }

        private findIntersection(ray: Ray, scene: Scene) {
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
        }

    }

}