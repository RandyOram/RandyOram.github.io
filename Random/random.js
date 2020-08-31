var interval;
var isRunning = false;
var count = 0;

$(document).ready(() => {
    $("#num-seconds").change(handleNumberChange)
    $("#play-btn").click(handlePlay)
    $("#stop-btn").click(handlePause)
})

function changeValue() {
    ++count;
    console.log($("#random-number").val());
    var number = Math.floor(Math.random() * ($("#random-number").val()) + 1);
    $("#output-text").text(number);
    if (count & 1) {
        $("#output-text").css("color", "#8c34eb");
    }
    else {
        $("#output-text").css("color", "#2aa0f5");
    }
}

function startInterval() {
    interval = setInterval(changeValue, ($("#num-seconds").val() * 1000))
}

function stopInterval() {
    clearInterval(interval);
}

function handleNumberChange() {
    // Ensure num is not negative or 0
    num = $("#num-seconds").val()
    if (num <= 0) {
        $("#num-seconds").val(1);
    }

    resetInterval();
}

function resetInterval() {
    if (isRunning) {
        stopInterval();
        startInterval();
    }
}

function handlePlay() {
    $("#play-btn").toggle();
    $("#stop-btn").toggle();
    isRunning = true;
    changeValue();
    startInterval();
}

function handlePause() {
    $("#stop-btn").toggle();
    $("#play-btn").toggle();
    isRunning = false;
    stopInterval();
}