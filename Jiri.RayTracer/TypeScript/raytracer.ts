﻿namespace Jiri.RayTracer {

    export class RayTracer {

        constructor(private renderContext: CanvasRenderingContext2D, private width: number, private height: number) { }

        render(viewport: Viewport, scene: Scene, textureManager: TextureManager, samplesPerPixel: number) {

            var findIntersection = (ray: Ray) => {
                let closestIntersection = null;
                for (let i = 0; i < scene.objects.length; i++) {
                    const intersection = scene.objects[i].intersect(ray);
                    if (intersection != null) {
                        if (closestIntersection == null || closestIntersection.distance > intersection.distance) {
                            closestIntersection = intersection;
                        }
                    }
                }
                return closestIntersection;
            };

            var computeLambert = (intersectionPoint: Vector3, intersectionNormal: Vector3)  =>{
                let lambertContribution = 0;

                for (let i = 0; i < scene.lights.length; i++) {
                    const lightOrigin = scene.lights[i].origin;
                    const vectorLightToIntersection = intersectionPoint.subtract(lightOrigin);
                    const lightIntersection = findIntersection({ origin: lightOrigin, direction: vectorLightToIntersection.normalize() });
                    if (lightIntersection == null || Math.abs(lightIntersection.distance - vectorLightToIntersection.length()) > 0.00001) {
                        continue;
                    }

                    const lightContribution = lightOrigin.subtract(intersectionPoint).normalize().dotProduct(intersectionNormal);
                    if (lightContribution > 0) {
                        lambertContribution += lightContribution;
                    }
                }

                return Math.min(1, lambertContribution);
            }

            var trace = (ray: Ray, depth: number) => {
                if (depth < 0) {
                    return Color.BLACK;
                }

                const intersection = findIntersection(ray);
                if (intersection == null) {
                    return Color.BLACK;
                }

                const intersectionPoint = ray.direction.scale(intersection.distance).add(ray.origin);
                let intersectionNormal = intersection.object.getNormalAt(intersectionPoint);

                let baseColor = intersection.object.getColor();

                if (intersection.object.getTextureIdentifier() !== null) {
                    const texture = textureManager.getTexture(intersection.object.getTextureIdentifier());
                    const textureCoordinates = intersection.object.getTextureCoordinates(intersectionNormal);
                    baseColor = baseColor.add(texture.getPixelColorByUV(textureCoordinates.u, textureCoordinates.v));
                }

                var ambientColor = baseColor.scale(intersection.object.ambient);

                let lambertColor = Color.BLACK;
                if (intersection.object.lambert > 0) {

                    if (intersection.object.getBumpMapTextureIdentifier() !== null) {
                        const bumpMapTexture = textureManager.getTexture(intersection.object.getBumpMapTextureIdentifier());
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

                    const lambertContribution = computeLambert(intersectionPoint, intersectionNormal) * intersection.object.lambert;
                    lambertColor = baseColor.scale(lambertContribution);
                }

                let specularColor = Color.BLACK;
                if (intersection.object.specular > 0) {
                    const reflectionDirection = ray.direction.subtract(
                        intersectionNormal.scale(2 * intersectionNormal.dotProduct(ray.direction))
                    );
                    specularColor = trace({ origin: intersectionPoint, direction: reflectionDirection }, depth - 1)
                        .scale(intersection.object.specular);
                }

                return Color.BLACK
                    .add(ambientColor)
                    .add(lambertColor)
                    .add(specularColor);
            }

           

            const imageData = this.renderContext.getImageData(0, 0, this.width, this.height);

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    const color = this.superSample(samplesPerPixel, (dx, dy) => {
                        var ray = viewport.getRayForPixel(x + dx, y + dy);
                        return trace(ray, 3);
                    });
                    this.setColor(x, y, color, imageData);
                }
            }

            this.renderContext.putImageData(imageData, 0, 0);
        }

        private setColor(x: number, y: number, color: Color, imageData: ImageData) {
            const index = (x * 4) + ((this.height - y) * this.width * 4);
            imageData.data[index + 0] = color.getRed();
            imageData.data[index + 1] = color.getGreen();
            imageData.data[index + 2] = color.getBlue();
            imageData.data[index + 3] = 255;     
        }

        private superSample(samplesPerAxis: number, sampleFunc: (px: number, py: number) => Color) {
            let combinedColor = Color.BLACK;
            for (let dx = 0.5 / samplesPerAxis; dx < 1; dx += 1 / samplesPerAxis) {
                for (let dy = 0.5 / samplesPerAxis; dy < 1; dy += 1 / samplesPerAxis) {
                    const color = sampleFunc(dx - 0.5, dy - 0.5);
                    combinedColor = combinedColor.add(color.scale(1 / (samplesPerAxis * samplesPerAxis)));
                }
            }
            return combinedColor;
        }

    }

}