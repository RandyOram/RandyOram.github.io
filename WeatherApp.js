var weather;
function setup()
{
	createCanvas(500,500);
	loadJSON("api.openweathermap.org/data/2.5/forecast?q=Houston&APPID=1af755e1dccfae12d193c56c18b8f9bf",gotData);
}

function gotData(data)
{
	weather = data;
}

function draw()
{
	background(0);
	if (weather)
	{
		ellipse(250,250,weather.main.temp,weather.main.temp);
	}
}
