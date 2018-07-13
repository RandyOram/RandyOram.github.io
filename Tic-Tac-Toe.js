var gameBoard = [0,0,0,0,0,0,0,0,0];
var isGameOver = false;

function main()
{
	$('.button').hide();
	let mouseCoords = [];
	var player1 = "X";
	var player2 = "O";
	var currentTurn = 1;
	var movesMade = 0;
	$('td').on('click',function(event)
	{
		if (!isGameOver)
		{
			++movesMade;

			if ( currentTurn === 1 )
			{
				event.target.innerHTML = player1;
				event.target.style.color = "red";
				updateBoard(parseInt(event.target.id),player1.charCodeAt(0));
				++currentTurn;
				$('#gameinfo span').text('O\'s turn!');
			}
			else
			{
				event.target.innerHTML = player2;
				event.target.style.color = "blue";
				updateBoard(parseInt(event.target.id),player2.charCodeAt(0));
				--currentTurn;
				$('#gameinfo span').text('X\'s turn!');
			}

			isGameOver = checkWinCondition();
			if (isGameOver)
			{
				if (movesMade % 2 === 0)
				{
					$('#gameinfo span').text('O wins!');
				}
				else
				{
					$('#gameinfo span').text('X wins!');
				}
				$('.button').fadeIn(50);
				triggerConfetti(event.clientX,event.clientY);
			}
		}
		else
		{
			document.addEventListener('click',triggerConfetti(event.clientX,event.clientY));
		}
		
	});

	$('.button').on('click',function()
	{
		window.location.reload();
	});

	function checkWinCondition()
	{
		if (movesMade > 4)
		{
			/* Check Horizontals */
			for (var i = 0; i < 8; i += 3)
			{

				if ( (gameBoard[i] + gameBoard[i+1] + gameBoard[i+2]) === 264 || (gameBoard[i] + gameBoard[i+1] + gameBoard[i+2]) === 237 )
				{
					/* Indicates winning squares */
					document.getElementById( (i).toString() ).style.color = "green";
					document.getElementById( (i+1).toString() ).style.color = "green";
					document.getElementById( (i+2).toString() ).style.color = "green";
					document.getElementById( (i).toString() ).style.fontWeight = "bolder";
					document.getElementById( (i+1).toString() ).style.fontWeight = "bolder";
					document.getElementById( (i+2).toString() ).style.fontWeight = "bolder";

					/* Indicates losing squares */
					for (var j = 0; j < 9; ++j)
					{
						if ( (j != (i) && j != (i+1) && j != (i+2) ) && document.getElementById(j.toString()))
						{
							document.getElementById(j.toString()).style.color = "gray";
						}
					}
					return true;
				}
			}

			/* Check Verticals */
			for (var i = 0; i < 3; i += 1)
			{
				if ( (gameBoard[i] + gameBoard[i+3] + gameBoard[i+6]) === 264 || (gameBoard[i] + gameBoard[i+3] + gameBoard[i+6]) === 237 )
				{
					/* Indicates winning squares */
					document.getElementById( (i).toString() ).style.color = "green";
					document.getElementById( (i+3).toString() ).style.color = "green";
					document.getElementById( (i+6).toString() ).style.color = "green";
					document.getElementById( (i).toString() ).style.fontWeight = "bolder";
					document.getElementById( (i+3).toString() ).style.fontWeight = "bolder";
					document.getElementById( (i+6).toString() ).style.fontWeight = "bolder";

					/* Indicates losing squares */
					for (var j = 0; j < 9; ++j)
					{
						if ( (j != (i) && j != (i+3) && j != (i+6) ) && document.getElementById(j.toString()))
						{
							document.getElementById(j.toString()).style.color = "gray";
						}
					}
					return true;
				}
			}

			/* Check diagonals */
			if ( (gameBoard[0] + gameBoard[4] + gameBoard[8]) === 264 || (gameBoard[0] + gameBoard[4] + gameBoard[8]) === 237 )
			{
				document.getElementById( "0" ).style.color = "green";
				document.getElementById( "4" ).style.color = "green";
				document.getElementById( "8" ).style.color = "green";
				document.getElementById( "0" ).style.fontWeight = "bolder";
				document.getElementById( "4" ).style.fontWeight = "bolder";
				document.getElementById( "8" ).style.fontWeight = "bolder";

				for (var j = 0; j < 9; ++j)
				{
					if ( (j != 0 && j != 4 && j != 8 ) && document.getElementById(j.toString()))
					{
						document.getElementById(j.toString()).style.color = "gray";
					}
				}
				return true;
			}
			else if ( (gameBoard[2] + gameBoard[4] + gameBoard[6]) === 264 || (gameBoard[2] + gameBoard[4] + gameBoard[6]) === 237 )
			{
				document.getElementById( "2" ).style.color = "green";
				document.getElementById( "4" ).style.color = "green";
				document.getElementById( "6" ).style.color = "green";
				document.getElementById( "2" ).style.fontWeight = "bolder";
				document.getElementById( "4" ).style.fontWeight = "bolder";
				document.getElementById( "6" ).style.fontWeight = "bolder";

				for (var j = 0; j < 9; ++j)
				{
					if ( (j != 2 && j != 4 && j != 6 ) && document.getElementById(j.toString()))
					{
						document.getElementById(j.toString()).style.color = "gray";
					}
				}
				return true;
			}
			
		}
	}

	/* Create the tic-toe-grid */
	function updateBoard(position, player)
	{
		gameBoard[position] = player;
	}
}
$(document).ready(main);
