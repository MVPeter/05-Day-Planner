

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner

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

//documennt ready
$(document).ready(function () {
    // The current day is displayed at the top of the calendar
    //current Day, year put at ID currentDay
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDate);
    // var currentHourNum = moment().format("h")
    
    //Setup out Hours 9am to 5pm
    for (let i = 9; i < 18; i++) {

        //create row
        var rows = $('<div hour="' + i + '" id="' + i + 'row" class="row">');
        //create column for time
        var timeCol = $('<div class= "col-sm-1"> <div class="hour">' + convert12HourNum(i) + '</div>');
        //create column for text
        var textCol = $('<div class= "col-sm-9" m-0> <textarea id="' + i + 'text" placeholder="Event description" class="discription"></textarea>');
        //create column for savebutton
        var saveBtn = $('<div class= "col-sm-2"><button class="saveBtn" id="' + i + '">Save</button>');

        rows.append(timeCol);
        rows.append(textCol);
        rows.append(saveBtn);
        //write column to Document.
        $(".container").append(rows);

        // pass text area ID value to localstorage.
        // var NumText = '"#' + i + 'text"'
        console.log(i)
        setLocalStorage(i);

    }
    
    //store text in localstorage.
    $(".saveBtn").click(function () {
        
            var buttonNum = $(this).attr('id');
            console.log(buttonNum +"    button ID");
            var localS = '#' + buttonNum + 'text';
            var localSVal = $(localS).val();
            console.log(localSVal + "             text Value");
            localStorage.setItem(buttonNum, localSVal);
    });

    //Function to convert 24 hour numbers to 12 hour numbers
    function convert12HourNum(i){
        var PMAM = i >=12 ? "PM" : "AM";
        i = i % 12;
        i = i ? i : 12;
        return i + PMAM
    }

    // WHEN I view the time blocks for that day
    // THEN each time block is color-coded to indicate whether it is in the past, present, or future
    //update ID's for past, present, future:  CSS




    //save buton writes to local storage Day ID.
    //text stays on the document.

    // WHEN I refresh the page
    // THEN the saved events persist

});