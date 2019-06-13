/* Generates the explosion part of the fireworks using
 * a rudimentary physics engine */
function Particle(x, y, explosion, hue)
{
    this.hue = hue;
    this.lifespan = random(200,300);
    this.explosion = explosion;
    this.pos = createVector(x,y);
    this.acceleration = createVector(0,-2);

    /* Set phsyics of particles */
    if (!this.explosion) {
        this.velocity = createVector(random(-0.1,0.1),random(-6,-14));
    }
    else {
        if (random(1) > 0.5) {
            this.velocity = createVector(random(4,-4),random(0,-4));
        }
        else {
            this.velocity = p5.Vector.random2D();
            this.velocity.mult(random(1,3));
        }
    }

    /* Accelerate using force - sorry mass! */
    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    /* Updates the particle's properties */
    this.update = function() {
        if (this.explosion) {
            this.velocity.mult(random(0.99,0.999));
            this.lifespan -= random(4,8);
        }
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);
    }

    /* Remove this particle */
    this.done = function() {
        if (this.lifespan < 0 ) {
            return true;
        }
        else {
            return false;
        }
    }

    /* Draws the point on the canvas */
    this.show = function() {
        if (this.explosion) {
            strokeWeight(6);
            stroke(this.hue[0], this.hue[1], this.hue[2],this.lifespan);
        }
        else {
            strokeWeight(10);
            stroke(this.hue[0], this.hue[1], this.hue[2]);
        }
        
        point(this.pos.x, this.pos.y);
    }
}