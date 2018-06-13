/* global moment firebase */
$(document).ready(function () {
  var config = {
  apiKey: "AIzaSyBNxWXreeyxxf58pPO04IGp3LyvOYz3b6o",                               // Initialize Firebase
  authDomain: "train-scheduler-edf83.firebaseapp.com",
  databaseURL: "https://train-scheduler-edf83.firebaseio.com",
  projectId: "train-scheduler-edf83",
  storageBucket: "train-scheduler-edf83.appspot.com",
  messagingSenderId: "415415767658"
};
firebase.initializeApp(config);
//console.log(firebase);
var database = firebase.database();                                                // Create a variable to reference the database.
$("#train-info").on("click", function(event){                                      //added button for adding train info
  event.preventDefault();
  
  var trainName = $("#train-name-input").val().trim();                             //grabs user input
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var newTrainInfo = {                                                             //creates local temp object for holding train data
    name: trainName,
    dest: destination,
    time: firstTrainTime,
    freq: frequency
  };
  
  database.ref().push(newTrainInfo);                                               //uploads train data to the database
  
  alert("Train Successfully Added");                                               //alert
  $("#train-name-input").val("");                                                  //clears all the text boxes
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {           //create firebase event for adding train info to the database and a row in the html when a user adds an entry
    
    var trainName = childSnapshot.val().name;                                      //store everything in a variable
    var destination = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
    var tFrequency = 7;   
    var firstTime = "07:30";                                                        // Time is 3:30 AM   
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");     // First Time (pushed back 1 year to make sure it comes before current time) moment gives the current time
     
    var currentTime = moment();                                                     // Current Time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");            // Difference between the times
    var tRemainder = diffTime % tFrequency;                                         // Time apart (remainder)
    var tMinutesTillTrain = tFrequency - tRemainder;                                // Minute Until Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");                     // Next Train
    var last = moment(nextTrain).format("HH:mm");
    
    $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
       frequency + "</td><td>" + last + "</td><td>" + tMinutesTillTrain + "</td></tr>");

}
)

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) { //Change to html
  $("#train-name-input").text(snapshot.val().name);
  $("#destination-input").text(snapshot.val().dest);
  $("#first-input").text(snapshot.val().time);
  $("#frequency-input").text(snapshot.val().freq);
});

});



  



