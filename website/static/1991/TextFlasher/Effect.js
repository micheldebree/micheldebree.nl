function TextFlasher() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var text = new Array();
    text[0] = "1991";
    text[1] = "PARTY";
    text[2] = "2013";
    text[3] = "DANCE";
    text[4] = "DEMO";
    text[5] = "C64";
    text[6] = "HTML5";
    text[7] = "WOOP";
    text[8] = "WOOP";

    var WAIT = 8;
    var WIDTH = 32;
    var HEIGHT = 20;
    var wait = WAIT;
    var number = 0;

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = HEIGHT + "px Impact";

        context.save();
        context.textAlign = "center";
        context.textBaseline = "middle";
        if (number % 2) {
            context.fillStyle = colors.White;
            document.body.style.background = colors.Black;
        }
        else {
            context.fillStyle = colors.Black;
            document.body.style.background = colors.White;
        }
        var zoomfactorx = canvas.width / WIDTH;
        var zoomfactory = canvas.height / HEIGHT;
        context.scale(zoomfactorx, zoomfactory);
        context.fillText(text[number], WIDTH / 2, HEIGHT / 2, WIDTH);
        context.restore();

        wait--;
        if (wait <= 0) {
            wait = WAIT;
            number++;
            if (number > text.length - 1) {
                number = 0;
                frames = 0;
                next = true;
            }
        }
        else {
            next = false;
            frames = 0;
        }
        return canvas;
    }
}