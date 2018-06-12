/* global moment firebase */
$(document).ready(function () {
  var config = {
  apiKey: "AIzaSyBNxWXreeyxxf58pPO04IGp3LyvOYz3b6o",      // Initialize Firebase
  authDomain: "train-scheduler-edf83.firebaseapp.com",
  databaseURL: "https://train-scheduler-edf83.firebaseio.com",
  projectId: "train-scheduler-edf83",
  storageBucket: "train-scheduler-edf83.appspot.com",
  messagingSenderId: "415415767658"
};
firebase.initializeApp(config);
//console.log(firebase);
var database = firebase.database();                       // Create a variable to reference the database.
$("#train-info").on("click", function(event){             //added button for adding train info
  event.preventDefault();
  
  var trainName = $("#train-name-input").val().trim();    //grabs user input
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var newTrainInfo = {                                    //creates local temp object for holding train data
    name: trainName,
    dest: destination,
    time: firstTrainTime,
    freq: frequency
  };
  
  database.ref().push(newTrainInfo);                      //uploads train data to the database
  //console.log(newTrainInfo.name);                       //logs everything to the console
  //console.log(newTrainInfo.dest);
  //console.log(newTrainInfo.time);
  //console.log(newTrainInfo.freq);
  alert("Train Successfully Added");                      //alert
  $("#train-name-input").val("");                         //clears all the text boxes
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {         //create firebase event for adding train info to the database and a row in the html when a user adds an entry
    //console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;             //store everything in a variable
    var destination = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
    //console.log(trainName);
    //console.log(destination);
    //console.log(firstTrainTime);
    //console.log(frequency);
    $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
       frequency );

}
)
//Change to html//
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  $("#train-name-input").text(snapshot.val().name);
  $("#destination-input").text(snapshot.val().dest);
  $("#first-input").text(snapshot.val().time);
  $("#frequency-input").text(snapshot.val().freq);
});

});



