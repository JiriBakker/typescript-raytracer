declare class Vector3 {
    private x;
    private y;
    private z;
    constructor(x: any, y: any, z: any);
    getX(): any;
    getY(): any;
    getZ(): any;
    length(): number;
    add(other: Vector3): Vector3;
    subtract(other: Vector3): Vector3;
    multiply(other: Vector3): Vector3;
    scale(ratio: number): Vector3;
    dotProduct(other: Vector3): number;
    crossProduct(other: Vector3): Vector3;
    normalize(): Vector3;
    clone(): Vector3;
    static RIGHT: Vector3;
    static UP: Vector3;
    static FORWARD: Vector3;
}
