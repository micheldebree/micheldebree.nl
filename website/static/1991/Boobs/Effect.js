function Boobs(canvas, context) {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var Dancer = new Array();
   
    var sequence = [0,1,2,3,2,1];
    var count = 0;
    var frameRate = 5;
    var subFrame = 0;
    var framesPerClip = 4;
    var clips = 4;
    var clip = 0;
    var clipDelay = 20;
    var delayCount = 0;

    for (var i = 0;i < framesPerClip * clips; i++)
    {
        Dancer[i] = new Image();
        Dancer[i].src = "Boobs/Resources/Boobs" + i.toString() + ".png";
    }
    
    this.Draw = function () {
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        var frame = sequence[count];
        subFrame  = (subFrame + 1) % frameRate;
        if (subFrame == 0) {
            count = (count + 1) % sequence.length;
            delayCount = (delayCount + 1) % clipDelay;
            if (delayCount == 0) {
                clip = (clip + 1) % clips;
            }
        }
        context.drawImage(Dancer[clip * framesPerClip + frame], 0, 0, canvas.width, canvas.height);
        return canvas;
    }
}
