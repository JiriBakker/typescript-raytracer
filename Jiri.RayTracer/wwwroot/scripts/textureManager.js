var Jiri;
(function (Jiri) {
    var RayTracer;
    (function (RayTracer) {
        var TextureManager = (function () {
            function TextureManager(textures) {
                this.textures = textures;
            }
            TextureManager.prototype.preloadTextures = function (callbackOnComplete) {
                var numberOfTextures = Object.keys(this.textures).length;
                if (numberOfTextures === 0) {
                    callbackOnComplete();
                    return;
                }
                var numberOfCallbacksRunning = numberOfTextures;
                var finalizerCallback = function () {
                    if (--numberOfCallbacksRunning <= 0) {
                        callbackOnComplete();
                    }
                };
                for (var identifier in this.textures) {
                    if (this.textures.hasOwnProperty(identifier)) {
                        var texture = this.textures[identifier];
                        texture.load(finalizerCallback);
                    }
                }
            };
            TextureManager.prototype.getTexture = function (textureIdentifier) {
                return this.textures[textureIdentifier];
            };
            return TextureManager;
        }());
        RayTracer.TextureManager = TextureManager;
    })(RayTracer = Jiri.RayTracer || (Jiri.RayTracer = {}));
})(Jiri || (Jiri = {}));
