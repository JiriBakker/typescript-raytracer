namespace Jiri.RayTracer {

    export class Viewport {

        private cameraRight: Vector3;
        private cameraUp:    Vector3;

        private halfWidth:   number;
        private halfHeight:  number;

        private pixelWidth:  number;
        private pixelHeight: number;

        constructor(private cameraOrigin: Vector3, private cameraForward: Vector3, screenWidth: number, screenHeight: number, fieldOfView: number) {
            this.cameraRight = this.cameraForward.crossProduct(Vector3.ALMOST_UP) .normalize();
            this.cameraUp    = this.cameraRight  .crossProduct(this.cameraForward).normalize();

            const heightWidthRatio = screenHeight / screenWidth;

            this.halfWidth  = Math.tan(Math.PI * (fieldOfView / 2) / 180);
            this.halfHeight = heightWidthRatio * this.halfWidth;

            this.pixelWidth  = (this.halfWidth  * 2) / (screenWidth  - 1);
            this.pixelHeight = (this.halfHeight * 2) / (screenHeight - 1);
        }

        public getRayForPixel(x: number, y: number) {
            const xVector = this.cameraRight.scale((x * this.pixelWidth ) - this.halfWidth);
            const yVector = this.cameraUp   .scale((y * this.pixelHeight) - this.halfHeight);

            return {
                origin:    this.cameraOrigin,
                direction: this.cameraForward
                                    .add(xVector)
                                    .add(yVector)
                                    .normalize()
            };
        }

    }
}