var paddle;
var ball;
var leftScore = 0;
var rightScore = 0;
let myFont;
var firstRound = true;

function preload() {
    myFont = loadFont("data/PressStart2p.ttf");
}

function setup() {
    var cnv = createCanvas(windowWidth,windowHeight);
    cnv.style('margin','0px');
    cnv.style('padding','0px');
    cnv.style('left','0');
    cnv.style('top','0');
    
    textAlign(CENTER, CENTER);
    textFont(myFont);
    textSize(75);

    leftPaddle = new paddle(true);
    rightPaddle = new paddle(false);
    ball = new ball();
}

function draw()
{
    updateBoard();
    leftPaddle.update();
    leftPaddle.show();
    rightPaddle.update();
    rightPaddle.show();
    ball.show();
    ball.update();

    updateSpeeds();
    collision();
    boundary();
    scoreCheck();
    stopDrainingMyBattery();
    //console.log("Ball x is " + ball.x + " | Ball y is " + ball.y + " | Paddle x is " + leftPaddle.x + "| Paddle Y is " + leftPaddle.y);
}

function updateBoard() 
{
    background(51);

    if (this.firstRound)
    {
        for (currHeight = 0; currHeight <= windowHeight; currHeight += 24)
        {
            rect(windowWidth/2 - 3.5, currHeight, 12, 12);
        }
    }
    
    fill(255);
    text(this.leftScore.toString(), windowWidth/2 - 150, 150);
    text(this.rightScore.toString(), windowWidth/2 + 150, 150);    
}

function stopDrainingMyBattery()
{
    if (keyIsDown(UP_ARROW) && keyIsDown(DOWN_ARROW) && keyIsDown(87))
    {
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        ball.x = windowWidth/2;
        ball.y = windowHeight/2;
    }
}

function updateSpeeds() {
    if (keyIsDown(UP_ARROW) && keyIsDown(87)) {
        rightPaddle.ySpeed = -13;
        leftPaddle.ySpeed = -13;
    }
    else if (keyIsDown(DOWN_ARROW) && keyIsDown(83)) {
        rightPaddle.ySpeed = 13;
        leftPaddle.ySpeed = 13;
    }
    else if (keyIsDown(UP_ARROW) && keyIsDown(83)) {
        rightPaddle.ySpeed = -13;
        leftPaddle.ySpeed = 13;
    }
    else if (keyIsDown(DOWN_ARROW) && keyIsDown(87)) {
        rightPaddle.ySpeed = 13;
        leftPaddle.ySpeed = -13;
    }
    else if (keyIsDown(UP_ARROW)) {
        rightPaddle.ySpeed = -13;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        rightPaddle.ySpeed = 13;
    }
    else if (keyIsDown(87)) {
        leftPaddle.ySpeed = -13;
    }
    else if (keyIsDown(83)) {
        leftPaddle.ySpeed = 13;
    }
    else {
        leftPaddle.ySpeed = 0;
        rightPaddle.ySpeed = 0;
    }
}

function keyReleased() {
    if (key == 'W' || key == 'S') {
        leftPaddle.ySpeed = 0;
    }
    else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        rightPaddle.ySpeed = 0;
    }
}

function scoreCheck() {
    if (ball.x - 10 >= windowWidth)
    {
        console.log("Ball X is: " + ball.x + ". Window Width is: " + windowWidth);
        ++this.leftScore;
        ball.reset(true);
    }
    else if (ball.x <= 0)
    {
        ++this.rightScore;
        ball.reset(false);
    }
}

function boundary() {
    if ((ball.y <= 1) || ((ball.y + 10) >= (windowHeight - 1))) {
        console.log("Blue!");
        ball.ySpeed = -1 * ball.ySpeed;
    }
}

/* Ball collision */
function collision() {
    // TODO: Make it so y speed correlates to paddle speed rather than position of paddle
    if (ball.x <= leftPaddle.x + 10) {
        if ((ball.y < leftPaddle.y + 20) && (ball.y >= leftPaddle.y)) {
            if (leftPaddle.isMoving())
                ball.ySpeed = -10;
            else
                ball.ySpeed = -7;

            ball.xSpeed = 10;
        }
        else if ((ball.y < leftPaddle.y + 40) && (ball.y >= leftPaddle.y + 20)) {
            if (leftPaddle.isMoving())
                ball.ySpeed = -7;
            else
                ball.ySpeed = -4;

            ball.xSpeed = 10;
        }
        else if ((ball.y < leftPaddle.y + 60) && (ball.y >= leftPaddle.y + 40)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 5);
            else
                ball.ySpeed = 0;

            ball.xSpeed = 10;
        }
        else if ((ball.y < leftPaddle.y + 80) && (ball.y >= leftPaddle.y + 60)) {
            if (leftPaddle.isMoving())
                ball.ySpeed = 7;
            else
                ball.ySpeed = 4;

            ball.xSpeed = 10;
        }
        else if ((ball.y < leftPaddle.y + 100) && (ball.y >= leftPaddle.y + 80)) {
            if (leftPaddle.isMoving())
                ball.ySpeed = 10;
            else
                ball.ySpeed = 7;

            ball.xSpeed = 10;
        }
    }
    else if (ball.x >= rightPaddle.x - 10) {
        if ((ball.y <= rightPaddle.y + 20) && (ball.y >= rightPaddle.y)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = -10;
            else
                ball.ySpeed = -7;

            ball.xSpeed = -10;
        }
        else if ((ball.y < rightPaddle.y + 40) && (ball.y >= rightPaddle.y + 20)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = -7;
            else
                ball.ySpeed = -4;

            ball.xSpeed = -10;
        }
        else if ((ball.y < rightPaddle.y + 60) && (ball.y >= rightPaddle.y + 40)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 5);
            else
                ball.ySpeed = 0;

            ball.xSpeed = -10;
        }
        else if ((ball.y < rightPaddle.y + 80) && (ball.y >= rightPaddle.y + 60)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = 7;
            else
                ball.ySpeed = 4;

            ball.xSpeed = -10;
        }
        else if ((ball.y < rightPaddle.y + 100) && (ball.y >= rightPaddle.y + 80)) {
            if (rightPaddle.isMoving())
                ball.ySpeed = 10;
            else
                ball.ySpeed = 7;

            ball.xSpeed = -10;
        }
    }
}