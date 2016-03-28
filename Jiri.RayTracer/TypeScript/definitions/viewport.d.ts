declare namespace Jiri.RayTracer {
    class Viewport {
        private cameraOrigin;
        private cameraForward;
        private cameraRight;
        private cameraUp;
        private halfWidth;
        private halfHeight;
        private pixelWidth;
        private pixelHeight;
        constructor(cameraOrigin: Vector3, cameraDirection: Vector3, screenWidth: number, screenHeight: number, fieldOfView: number);
        getRayForPixel(x: number, y: number): {
            origin: Vector3;
            direction: Vector3;
        };
    }
}
