var RayTracer = (function () {
    function RayTracer(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
    }
    RayTracer.prototype.render = function (scene) {
        var imageData = this.context.getImageData(0, 0, this.width, this.height);
        var viewport = new Viewport(new Vector3(0.0, 0.0, 4.0), new Vector3(0.0, 0.0, -1.0), this.width, this.height, 45);
        console.log(viewport.getRayForPixel(0, 0));
        var firstHit = true;
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var ray = viewport.getRayForPixel(x, y);
                //console.log(ray);
                var color = Color.BLACK;
                for (var i = 0; i < scene.objects.length; i++) {
                    var intersection = scene.objects[i].intersect(ray);
                    if (intersection != null) {
                        if (firstHit) {
                            console.log(intersection);
                            console.log(ray);
                            firstHit = false;
                        }
                        //console.log("has intersection!");
                        color = Color.WHITE;
                    }
                }
                var index = (x * 4) + (y * this.width * 4);
                imageData.data[index + 0] = color.getRed();
                imageData.data[index + 1] = color.getGreen();
                imageData.data[index + 2] = color.getBlue();
                imageData.data[index + 3] = 255;
            }
        }
        this.context.putImageData(imageData, 0, 0);
    };
    return RayTracer;
})();
