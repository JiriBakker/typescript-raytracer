import SceneObject = Jiri.RayTracer.SceneObjects.SceneObject;

interface Ray {
    origin:    Vector3;
    direction: Vector3;
}


interface Light {
    origin: Vector3;
    color: Color;
}


interface Intersection {
    object:   SceneObject;
    ray:      Ray;
    distance: number;
}


//interface SceneObject {
//    intersect:  (ray: Ray) => Intersection;
//    getColor:   ()         => Color;
//    getLambert: ()         => number;
//    getAmbient: ()         => number;
//}


interface Scene {
    objects: SceneObject[];
    lights: Light[];
}
