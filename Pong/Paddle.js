function paddle(isLeft) {
    if (isLeft)
    {
        this.x = 5; 
        this.isLeft = true;
    }
    else
    {
        this.x = windowWidth - 15;
        this.isLeft = false;
    }
    
    this.y = windowHeight / 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    
    this.update = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y < 10)
            this.y = 10;
        else if (this.y > windowHeight - 110)
            this.y = windowHeight - 110;
    }

    this.show = function() {
        fill(255);
        
        rect(this.x, this.y, 10, 100);  
    }

    this.checkBoundary = function() {
        if ((this.y < windowHeight) || (this.y + 100 > windowHeight))
        {
            console.log("Hello");
            return true;
        }
    }

    this.isMoving = function() {
        return this.ySpeed != 0;
    }
}