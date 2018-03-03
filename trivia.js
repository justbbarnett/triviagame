//////////////////////////////////////////////////////////////
// DISPLAY JQUERY - Thanks Derrek!!!! This is brilliant formatting!
//////////////////////////////////////////////////////////////

// give all sections + content 100% width + height of screen
// $(".header").css("min-height", $(window).height());

// $("section").css("min-height", $(window).height());

// $(".game-content-row").css("min-height", $(window).height());


// Are you a Potter Head Questions
//////////////////////////

var qandA = [
    {   Q: "q1",
        question: "What is Harry Potter?",
        correct: "Wizard",
        answers: ["Warlock", "Whitch", "Muggle", "Wizard"]
    },
    {   Q: "q2",
        question: "What house of Hogwarts is Harry in?",
        correct: "Gryffindor",
        answers: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]
    },
    {   Q: "q3",
        question: "What is Harry's pet?",
        correct: "Owl",
        answers: ["Rat", "Dog", "Owl", "Cat"]
    },
];


// Define start
//////////////////////////
 var startGame = false,
    numberQ = 0,
    incorrect = 0,
    correct = 0,
    outOfTime = 0;

// Begin Timed Section
//////////////////////////

var timer = {
    time : 5,

    
    start: function () {
        timer.time = 5;
        display();
        
        countDown = setInterval(timer.questionTime, 1000);
        console.log(timer.time + " start w/ time")
        console.log(numberQ + " question number in index")
        console.log(outOfTime + " ran out of time");
        score ();
    },

    stop: function () {
        
        clearInterval(countDown);
        
        $("#timer-display").text("00:00");
        $("#question").text("Scroll down for your results!")
        $("#answers").empty()
        console.log("ran stop function")
        console.log(outOfTime + " final out of time");
        score ();
    },

    reset: function () {
        timer.time = 5;
        numberQ++;

        if (numberQ >= qandA.length) {
            timer.stop();
        
        } 
        else {
            setTimeout(timer.start, 3000)
        }
        
        $("#timer-display").text("00:00");
        clearInterval(countDown);
        console.log("ran reset function")
        

    },

    questionTime: function () {
        timer.time--;
        
        var converted = timer.timeConverter(timer.time)
        $("#timer-display").text(converted);

        if (timer.time === 0) {
            
            $("#question").text("You ran out of time!")
            $("#answers").empty()
            outOfTime++;
            timer.reset();

        }


    },

    timeConverter: function(t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
    
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
    
        if (minutes === 0) {
          minutes = "00";
        }
    
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
    
        return minutes + ":" + seconds;
      }
}
//Check answers
/////////////////////////
//Display Q & A
/////////////////////////
function display () {
    
    $("#question").text(qandA[numberQ].question)

    for ( i=0; i < qandA[numberQ].answers.length; i++ ) {
        var a = $("<button>");
        a.addClass ("btn btn-primary answers-btn");
        a.attr ("data-name", qandA[numberQ].answers[i]);
        a.attr ("value", qandA[numberQ].answers[i])
        a.text (qandA[numberQ].answers[i])
        

        if (qandA[numberQ].answers[i] === qandA[numberQ].correct) {
            a.attr("value", true);
        }
        else {
            a.attr("value", false);
        }
        $("#answers").append(a);
    }

    $(".answers-btn").click (checkAnswer);

    function checkAnswer () {
        console.log($(this).attr("value"));
        var check = $(this).attr("value");

        if (check === "true") {
            console.log("true is working")
            correct++;
            $("#question").html("<h3>Dumbledore will be so proud!</h3>" +
                                "</br><img class='lost-image' src='assets/images/dumbledore.gif'>  ")
            $("#answers").empty()
            timer.reset();
        }

        if (check === "false") {
            console.log("false is working")
            incorrect++;
            $("#question").html("<p>Hermione will be disappointed in your wizardry.</p>" +
                                "</br><img class='lost-image' src='assets/images/hermione.png'>  ")
            $("#answers").empty()
            timer.reset();
        }
    }

};






//Display Score
/////////////////////////
function score () {
    $("#score").html (
        "<h3> Number Correct: " + correct + "</h3><br>" +
        "<h3> Number Incorrect: " + incorrect + "</h3><br>" +
        "<h3> Number Ran Out of Time: " + outOfTime + "</h3><br><br>" +

        "<h2> You have a " + (correct/(qandA.length)).toFixed(2) * 100 + "% chance of getting into Hogwarts!"
    )
};


//Start the game
/////////////////////////

$(".start-button").click (function() {
    startGame = true;
    timer.start();
    // $("html, body").animate({
    //     scrollTop: $("#game").offset().top
    // }, 1000);
    console.log("I can start")
    
});

$("#replay").click(function() {
    numberQ = 0,
    incorrect = 0,
    correct = 0,
    outOfTime = 0;
    
    startGame = true;
    timer.start();
    console.log("I can REstart")
})

