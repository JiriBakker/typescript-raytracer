interface Ray {
    origin:    Vector3;
    direction: Vector3;
}


interface Light {
    position: Vector3;
    color: Color;
}


interface Intersection {
    object:   SceneObject;
    ray:      Ray;
    distance: number;
}


interface SceneObject {
    intersect: (ray: Ray) => Intersection;
}


interface Scene {
    objects: SceneObject[];
    lights: Light[];
}
