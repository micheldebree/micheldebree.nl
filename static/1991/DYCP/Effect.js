function DYCP(color) {

	// setup code
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var scrollText="butterflies and pearly white trees ooh. you've got my love, can I have your share?  i'm giving up, i've had enough I can't keep this up, you've got my love i'm giving up, i've had enough I can't keep this up, you've got my love.     ";

	scrollText = scrollText.toUpperCase();
	
	var scrollOffs = 0;
	
	var sinPhase = 0;
	
	var spd = 8;
	var charWidth = (canvas.width * 0.8) / 40;
	var charsw = canvas.width / charWidth;
	var d016 = charWidth;

    var charSize;
    var charColor = color;
	
    this.Draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
	    this.drawDYCP();
	    return canvas;
	};
	
	this.drawDYCP = function() {

		var freq = (Math.PI * 2) / charsw;
		var amp = canvas.height / 3;
		
		context.font = charWidth + "px CommodoreServer";
		context.fillStyle = charColor;
		
		var middle = canvas.height / 2;
		
		for (var i = 0; i < charsw; i ++) {
			var y = middle + Math.sin(sinPhase +  i  * freq) * amp;
			context.fillText(scrollText[(i + scrollOffs) % scrollText.length],  i * charWidth + d016, y);
		}
		
		sinPhase += freq;
		d016 -= spd;
		if (d016 < 0) {
			sinPhase += freq;
			d016 += charWidth;
			scrollOffs++;
		}
	};

};
