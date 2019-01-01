var fireworks = [];
var gravity;

function setup()
{
    gravity = createVector(0, 0.2);
    
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('margin','0px');
    cnv.style('padding','0px');
    //cnv.style('position','absolute');
    cnv.style('left','0');
    cnv.style('top','0');
    cnv.style('z-index: 1');

    stroke(255);
    strokeWeight(4);
    background(0);
}

function draw()
{
    background(0,25);

    /* Prevent this from running with a conditional */

    if (random(1) < 0.025) {
        fireworks.push(new Firework());
    }
    
    for (var i = fireworks.length-1; i >= 0; --i) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i,1);
        }
    }
    
}