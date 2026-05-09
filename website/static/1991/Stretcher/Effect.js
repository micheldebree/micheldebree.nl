function Stretcher() {

    // setup code 
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

   var sinPhase = 0;
   var sinPhase2 = 0;
   var sinAmp = 40;
   var sinAmp2 = 200;
   var zoom = 2;
	
   var imageObj = new Image();
   imageObj.src = "Stretcher/Resources/krokodil.png";
    
   this.Draw = function () {

       context.clearRect(0, 0, canvas.width, canvas.height);

	   var offs = 0;
	   var x = (canvas.width - imageObj.width*zoom)/2 + Math.sin(sinPhase2) * sinAmp2;
	   for (var y =0; y < 400; y++) {
		
		   var lineNr = y + -sinAmp + sinAmp *Math.sin(sinPhase + offs);
		   this.DrawLine(imageObj, x, y , lineNr);
		   offs += 0.015;
	   }
	   sinPhase += 0.1;
	   sinPhase2 += 0.04;

	   return canvas;
    };

    this.DrawLine = function (image, x, y, lineNr) {
    	context.drawImage(image, 0, lineNr, image.width, 1, x, y*zoom, image.width*zoom, zoom);
    };

}
