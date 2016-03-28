class Vector3 {

    constructor(private x, private y, private z) { }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    add(other: Vector3) {
        return new Vector3(this.x + other.getX(), this.y + other.getY(), this.z + other.getZ());
    }

    subtract(other: Vector3) {
        return new Vector3(this.x - other.getX(), this.y - other.getY(), this.z - other.getZ());
    }

    multiply(other: Vector3) {
        return new Vector3(this.x * other.getX(), this.y * other.getY(), this.z * other.getZ());
    }

    scale(ratio: number) {
        return new Vector3(this.x * ratio, this.y * ratio, this.z * ratio);
    }

    dotProduct(other: Vector3) {
        return (this.x * other.getX()) + (this.y * other.getY()) + (this.z * other.getZ());
    }

    crossProduct(other: Vector3) {
        return new Vector3(this.y * other.getZ() - this.z * other.getY(), this.z * other.getX() - this.x * other.getZ(), this.x * other.getY() - this.y * other.getX());
    }

    normalize() {
        var length = this.length();
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }

    invert() {
        return this.scale(-1);
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    static LEFT     = new Vector3(-1,  0,  0);
    static RIGHT    = new Vector3( 1,  0,  0);
    static UP       = new Vector3( 0,  1,  0);
    static DOWN     = new Vector3( 0, -1,  0);
    static BACKWARD = new Vector3( 0,  0,  1);
    static FORWARD  = new Vector3( 0,  0, -1);

}
