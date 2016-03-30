namespace Jiri.RayTracer {

    export class Texture {

        private pixelData: Uint8ClampedArray;

        constructor(private filepath: string, private width: number, private height: number) { }

        public load(onloadCallback) {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var context = canvas.getContext("2d");

            var image = new Image(this.width, this.height);
            image.src = this.filepath;
            image.onload = () => {
                context.drawImage(image, 0, 0);
                this.pixelData = context.getImageData(0, 0, this.width, this.height).data; // JB ts-compile allows this (why?)
                console.log("Texture loaded from path: " + this.filepath);
                onloadCallback();

            };            
        }

        public getPixelColorByUV(u: number, v: number) {
            const x = Math.round(u * this.width);
            const y = Math.round(v * this.height);
            const index = (x * 4) + (y * this.width * 4);
            return new Color(
                this.pixelData[index + 0],
                this.pixelData[index + 1],
                this.pixelData[index + 2]);
        }

    }

}