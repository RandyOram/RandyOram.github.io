function main()
{
	$('.button').on('click',function()
	{
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("POST", "https://api.darksky.net/forecast/fb2905b05b877d0a1983b5c982316c88/30.1658,-95.4613", true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    var response = JSON.parse(xhttp.responseText);
	    alert('testing');
	    draw(response);
	});
}

function draw(response)
{
	println(response);
}
