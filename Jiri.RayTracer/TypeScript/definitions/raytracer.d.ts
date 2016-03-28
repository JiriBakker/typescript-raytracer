declare namespace Jiri.RayTracer {
    class RayTracer {
        private context;
        private width;
        private height;
        constructor(context: CanvasRenderingContext2D, width: number, height: number);
        render(viewport: Viewport, scene: Scene): void;
    }
}
