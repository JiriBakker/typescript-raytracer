declare class Plane implements SceneObject {
    private normalVector;
    private offset;
    constructor(normalVector: Vector3, offset: number);
    intersect(ray: Ray): any;
}
