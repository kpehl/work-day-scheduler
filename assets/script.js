// Post the current day and date at the top of the page
var currentDay = moment().format("dddd MMMM Do");

var displayDay = function() {
    $("#currentDay").text(currentDay);
}



// Display the current date
displayDay();

// Run a timer to update the date (and later on the events and schedule) automatically every 30 minutes as long as the page is open 
setInterval(function() {
    displayDay();
  }, 1800000);
