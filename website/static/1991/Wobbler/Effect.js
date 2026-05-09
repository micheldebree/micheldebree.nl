function Wobbler() {

    // setup code 
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var angle = 0;              
    var zoom = 1.0;
    var zoomPhase = 0;
    var sinPhase = 0;
    var sinPhase2 = Math.PI;
    var sinPhase3 = 0;
    var sinPhase4 = Math.PI;

    var imageObj = new Image();
    imageObj.src = "Wobbler/Resources/boombox2.png";

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        var w = imageObj.width + Math.sin(sinPhase3) * 100; 
        var h = imageObj.height + Math.sin(sinPhase4) * 100; 
        
        for (var i = 0; i < 1; i++) {
            x = canvas.width / 2 + Math.sin(sinPhase + i*0.1) * 300;
            y = canvas.height / 2 + Math.sin(sinPhase2 + i*0.1) * 300;
            zoom = 2 + Math.sin(zoomPhase + i *0.2);
            this.Rotate(context, imageObj, x, y, angle+5*i, w * zoom, h * zoom);
        }

        // update
        sinPhase += 0.08;
        sinPhase2 += 0.05;
        sinPhase3 += 0.1;
        sinPhase4 += 0.2;
        zoomPhase -= 0.03;
        angle = (angle + 0) % 360;

        return canvas;
    }

    this.Rotate = function (context, image, x, y, angle, width, height) {
        context.save();
        context.translate(x, y);
        context.rotate(angle * Math.PI / 180);
        context.drawImage(image, -(width / 2), -(height / 2), width, height);
        context.restore();
    }
}
