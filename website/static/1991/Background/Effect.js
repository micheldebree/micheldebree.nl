function Background(nr) {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var angle = 360;
    var imageObj = new Image();
    imageObj.src = "Background/Resources/background" + nr.toString() + ".png";

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        // update
        angle--;
        if (angle > 360)
            angle = 0;
        else if (angle < 0)
            angle = 360;

        drawRotatedImage(imageObj, canvas.width / 2, canvas.height / 2, angle, canvas.width * 1.3);

        return canvas;
    }

    function drawRotatedImage(image, x, y, angle, size) {
        // save the current co-ordinate system 
        // before we screw with it
        context.save();

        // move to the middle of where we want to draw our image
        context.translate(x, y);

        // rotate around that point, converting our 
        // angle from degrees to radians 
        context.rotate(angle * Math.PI / 180);

        // draw it up and to the left by half the width
        // and height of the image 
        context.drawImage(image, -(size / 2), -(size / 2), size, size);

        // and restore the co-ords to how they were when we began
        context.restore();
    }
}