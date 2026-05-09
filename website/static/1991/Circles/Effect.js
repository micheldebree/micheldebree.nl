function Circles() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var imageObj1 = new Image();
    imageObj1.src = "Circles/Resources/Circle1.png";

    var imageObj2 = new Image();
    imageObj2.src = "Circles/Resources/Circle2.png";

    var imageObj3 = new Image();
    imageObj3.src = "Circles/Resources/Circle3.png";

    var angle = 0;
    var radius = 150;
    radius_add = -1;

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'lighter';

        var x1 = Math.sin(angle + Math.PI * 2 / 3 * 0) * radius;
        var y1 = Math.cos(angle + Math.PI * 2 / 3 * 0) * radius;

        var x2 = Math.sin(angle + Math.PI * 2 / 3 * 1) * radius;
        var y2 = Math.cos(angle + Math.PI * 2 / 3 * 1) * radius;

        var x3 = Math.sin(angle + Math.PI * 2 / 3 * 2) * radius;
        var y3 = Math.cos(angle + Math.PI * 2 / 3 * 2) * radius;
        
        context.drawImage(imageObj1, (canvas.width / 2) - x1 - 100, (canvas.height / 2) - y1 - 100, 200, 200);
        context.drawImage(imageObj2, (canvas.width / 2) - x2 - 100, (canvas.height / 2) - y2 - 100, 200, 200);
        context.drawImage(imageObj3, (canvas.width / 2) - x3 - 100, (canvas.height / 2) - y3 - 100, 200, 200);

        radius = radius + radius_add;
        if (radius <= 0 || radius >= 150) {
            radius_add = -radius_add;
        }

        angle = angle + 0.1;
        if (angle > Math.PI * 2)
            angle = 0;

        return canvas;
    }
}