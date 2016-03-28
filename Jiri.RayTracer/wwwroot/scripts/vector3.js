var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.getX = function () {
        return this.x;
    };
    Vector3.prototype.getY = function () {
        return this.y;
    };
    Vector3.prototype.getZ = function () {
        return this.z;
    };
    Vector3.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.add = function (other) {
        return new Vector3(this.x + other.getX(), this.y + other.getY(), this.z + other.getZ());
    };
    Vector3.prototype.subtract = function (other) {
        return new Vector3(this.x - other.getX(), this.y - other.getY(), this.z - other.getZ());
    };
    Vector3.prototype.multiply = function (other) {
        return new Vector3(this.x * other.getX(), this.y * other.getY(), this.z * other.getZ());
    };
    Vector3.prototype.scale = function (ratio) {
        return new Vector3(this.x * ratio, this.y * ratio, this.z * ratio);
    };
    Vector3.prototype.dotProduct = function (other) {
        return (this.x * other.getX()) + (this.y * other.getY()) + (this.z * other.getZ());
    };
    Vector3.prototype.crossProduct = function (other) {
        return new Vector3(this.y * other.getZ() - this.z * other.getY(), this.z * other.getX() - this.x * other.getZ(), this.x * other.getY() - this.y * other.getX());
    };
    Vector3.prototype.normalize = function () {
        var length = this.length();
        return new Vector3(this.x / length, this.y / length, this.z / length);
    };
    Vector3.prototype.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    Vector3.LEFT = new Vector3(-1, 0, 0);
    Vector3.RIGHT = new Vector3(1, 0, 0);
    Vector3.UP = new Vector3(0, 1, 0);
    Vector3.DOWN = new Vector3(0, -1, 0);
    Vector3.BACKWARD = new Vector3(0, 0, 1);
    Vector3.FORWARD = new Vector3(0, 0, -1);
    return Vector3;
}());
