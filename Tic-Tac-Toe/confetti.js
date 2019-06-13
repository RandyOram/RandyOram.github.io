function triggerConfetti(xPos, yPos)
{
	let decelerate = 1;
	let canvas = document.getElementById('confetti');

	var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
	canvas.width = dimension[0];
	canvas.height = dimension[1];

	let ctx = canvas.getContext('2d');
	let pieces = [];
	let numPieces = 750;
	let lastUpdateTime = Date.now();

	function getRandomColor()
	{
		colors = ['#f00','#0f0','#00f','#0ff','#ff0','#f0f'];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function update()
	{
		let currUpdateTime = Date.now(), dt = currUpdateTime - lastUpdateTime;
		for (let i = pieces.length - 1; i >= 0; --i)
		{
			let currPiece = pieces[i];

			if (currPiece.y > canvas.height)
			{
				pieces.splice(i, 1);
				continue;
			}


			currPiece.x += (currPiece.xVelocity);
			currPiece.y += (currPiece.yVelocity + currPiece.gravity * dt);
			currPiece.rotation += currPiece.rotationSpeed;
		}
		setTimeout(update, 1);
	}

	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		pieces.forEach(function(currPiece)
		{
			ctx.save();

			ctx.fillStyle = currPiece.color;
			ctx.translate(currPiece.x + (currPiece.size / 2), currPiece.y + (currPiece.size / 2));
			ctx.rotate(currPiece.rotation);
			ctx.fillRect(-currPiece.size / 2, -currPiece.size / 2, currPiece.size, currPiece.size);

			ctx.restore();
		});

		requestAnimationFrame(draw);
	}

	function piece(x, y)
	{
		this.x = x;
		this.y = y;
		this.size = (Math.random()*0.5 + 0.75)* 10;
		this.xVelocity = (Math.random() < 0.5 ? -2 : 2) * (Math.random() * 10) * 0.1;
		this.yVelocity = (Math.random() < 0.9 ? -2 : 0.1) * (Math.random() * 10) * 0.1;
		this.gravity = (Math.random()*0.5 + 0.75) * 0.001;
		this.rotation = (Math.PI * 2) * Math.random();
		this.rotationSpeed = (Math.PI * 2) * Math.random() * 0.005;
		this.color = getRandomColor();
	}

	while (pieces.length < numPieces)
	{
		pieces.push(new piece(xPos,yPos));
	}

	update();
	draw();
}
