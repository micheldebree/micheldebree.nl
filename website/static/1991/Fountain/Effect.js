function Fountain() {

    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    var context = canvas.getContext('2d');

    // init particles
    var particles = [];
    for (var n = 0; n < 10; n++) {
        var img = new Image();
        var i = Math.floor(1 + Math.random() * 6);
        img.src = "Fountain/Resources/object" + i.toString() + ".png";
        particles.push({
            x: canvas.width / 2,
            y: canvas.height + 50,
            vx: -4 + (Math.random() * 8),
            vy: 8 + (Math.random() * 6),
            angle: Math.floor(Math.random() * 360),
            rotation: -4 + Math.floor(Math.random() * 8),
            size: Math.floor(20 * (5 + Math.random() * 4)),
            image: img
        });
    }

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        updateParticles();

        // draw
        drawParticles();

        return canvas;
    }

    function drawParticles() {
        if (particles) {
            for (var n = 0; n < particles.length; n++) {
                var particle = particles[n];
                drawRotatedImage(particle.image, particle.x, particle.y, particle.angle, particle.size);
            }
        }
    }

    function drawRotatedImage(image, x, y, angle, size) {
        // save the current co-ordinate system 
        // before we screw with it
        context.save();

        // move to the middle of where we want to draw our image
        context.translate(x, y);

        // rotate around that point, converting our 
        // angle from degrees to radians 
        context.rotate(angle * Math.PI / 180);

        // draw it up and to the left by half the width
        // and height of the image 
        context.drawImage(image, -(size / 2), -(size / 2), size, size);

        // and restore the co-ords to how they were when we began
        context.restore();
    }

    function updateParticles() {
        for (var n = 0; n < particles.length; n++) {
            var particle = particles[n];

            particle.x += particle.vx;
            particle.y -= particle.vy;
            particle.vy = particle.vy - 0.15;

            particle.angle += particle.rotation;
            if (particle.angle > 360)
                particle.angle = 0;
            else if (particle.angle < 0)
                particle.angle = 360;

            if ((particle.x > canvas.width) || (particle.x < 0) || (particle.y > canvas.height + 50)) {
                particle.x = canvas.width / 2;
                particle.y = canvas.height + 50;
                particle.vx = -4 + Math.random() * 8;
                particle.vy = 8 + Math.random() * 6;
                particle.angle = Math.floor(Math.random() * 360);
                particle.rotation = -4 + Math.floor(Math.random() * 8);
                particle.size = Math.floor(20 * (5 + Math.random() * 4));
                var img = new Image();
                var i = Math.floor(1 + Math.random() * 6);
                img.src = "Fountain/Resources/object" + i.toString() + ".png";
                particle.image = img;
            }
        }
    }
}