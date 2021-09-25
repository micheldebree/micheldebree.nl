function SimpleScroll(yRatio, nrChars, color, spd) {

	// setup code
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var scrollText = "                        Greetings to Reyn, MACE, LKP, Thundax, Exile, Stratford, Annemieke, Hoi-Yin, Wilfred, Bas Bron, Maniacs of Noise ";
    
	scrollText = scrollText.toUpperCase();
	
	var scrollOffs = 0;
	
	var charWidth = (canvas.width * 0.8) / nrChars;
	var charsw = canvas.width / charWidth;
	var d016 = charWidth;

    var charSize;

    var sinPhase = 0;
    var twoPI = 2*Math.PI;
	
	this.Draw = function() {

	    context.clearRect(0, 0, canvas.width, canvas.height);

		context.font = charWidth + "px CommodoreServer";
		context.fillStyle = color;
		
		for (var i = 0; i < charsw+1; i ++) {
			var y = yRatio * canvas.height;
			context.fillText(scrollText[(i + scrollOffs) % scrollText.length],  (i-1) * charWidth + d016, y);
		}
	
		sinPhase = (sinPhase + 0.1) % twoPI;
	
		d016 -= spd;
		if (d016 < 0) {
			d016 += charWidth;
			scrollOffs++;
		}
		return canvas;
	};

};
