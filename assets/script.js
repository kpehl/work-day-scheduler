// Post the current day and date at the top of the page
var currentDay = moment().format("dddd MMMM Do");

var displayDay = function() {
    $("#currentDay").text(currentDay);
}

// Create a moment object for the current hour
var currentHour = moment().format("H");

// Create the work day grid
// Within the container, each hour has the form
//  <div class="row time-block">
//  <div class="col-sm-1 hour">
//    9AM
//  </div>
//  <div class="col-sm-10 #highlightClass"></div>
//  <div class="col-sm-1 saveBtn"></div>
//  </div>
// We create the work day grid. Default is 9AM-5PM.
for (var i=9; i<17; i++) {

    // Create the row for the hour
    var hourRowEl = $("<div>").addClass("row time-block");

    // Create the hour block. For the last block of the day, a bottom border is added.
    var hourObj = moment().hour(i);
    var hourText = moment(hourObj).format("hA");    
    if (i == 16) {
        var hourBlockEl =  $("<div>").addClass("col-sm-1 hour").attr("style", "border-bottom: 1px dashed #000000").text(hourText);
    } else {
        var hourBlockEl = $("<div>").addClass("col-sm-1 hour").text(hourText);
    }

    // Create the event block. Color coding is added for past hours, the present hour, and future hours.
    if (i < currentHour) {
        highlightClass = "past";
    } else if (i == currentHour) {
        highlightClass = "present";
    }
    else {
        highlightClass = "future";
    }
    var eventBlockEl = $("<div>").addClass("col-sm-10 " + highlightClass);

    // Create the save button block
    var saveBtnEl = $("<div>").addClass("col-sm-1 saveBtn p-4").html('<i class="fas fa-save"></i>');

    // Append the columns to the parent row
    hourRowEl.append(hourBlockEl, eventBlockEl, saveBtnEl);

    // Append the parent row to the container on the page
    $(".container").append(hourRowEl);
}

// Display the current date
displayDay();

// Run a timer to update the date (and later on the events and schedule) automatically every 30 minutes as long as the page is open 
setInterval(function() {
    displayDay();
  }, 1800000);
