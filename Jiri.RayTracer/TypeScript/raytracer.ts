namespace Jiri.RayTracer {

    export class RayTracer {

        constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) { }

        public render(viewport: Viewport, scene: Scene) {
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

                    var index = (x * 4) + (y * this.width * 4)
                    imageData.data[index + 0] = color.getRed();
                    imageData.data[index + 1] = color.getGreen();
                    imageData.data[index + 2] = color.getBlue();
                    imageData.data[index + 3] = 255;
                }
            }

            this.context.putImageData(imageData, 0, 0);
        }

    }

}