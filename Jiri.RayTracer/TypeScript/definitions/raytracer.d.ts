declare namespace Jiri.RayTracer {
    class RayTracer {
        private context;
        private width;
        private height;
        constructor(context: CanvasRenderingContext2D, width: number, height: number);
        render(viewport: Viewport, scene: Scene, samplesPerPixel: number): void;
        private setColor(x, y, color, imageData);
        private superSample(samplesPerPixel, sampleFunc);
        private trace(ray, scene, depth);
        private computeLambert(intersectionPoint, intersectionNormal, scene);
        private findIntersection(ray, scene);
    }
}
