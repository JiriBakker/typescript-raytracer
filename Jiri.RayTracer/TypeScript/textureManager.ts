namespace Jiri.RayTracer {
    
    export class TextureManager {

        constructor(private textures: TextureSet) { }   

        public preloadTextures(callbackOnComplete: () => void) {
            const numberOfTextures = Object.keys(this.textures).length;
            if (numberOfTextures === 0) {
                callbackOnComplete();
                return;
            }

            var numberOfCallbacksRunning = numberOfTextures;
            const finalizerCallback = () => {
                if (--numberOfCallbacksRunning <= 0) { // TODO JB potential RACE condition...
                    callbackOnComplete();
                }
            };
            for (let identifier in this.textures) {
                if (this.textures.hasOwnProperty(identifier)) {
                    const texture = this.textures[identifier];
                    texture.load(finalizerCallback);
                }
            }
        }

        public getTexture(textureIdentifier: string) : Texture {
            return this.textures[textureIdentifier];
        }

    }

}