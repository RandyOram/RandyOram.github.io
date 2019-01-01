var newYearDate = new Date(2019, 0, 1, 0, 0, 0, 0);

var newYear = false;
function date_time(id)
{
    var date = new Date;
    
    /* Display the date */
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var d = date.getDate();
    var day = date.getDay();
    var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var h = date.getHours();
    if(h<10)
    {
            h = "0"+h;
    }
    var m = date.getMinutes();
    if(m<10)
    {
            m = "0"+m;
    }
    var s = date.getSeconds();
    if(s<10)
    {
            s = "0"+s;
    }
    
    var result = ''+months[month]+' '+d+', '+year+' '+h+':'+m+':'+s;

    /* Get the number of seconds between now and the new year */
    var currTimeMS = date.getTime();
    var currTimeSec = 1000 * Math.trunc(currTimeMS / 1000);
    var secondsRemaining = ((newYearDate.getTime() - currTimeSec) / 1000);
    
    /* Checks if it's already January of the new year! */
    if ((date.getMonth() === 0) && (date.getDate() === 1))
    {
        newYear = true;
    }

    /* Check if it's the new year! */
    if (newYear || (!newYear && (date.toString() === newYearDate.toString())))
    {
        newYear = true;
        document.getElementById('countdown').innerHTML = 'Happy New Year!';
    }

    /* Update the timer */
    document.getElementById(id).innerHTML = result;

    /* Disable seconds countdown */
    if (!newYear);
    {
        document.getElementById('countdown').innerHTML = secondsRemaining;
    }

    /* Reset new year */
    if ( (date.getDay() > 0) && (date.getMonth() > 0) )
    {
        newYear = false;
    }

    /* Run it every second! */
    setTimeout('date_time("'+id+'");','1000');
    return true;
}

date_time('countdown-container');
