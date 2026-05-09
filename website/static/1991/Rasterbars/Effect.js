function Rasterbars(spd, height, nr, bar, dist, loc, x, w) {

	// setup code
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var sinPhase1 = 0;
    var twoPI = 2*Math.PI;
    var h = 2;
    var yPos = loc * canvas.height;
    var rasterH = height * canvas.height;
    	
    this.Draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < nr; i++) {
            var y = (yPos + rasterH * Math.sin(sinPhase1 + i * dist));
            this.Raster(bar, y);
        }
        sinPhase1 = (sinPhase1 + spd) % twoPI;
        return canvas;      
	};

    this.Raster = function(colors, y) {
       for (var i = 0; i < bar.length; i++) 
        {
            context.fillStyle =  colors[i];
            context.fillRect(x, y+i*h, w, h);
        } 
    }
	

};
