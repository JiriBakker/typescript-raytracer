var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var Texture = (function () {
            function Texture(filepath, width, height) {
                this.filepath = filepath;
                this.width = width;
                this.height = height;
            }
            Texture.prototype.load = function (onloadCallback) {
                var _this = this;
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                var context = canvas.getContext("2d");
                var image = new Image(this.width, this.height);
                image.src = this.filepath;
                image.onload = function () {
                    context.drawImage(image, 0, 0);
                    _this.pixelData = context.getImageData(0, 0, _this.width, _this.height).data;
                    console.log("Texture loaded from path: " + _this.filepath);
                    onloadCallback();
                };
            };
            Texture.prototype.getPixelColorByUV = function (u, v) {
                var x = Math.round(u * this.width);
                var y = Math.round(v * this.height);
                var index = (x * 4) + (y * this.width * 4);
                return new Color(this.pixelData[index + 0], this.pixelData[index + 1], this.pixelData[index + 2]);
            };
            return Texture;
        }());
        RayTracer.Texture = Texture;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
