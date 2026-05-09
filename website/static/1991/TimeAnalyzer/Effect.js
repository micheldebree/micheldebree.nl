function TimeAnalyzer()
{
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        var width = canvas.width;
        var y = canvas.height / 2;
        var HEIGHT = 400;
        var times = new Uint8Array(myAudioAnalyser.frequencyBinCount);

        myAudioAnalyser.getByteTimeDomainData(times);

        // Draw the time domain chart.
        for (var i = 0; i < myAudioAnalyser.frequencyBinCount; i++) {
            var value = times[i];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            var barWidth = width / myAudioAnalyser.frequencyBinCount;
            context.fillStyle = colors.Cyan;
            context.fillRect(i * barWidth, y + offset - HEIGHT / 2, 5, 5);
        }
        return canvas;
    }
}