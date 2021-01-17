//Check local storage and write it back to the page
function setLocalStorage(i) {
    console.log(i + "      Number text passed to function setlocalStorage")
    var textVal = localStorage.getItem(i);
    if (typeof textVal === "string") {
        console.log("found " + textVal)
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


        // Get Current Hour
        var currentHourNum = moment().format("H");
        
        // console.log("The current Hour is:  " + currentHourNum);
        // console.log("Current I is:  "  + i);
        
        var rowColor = "#" + i + "text";
        console.log("The row chosen:  " + rowColor);
        if (i == currentHourNum) {
            $(rowColor).addClass("present");
        } else if (i > currentHourNum) {
            $(rowColor).addClass("future");
        } else $(rowColor).addClass("past");
        
        setLocalStorage(i);

    }

    //store text in localstorage.
    $(".saveBtn").click(function () {

        var buttonNum = $(this).attr('id');
        console.log(buttonNum + "    button ID");
        var localS = '#' + buttonNum + 'text';
        var localSVal = $(localS).val();
        console.log(localSVal + "             text Value");
        localStorage.setItem(buttonNum, localSVal);
    });

    //Function to add AM or PM
    function convert12HourNumPMAM(i) {
        var PMAM = i >= 12 ? "PM" : "AM";
        var iPMAM = convert12HourNum(i);
        return iPMAM + PMAM
    }
    //Function to convert from 24 hour to 12 hour
    function convert12HourNum(i) {
        i = i % 12;
        i = i ? i : 12;
        return i
    }

});