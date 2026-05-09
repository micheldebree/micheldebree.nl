function Dancer() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var Dancer = new Array();
    var BackgroundColors = new Array();
    var number = 1;
    var WAIT = 12;
    var wait = WAIT;
    var dancerheight = 450;
    var dancerwidth = 500;
    var terug = false;
    var shadows = 0;

    for (var i = 1;i < 10;i++)
    {
        Dancer[i] = new Image();
        Dancer[i].src = "Dancer/Resources/Dancer" + i.toString() + ".png";
    }
    
    BackgroundColors[1] = colors.Cyan;
    BackgroundColors[2] = colors.LightBlue;
    BackgroundColors[3] = colors.Blue;
    BackgroundColors[4] = colors.Purple;
    BackgroundColors[5] = colors.Red;
    BackgroundColors[6] = colors.LightRed;
    BackgroundColors[7] = colors.LightBrown;
    BackgroundColors[8] = colors.Yellow;
    BackgroundColors[9] = colors.White;
    BackgroundColors[10] = colors.LightGray;

    this.Draw = function () {
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        effectwidth = canvas.width;
        effectheight = canvas.height;

        if (effectheight <= dancerheight) {
            dancerwidth = effectheight / dancerheight * dancerwidth;
            dancerheight = effectheight;
        }
        else {
            dancerheight = 900;
            dancerwidth = 1000;
        }

        if (shadows == 0) {
            for (var i = 1; i < number; i++) {
                context.globalAlpha = i / number;
                context.drawImage(Dancer[i], effectwidth / 2 - (dancerwidth) + (i * effectwidth / 20), effectheight - dancerheight, dancerwidth, dancerheight);
            }
        }
        else {
            context.globalAlpha = 0.8;
            context.drawImage(Dancer[number], effectwidth / 2 - (dancerwidth / 2), effectheight - dancerheight, dancerwidth, dancerheight);
        }

        document.body.style.background = BackgroundColors[number];

        wait--;
        if (wait <= 0) {
            wait = WAIT;
            number++;
            if (number > Dancer.length - 1) {
                number = 1;
                frames = 0;
                if (shadows == 0)
                    shadows = 1;
                else
                    shadows = 0;
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