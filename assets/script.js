// Post the current day and date at the top of the page
var currentDay = moment().format("dddd MMMM Do");

var displayDay = function() {
    $("#currentDay").text(currentDay);
};

// Create a moment object for the current hour
// var currentHour = moment().format("H");
var currentHour = 10;

// Initialize the events array
var savedEvents = [];
// Create a function to load events as needed
var loadSavedEvents = function() {
    savedEvents = JSON.parse(localStorage.getItem("events"));
    // $.each(savedEvents, function(index, savedEventItem) {
    //     console.log("from loadSavedEvents: " + savedEventItem.time, savedEventItem.event);
    // });
  
    // if nothing in localStorage, initialize array to track events and times
    if (!savedEvents) {
      savedEvents = [];
    }
};


// Create the work day grid
// Within the container, each hour has the form
//  <div class="row time-block">
//  <div class="col-sm-1 hour">
//    9AM
//  </div>
//  <div class="col-sm-10 description #highlightClass">
//  </div>
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
    var eventBlockEl = $("<div>").addClass("col-sm-10 description eventBlock " + highlightClass);

    // Check for a saved event and populate the event block if there is one
    loadSavedEvents();
    $.each(savedEvents, function(index, savedEventItem) {
        // console.log("in create grid: " + savedEvents)
        // console.log(savedEventItem.time, savedEventItem.event);
        if (savedEventItem.time == hourText) {
            eventBlockEl.text(savedEventItem.event)
        }
        });


    // Create the save button block
    var saveBtnEl = $("<div>").addClass("col-sm-1 saveBtn p-4").html('<i class="fas fa-save"></i>');

    // Append the columns to the parent row
    hourRowEl.append(hourBlockEl, eventBlockEl, saveBtnEl);

    // Append the parent row to the container on the page
    $(".container").append(hourRowEl);
};


// On clicking an hour block, the block converts to a text area, retaining any previously entered text and retaining color code
$(".eventBlock").on("click", function() {
    event.preventDefault();
    console.log("block clicked");
    var text = $(this)
      .text()
      .trim();
    var selectedHourStr = $(this).siblings(".hour").text();
    var selectedHourM = moment(selectedHourStr, ["hA"]).format("H");
    if (selectedHourM < currentHour) {
        highlightClass = "past";
    } else if (selectedHourM == currentHour) {
        highlightClass = "present";
    }
    else {
        highlightClass = "future";
    }
    var textInput = $("<textarea>").addClass("col-sm-10 description " + highlightClass)
      .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
  });

// On clicking the save button, the block converts back
$(".saveBtn").on("click", function() {
    // get the text from the text area
    var text = $(this)
        .siblings(".description")
        .val()
        .trim();
    // recreate the original element
    var eventDiv = $("<div>")
        .addClass("col-sm-10 description eventBlock " + highlightClass)
        .text(text);
    // replace the textarea with the <div> element
    $(this)
        .siblings(".description")
        .replaceWith(eventDiv);
    // get the selected event time
    var selectedHourStr = $(this).siblings(".hour").text();
    // create an object with the event to save
    eventObj = {
        time: selectedHourStr,
        event: text
    };
    savedEvents.push(eventObj);
    saveEvents();
});


// A function to save the daily events
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(savedEvents));
  };

// Display the current date
displayDay();

// Load saved events
loadSavedEvents(); 

// Run a timer to update the date (and later on the events and schedule) automatically every 30 minutes as long as the page is open 
setInterval(function() {
    displayDay();
    loadSavedEvents();
  }, 1800000);

