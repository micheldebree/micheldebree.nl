function Combiner(effect1, effect2) {
    
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    this.Draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(effect1.Draw(), 0, 0, canvas.width, canvas.height);
        context.drawImage(effect2.Draw(), 0, 0, canvas.width, canvas.height);
        return canvas;
    }
}
