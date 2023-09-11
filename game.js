
var buttonColor =["red", "blue", "green" ,"yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequance(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
   
    $( "#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click" ,function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolour){

    $("#"+currentcolour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentcolour).removeClass("pressed");
    } ,100 );
}

$(document).on( "keypress", function() {
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequance();
        started = true;
    }
   
  } );

  function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel] ){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequance();
            }, 1000);
    
          }
    }else{
      playSound("wrong");

      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

     
      startover();
    }
  }

  function startover(){
    level = 0;
    started = false;
    gamePattern = [];
  }