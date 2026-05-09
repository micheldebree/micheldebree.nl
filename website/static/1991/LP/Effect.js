function LP()
{
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var imageObj = new Image();
    imageObj.src = "LP/Resources/LP.png";
    var LPHeight = 400;
    var LPWidth = 400;

    var imageObj2 = new Image();
    imageObj2.src = "LP/Resources/needle.png";
    var NeedleHeight = 400;
    var NeedleWidth = 500;
    var angle = 0;
    
    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        // update
        angle++;
        if (angle > 360)
            angle = 0;
        else if (angle < 0)
            angle = 360;

        if (canvas.height <= LPHeight) {
            LPWidth = canvas.height / LPHeight * LPWidth;
            LPHeight = canvas.height;
            NeedleWidth = canvas.height / NeedleHeight * NeedleWidth;
            NeedleHeight = canvas.height;
        }
        else {
            LPHeight = 400;
            LPWidth = 400;
            NeedleHeight = 400;
            NeedleWidth = 500;
        }

        // draw LP
        drawRotatedImage(context, imageObj, canvas.width / 2, canvas.height / 2, angle, LPWidth);

        // draw needle
        context.drawImage(imageObj2, canvas.width / 2 - (NeedleWidth * 0.4), canvas.height / 2 - (NeedleHeight / 2), NeedleWidth, NeedleHeight);

        return canvas;
    }

    function drawRotatedImage(context, image, x, y, angle, size) {
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