// var offset = new Date().getTimezoneOffset();
// console.log(offset);

// var newYearDate = new Date(2019, 0, 1, 0, 0, 0, 0);
// var currDate;
// var isNewYear = false;
// /* Adjusts timer */
// function countdown() {
//     // must calculate number of seconds between now and new year
//     currDate = new Date();
//     //document.getElementById("countdown-container").innerHTML = (newYearDate.getHours().toString() + " " + newYearDate.getMinutes().toString() + " " + newYearDate.getSeconds().toString());
//     setInterval(function() { 
//         document.getElementById("countdown-container").innerHTML = (currDate.toDateString() + " " + currDate.toTimeString());
//     }, 1000);
    
// }

// /* Remove the timer and trigger the fireworks */
// function removeTimer() {
    
// }

// countdown();

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

    /* */
    if ((date.getDay() === 0) && (date.getDay() === 0))
    {
        newYear = true;
    }

    /* Check if it's the new year! */
    if (newYear || (!newYear && (date.toString() === newYearDate.toString())))
    {
        newYear = true;
        document.getElementById('countdown').innerHTML = 'Happy New Year!';
        document.getElementById(id).innerHTML = result;
        return true;
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

    setTimeout('date_time("'+id+'");','1000');
    return true;
}

date_time('countdown-container');