var Color = (function () {
    function Color(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    Color.prototype.getRed = function () {
        return this.red;
    };
    Color.prototype.getGreen = function () {
        return this.green;
    };
    Color.prototype.getBlue = function () {
        return this.blue;
    };
    Color.prototype.add = function (other) {
        return new Color(this.red + other.getRed(), this.green + other.getGreen(), this.blue + other.getBlue());
    };
    Color.prototype.subtract = function (other) {
        return new Color(this.red - other.getRed(), this.green - other.getGreen(), this.blue - other.getBlue());
    };
    Color.prototype.multiply = function (other) {
        return new Color(this.red * other.getRed(), this.green * other.getGreen(), this.blue * other.getBlue());
    };
    Color.prototype.scale = function (ratio) {
        return new Color(this.red * ratio, this.green * ratio, this.blue * ratio);
    };
    Color.prototype.clone = function () {
        return new Color(this.red, this.green, this.blue);
    };
    Color.BLACK = new Color(0, 0, 0);
    Color.WHITE = new Color(255, 255, 255);
    Color.RED = new Color(255, 0, 0);
    Color.GREEN = new Color(0, 255, 0);
    Color.BLUE = new Color(0, 0, 255);
    Color.YELLOW = new Color(255, 255, 0);
    Color.PURPLE = new Color(255, 0, 255);
    Color.CYAN = new Color(0, 255, 255);
    return Color;
})();
