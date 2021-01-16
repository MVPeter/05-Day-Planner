//Check local storage and write it back to the page
function setLocalStorage(i) {
    var textVal = localStorage.getItem(i);
    if (typeof textVal === "string") {
        var textID = "#" + i + "text"
        $(textID).text(textVal);
    }
}

//// WHEN I open the planner
$(document).ready(function () {
    // The current day is displayed at the top of the calendar
    //current Day, year put at ID currentDay
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDate);

    //Setup out Hours 9am to 5pm
    for (let i = 9; i < 18; i++) {

        //create row
        var rows = $('<div hour="' + i + '" id="' + i + 'row" class="row">');
        //create column for time
        var timeCol = $('<div class= "col-sm-1"> <div class="hour">' + convert12HourNumPMAM(i) + '</div>');
        //create column for text
        var textCol = $('<div class= "col-sm-9" m-0> <textarea id="' + i + 'text" placeholder="Event description" class="discription"></textarea>');
        //create column for savebutton
        var saveBtn = $('<div class= "col-sm-2"><button class="saveBtn" id="' + i + '">Save</button>');

        rows.append(timeCol);
        rows.append(textCol);
        rows.append(saveBtn);
        //write column to Document.
        $(".container").append(rows);

        setLocalStorage(i);
        updateTimeColoring(i);
        //Function to color the rows every 5 minutes
        setInterval(function () {
            updateTimeColoring(i);
        }, 60 * 1000);

    }

    //store text in localstorage.
    $(".saveBtn").click(function () {

        var buttonNum = $(this).attr('id');
        var localS = '#' + buttonNum + 'text';
        var localSVal = $(localS).val();

        localStorage.setItem(buttonNum, localSVal);
    });

    //Function to convert to 12 hour add AM or PM
    function convert12HourNumPMAM(i) {
        var PMAM = i >= 12 ? "PM" : "AM";
        i = i % 12;
        i = i ? i : 12;
        return i + PMAM
    }

    //Function to update the colors for past, present, and future
    function updateTimeColoring(i) {
        var currentHourNum = moment().format("H");
        var rowColor = "#" + i + "text";

        if (i == currentHourNum) {
            $(rowColor).addClass("present");
        } else if (i > currentHourNum) {
            $(rowColor).addClass("future");
        } else $(rowColor).addClass("past");
    }
});