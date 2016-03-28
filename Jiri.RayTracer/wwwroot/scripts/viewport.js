var Viewport = (function () {
    function Viewport(cameraOrigin, cameraDirection, screenWidth, screenHeight, fieldOfView) {
        this.cameraOrigin = cameraOrigin;
        this.cameraForward = cameraDirection.subtract(this.cameraOrigin).normalize();
        this.cameraRight = this.cameraForward.crossProduct(Vector3.UP).normalize();
        this.cameraUp = this.cameraRight.crossProduct(this.cameraForward).normalize();
        console.log(this);
        var heightWidthRatio = screenHeight / screenWidth;
        this.halfWidth = Math.tan(Math.PI * (fieldOfView / 2) / 180);
        this.halfHeight = heightWidthRatio * this.halfWidth;
        this.pixelWidth = (this.halfWidth * 2) / (screenWidth - 1);
        this.pixelHeight = (this.halfHeight * 2) / (screenHeight - 1);
    }
    Viewport.prototype.getRayForPixel = function (x, y) {
        var xVector = this.cameraRight.scale((x * this.pixelWidth) - this.halfWidth);
        var yVector = this.cameraUp.scale((y * this.pixelHeight) - this.halfHeight);
        return {
            origin: this.cameraOrigin,
            direction: this.cameraForward.add(xVector).add(yVector).normalize()
        };
    };
    return Viewport;
}());
