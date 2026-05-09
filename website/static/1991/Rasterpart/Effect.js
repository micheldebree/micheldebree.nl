function Rasterpart() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var bar1 = [
        colors.Black,
        colors.Brown, 
        colors.DarkGray,
        colors.LightBrown, 
        colors.Gray,
        colors.LightGray,
        colors.Yellow, 
        colors.White, 
        colors.Yellow, 
        colors.LightGray,
        colors.Gray,
        colors.LightBrown, 
        colors.DarkGray,
        colors.Brown,
        colors.Black        
    ];


    var bar2 = [
        colors.Black,
        colors.Blue,
        colors.DarkGray,
        colors.LightBlue,
        colors.Gray,
        colors.LightGray,
        colors.Cyan,
        colors.White,
        colors.Cyan,
        colors.LightGray,
        colors.Gray,
        colors.LightBlue,
        colors.DarkGray,
        colors.Blue,
        colors.Black
    ];

    var middle = canvas.height / 2;
    var ratio = 0.6;
    var raster1 = new Rasterbars(0.1, 0.2, 5, bar1, 0.3, 0.3, 0, canvas.width * ratio );
    var raster2 = new Rasterbars(0.09, 0.2, 8, bar2, 0.3, 0.6, canvas.width * ratio, canvas.width * (1-ratio));
    	
    this.Draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(raster1.Draw(), 0, 0, canvas.width, canvas.height);
        context.drawImage(raster2.Draw(), 0, 0, canvas.width, canvas.height);
        return canvas;      
	};
	

};
