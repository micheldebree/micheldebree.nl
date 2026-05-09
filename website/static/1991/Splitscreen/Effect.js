function Splitscreen() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    this.Draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(parts[0].Draw(), 0, 0, 320, 200);
        context.drawImage(parts[1].Draw(), 320, 0, 320, 200);
        context.drawImage(parts[2].Draw(), 640, 0, 320, 200);
        context.drawImage(parts[3].Draw(), 0, 200, 320, 200);
        context.drawImage(parts[4].Draw(), 320, 200, 320, 200);
        context.drawImage(parts[5].Draw(), 640, 200, 320, 200);
        context.drawImage(parts[6].Draw(), 0, 400, 320, 200);
        context.drawImage(parts[7].Draw(), 320, 400, 320, 200);
        context.drawImage(parts[8].Draw(), 640, 400, 320, 200);

        document.body.style.background = colors.DarkGray;

        return canvas;
    }
}