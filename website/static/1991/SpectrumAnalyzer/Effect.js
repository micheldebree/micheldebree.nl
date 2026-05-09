function SpectrumAnalyzer()
{
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var bar_width = 100;
    var width = canvas.width;
    var height = canvas.height;
    var maxValue = new Array();
    var barCount = Math.round(width / bar_width);
    for (var i = 0; i < barCount; i++) {
        maxValue[i] = height + 1;
    }

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        width = canvas.width;
        height = canvas.height;

        var block_height = 25;
        var y2 = block_height - 5;

        var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
        myAudioAnalyser.getByteFrequencyData(freqByteData);

        for (var i = 0; i < barCount; i++) {
            maxValue[i] = maxValue[i] + 3;
            if (maxValue[i] == undefined || maxValue[i] == null || maxValue[i] == 0 || maxValue[i] > height) {
                maxValue[i] == height + 1;
            }

            var magnitude = freqByteData[i*5];
            var bar_height = Math.round((magnitude * 2) / block_height);
            
            for (var j = 0; j < bar_height; j++) {
                var y1 = height - (j*block_height);
                
                if (y1 > height - (block_height * 5))
                    context.fillStyle = colors.Green;
                if (y1 < height - (block_height * 5))
                    context.fillStyle = colors.Yellow;
                if (y1 < height - (block_height * 10))
                    context.fillStyle = colors.Red;

                if (y1 < maxValue[i]) {
                    maxValue[i] = y1;
                }
                context.fillRect(bar_width * i, y1, bar_width - 5, y2);                
            }
            context.fillStyle = colors.LightRed;
            context.fillRect(bar_width * i, maxValue[i], bar_width - 5, y2);            
        }        
        return canvas;
    }
}