
function Firework()
{
    /* Choose a random color ~ favors reds, greens, and blues */
    if (Math.floor(random(1,4)) === 1)
    {
        this.hue = [255, random(0,100), random(0,100)];
    }
    else if (Math.floor(random(1,4)) === 2)
    {
        this.hue = [random(0,100), 255, random(0,100)];
    }
    else
    {
        this.hue = [random(0,100), random(0,100), 255];
    }
    
    var gravity = createVector(0, 0.2);
    var lesserGravity = createVector(0, 0.1);
    this.firework = new Particle(random(width), height, false, this.hue);
    this.exploded = false;
    this.particles = [];

    /* Updates firework state */
    this.update = function()
    {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            /* Make the particle explode! */
            if (this.firework.velocity.y >= -1) {
                this.exploded = true;
                this.explode();
            }
        }
        for (var i = this.particles.length-1; i >= 0; --i) {
            this.particles[i].applyForce(lesserGravity);
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i,1);
            }
        }
    }

    /* Trigger firework explosion */
    this.explode = function()
    {
        for (var i = 0; i < 100; ++i) {
            var p = new Particle(this.firework.pos.x,this.firework.pos.y, true, this.hue);
            this.particles.push(p);
        }
    }

    this.show = function()
    {
        if (!this.exploded) {
            this.firework.show();
        }
        else {
            for (var i = 0; i < this.particles.length; ++i) {
                this.particles[i].show();
            }
        }
    }

    this.done = function () {
        if (this.exploded && this.particles.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}