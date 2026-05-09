function c64() {

	// setup code
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

	var c64_black = "#000000";
	var c64_white = "#FFFFFF";
	var c64_red = "#68372B";
	var c64_cyan = "#70A4B2";
	var c64_purple = "#6F3D86";
	var c64_green = "#588D43";
	var c64_blue = "#352879";
	var c64_yellow = "#B8C76F";
	var c64_orange = "#6F4F25";
	var c64_brown = "#433900";
	var c64_light_red = "#9A6759";
	var c64_dark_grey = "#444444";
	var c64_grey = "#6C6C6C";
	var c64_light_green = "#9AD284";
	var c64_light_blue = "#6C5EB5";
	var c64_light_grey = "#959595";
	
	var raster = [c64_dark_grey,
	              c64_brown,
	              c64_grey,
	              c64_orange,
	              c64_light_grey,
	              c64_yellow,
	              c64_white,
	              c64_yellow, 
	              c64_light_grey,
	              c64_orange, 
	              c64_grey,
	              c64_brown,
	              c64_dark_grey
	              ];
	
	var raster2 = [c64_black,
	              c64_blue,
	              c64_cyan,
	              c64_light_blue,
	              c64_white,
	              c64_light_blue,
	              c64_cyan,
	              c64_blue
	              ];
	             
	var borderWidth;
	var borderHeight;
	var charSize;
	var blinkSpeed = 20;
	var cursorBlink = 0;

	this.Draw = function () {

	    context.clearRect(0, 0, canvas.width, canvas.height);

		charSize = (canvas.width * 0.8) / 40;
		var screenWidth = charSize * 40;
		var screenHeight = charSize * 25;		
		
		borderWidth = (canvas.width - screenWidth) / 2;
		borderHeight = (canvas.height - screenHeight) /2 ;		
		
		context.fillStyle = c64_blue;
		context.fillRect(0,0, canvas.width, canvas.height);
		
		context.fillStyle = c64_light_blue;
		context.fillRect(0, 0, canvas.width, borderHeight);
		context.fillRect(0, canvas.height - borderHeight, canvas.width, canvas.height);
		
		context.fillRect(0, 0, borderWidth, canvas.height);
		context.fillRect(canvas.width - borderWidth, 0, canvas.width, canvas.height);		
		
		//context.fillText("HALLO", borderWidth, borderHeight);
		//this.putText(0, 0, "0123456789012345678901234567890123456789");
		this.putText(4, 1, "**** COMMODORE 64 BASIC V2 ****");
		this.putText(1, 3, "64K RAM SYSTEM  38911 BASIC BYTES FREE");
		this.putText(0, 5, "READY.");
		this.drawCursor(0, 6);

		return canvas;
	};
	
	this.putText = function(x, y, text) {
		context.font = charSize + "px CommodoreServer";
		context.textBaseline = "top";
		context.fillStyle = c64_light_blue;
		context.fillText(text, borderWidth + charSize * x, borderHeight + charSize * y);
	};
	
	this.drawCursor = function(x, y) {
		if (cursorBlink > blinkSpeed) {
		context.fillStyle = c64_light_blue;
		var x = borderWidth + charSize * x;
		var y = borderHeight + charSize * y;
		
		context.fillRect(x, y, charSize, charSize);
		}
		cursorBlink = (cursorBlink + 1) % (2 * blinkSpeed);
		
	};
	
	

};
