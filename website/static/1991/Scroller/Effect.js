function Scroller() {
    
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    var numberoftweets = 0;
    var tweetnr = 0;
    var tweets;
    var text = "          Party like it is 1991! Vote for us in the Wild Compo!         ";
    //twitterFetcher.fetch('401478684990648320', 'example4', 3, true, true, true, '', false, handleTweets, false);

    function handleTweets(twts) {
        tweetnr = 0;
        tweets = twts;
        numberoftweets = tweets.length;       
        text = tweets[tweetnr];
        text = "          " + remove_tags(text) + "          ";        
    }

    function remove_tags(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    }

    var WAIT = 1;
    var WIDTH = 320;
    var HEIGHT = 200;
    var wait = WAIT;
    var number = 0;
    var x = WIDTH;

    var imageObj = new Image();
    imageObj.src = "Scroller/Resources/background3.png";

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (tweets && tweetnr < tweets.length) {
            text = tweets[tweetnr];
            text = "          " + remove_tags(text) + "          ";
        }
        else
            text = "          Party like it is 1991! Vote for us in the Wild Compo!           ";


        context.font = HEIGHT + "px Impact";

        context.save();
        
        // draw it up and to the left by half the width
        // and height of the image 
        context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

        context.textBaseline = "middle";
        context.fillStyle = colors.White;
        document.body.style.background = colors.Black;
        
        var zoomfactorx = canvas.width / WIDTH;
        var zoomfactory = canvas.height / HEIGHT * 0.9;

        context.scale(zoomfactorx, zoomfactory);

        // Specify the shadow colour.
        context.shadowColor = "rgba(0,0,0,0.7)";

        // Specify the shadow offset.
        context.shadowOffsetX = 50;
        context.shadowOffsetY = 50;

        context.fillText(text.toUpperCase(), x, HEIGHT / 2);
        context.restore();        

        wait--;
        if (wait <= 0) {
            wait = WAIT;
            x = x - 12;
        }

        if (x < -context.measureText(text).width) {
            //tweetnr++;
            //if (tweetnr > numberoftweets - 1)
            //    twitterFetcher.fetch('401478684990648320', 'example4', 3, true, true, true, '', false, handleTweets, false);

            next = true;
            x = WIDTH;
        }
        else {
            next = false;
            frames = 0;
        }

        return canvas;
    }
}