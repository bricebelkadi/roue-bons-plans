export default class Utils {

    static purifyColor(color) {
        var randIndex = Math.round(Math.random() * 3);
        color[randIndex] = 0;
        return color;
    }

    static getRandomColor() {
        var r = 100 + Math.round(Math.random() * 55);
        var g = 100 + Math.round(Math.random() * 55);
        var b = 100 + Math.round(Math.random() * 55);
        return this.purifyColor([r, g, b]);
    }

    static getRandomReward() {
        var mainDigit = Math.round(Math.random() * 9);
        return mainDigit + '\n0\n0';
    }
}