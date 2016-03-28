class Color {

    constructor(private red, private green, private blue) { }

    getRed() {
        return this.red;
    }

    getGreen() {
        return this.green;
    }

    getBlue() {
        return this.blue;
    }
   
    add(other: Color) {
        return new Color(this.red + other.getRed(), this.green + other.getGreen(), this.blue + other.getBlue());
    }

    subtract(other: Color) {
        return new Color(this.red - other.getRed(), this.green - other.getGreen(), this.blue - other.getBlue());
    }

    multiply(other: Color) {
        return new Color(this.red * other.getRed(), this.green * other.getGreen(), this.blue * other.getBlue());
    }

    scale(ratio: number) {
        return new Color(this.red * ratio, this.green * ratio, this.blue * ratio);
    }

    clone() {
        return new Color(this.red, this.green, this.blue);
    }

    static BLACK  = new Color(  0,   0,   0);
    static WHITE  = new Color(255, 255, 255);
    
    static RED    = new Color(255,   0,   0);
    static GREEN  = new Color(  0, 255,   0);
    static BLUE   = new Color(  0,   0, 255);

    static YELLOW = new Color(255, 255,   0);
    static PURPLE = new Color(255,   0, 255);
    static CYAN   = new Color(  0, 255, 255);

}
