function ball() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.xSpeed = -10;
    this.ySpeed = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 10);

    this.update = function () {
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    this.show = function() {
        fill(255);

        rect(this.x, this.y, 10, 10);
    }

    this.reset = function(isLeft) {
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
        this.xSpeed = isLeft ? -10 : 10;
        this.ySpeed = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 10);
    }
}