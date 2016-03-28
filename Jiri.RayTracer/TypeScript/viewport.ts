namespace Jiri.RayTracer {

    export class Viewport {

        private cameraForward: Vector3;
        private cameraRight: Vector3;
        private cameraUp: Vector3;

        private halfWidth: number;
        private halfHeight: number;

        private pixelWidth: number;
        private pixelHeight: number;

        constructor(private cameraOrigin: Vector3, cameraDirection: Vector3, screenWidth: number, screenHeight: number, fieldOfView: number) {
            this.cameraForward = cameraDirection.subtract(this.cameraOrigin).normalize();
            this.cameraRight = this.cameraForward.crossProduct(Vector3.DOWN).normalize(); // Since the canvas is rendered top to bottom, we need to invert the y-axis of the camera (thus using DOWN here instead of UP)
            this.cameraUp = this.cameraRight.crossProduct(this.cameraForward).normalize();

            console.log(this.cameraForward);
            console.log(this.cameraRight);
            console.log(this.cameraUp);

            var heightWidthRatio = screenHeight / screenWidth;

            this.halfWidth = Math.tan(Math.PI * (fieldOfView / 2) / 180);
            this.halfHeight = heightWidthRatio * this.halfWidth;

            this.pixelWidth = (this.halfWidth * 2) / (screenWidth - 1);
            this.pixelHeight = (this.halfHeight * 2) / (screenHeight - 1);
        }

        public getRayForPixel(x: number, y: number) {
            var xVector = this.cameraRight.scale((x * this.pixelWidth) - this.halfWidth);
            var yVector = this.cameraUp.scale((y * this.pixelHeight) - this.halfHeight);

            return {
                origin: this.cameraOrigin,
                direction: this.cameraForward.add(xVector).add(yVector).normalize()
            };
        }

    }
}