declare class Color {
    private red;
    private green;
    private blue;
    constructor(red: any, green: any, blue: any);
    getRed(): any;
    getGreen(): any;
    getBlue(): any;
    add(other: Color): Color;
    subtract(other: Color): Color;
    multiply(other: Color): Color;
    scale(ratio: number): Color;
    clone(): Color;
    static BLACK: Color;
    static WHITE: Color;
}
