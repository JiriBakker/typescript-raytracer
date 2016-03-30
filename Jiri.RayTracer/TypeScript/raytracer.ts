namespace Jiri.RayTracer {

    import Sphere = Jiri.RayTracer.SceneObjects.Sphere;

    export class RayTracer {

        constructor(private canvas: HTMLCanvasElement, private width: number, private height: number) { }

        public render(viewport: Viewport, scene: Scene, samplesPerPixel: number) {
            this.loadTextures(scene, () => {

                var imageData = this.getContext().getImageData(0, 0, this.width, this.height);

                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        const color = this.superSample(samplesPerPixel, (dx, dy) => {
                            var ray = viewport.getRayForPixel(x + dx, y + dy);
                            return this.trace(ray, scene, 3);
                        });
                        this.setColor(x, y, color, imageData);
                    }
                }

                this.getContext().putImageData(imageData, 0, 0);

            });
        }

        private getContext() {
            return this.canvas.getContext("2d");
        }

        private loadTextures(scene: Scene, callback) {
            const numberOfTextures = Object.keys(scene.textures).length;
            if (numberOfTextures === 0) {
                callback();
                return;
            }
            
            var numberOfCallbacksRunning = numberOfTextures;
            const finalizerCallback = () => {
                if (--numberOfCallbacksRunning <= 0) { // TODO JB potential RACE condition...
                    callback();
                }
            };
            for (let identifier in scene.textures) {
                if (scene.textures.hasOwnProperty(identifier)) {
                    const texture = scene.textures[identifier];
                    texture.load(finalizerCallback);
                }
            }
        }

        private setColor(x: number, y: number, color: Color, imageData: ImageData) {
            const index = (x * 4) + ((this.height - y) * this.width * 4);
            imageData.data[index + 0] = color.getRed();
            imageData.data[index + 1] = color.getGreen();
            imageData.data[index + 2] = color.getBlue();
            imageData.data[index + 3] = 255;     
        }

        private superSample(samplesPerPixel: number, sampleFunc: (px:number, py:number) => Color) {
            let combinedColor = Color.BLACK;
            for (let dx = 0.5 / samplesPerPixel; dx < 1; dx += 1 / samplesPerPixel) {
                for (let dy = 0.5 / samplesPerPixel; dy < 1; dy += 1 / samplesPerPixel) {
                    const color = sampleFunc(dx - 0.5, dy - 0.5);
                    combinedColor = combinedColor.add(color.scale(1 / (samplesPerPixel * samplesPerPixel)));
                }
            }
            return combinedColor;
        }

        private count = 100;

        private trace(ray: Ray, scene: Scene, depth: number) {
            if (depth < 0) {
                return Color.BLACK;
            }

            const intersection = this.findIntersection(ray, scene);
            if (intersection == null) {
                return Color.BLACK;
            }

            const intersectionPoint = ray.direction.scale(intersection.distance).add(ray.origin);
            let intersectionNormal = intersection.object.getNormalAt(intersectionPoint);

            let baseColor = intersection.object.getColor();

            if (intersection.object.getTextureIdentifier() !== null) {
                const texture = scene.textures[intersection.object.getTextureIdentifier()];
                const textureCoordinates = intersection.object.getTextureCoordinates(intersectionNormal);
                baseColor = baseColor.add(texture.getPixelColorByUV(textureCoordinates.u, textureCoordinates.v));
            }

            let lambertContribution = 0;
            if (intersection.object.lambert > 0) {

                if (intersection.object.getBumpMapTextureIdentifier() !== null) {
                    const bumpMapTexture = scene.textures[intersection.object.getBumpMapTextureIdentifier()];
                    const bumpMapTextureCoordinates = intersection.object.getTextureCoordinates(intersectionNormal);
                    var bumpMapTextureColor = bumpMapTexture.getPixelColorByUV(bumpMapTextureCoordinates.u, bumpMapTextureCoordinates.v);

                    var bumpMapNormal =
                        new Vector3(bumpMapTextureColor.getRed(), bumpMapTextureColor.getGreen(), bumpMapTextureColor.getBlue())
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
                
                lambertContribution = this.computeLambert(intersectionPoint, intersectionNormal, scene) * intersection.object.lambert;
            }

            let specularColor = Color.BLACK;
            if (intersection.object.specular > 0) {
                const reflectionDirection = ray.direction.subtract(
                    intersectionNormal.scale(2 * intersectionNormal.dotProduct(ray.direction))
                );
                specularColor = this.trace({ origin: intersectionPoint, direction: reflectionDirection }, scene, depth - 1)
                                    .scale(intersection.object.specular);
            }

            return baseColor
                        .scale(Math.min(1, intersection.object.ambient + lambertContribution))
                        .add(specularColor);

        }

        private computeLambert(intersectionPoint: Vector3, intersectionNormal: Vector3, scene: Scene) {
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