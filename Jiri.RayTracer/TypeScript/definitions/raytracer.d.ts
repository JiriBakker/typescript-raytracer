declare class RayTracer {
    private context;
    private width;
    private height;
    constructor(context: CanvasRenderingContext2D, width: number, height: number);
    render(scene: Scene): void;
}
