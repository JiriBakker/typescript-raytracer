declare class Sphere implements SceneObject {
    private center;
    private radius;
    constructor(center: Vector3, radius: number);
    intersect(ray: Ray): any;
}
