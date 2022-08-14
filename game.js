
var buttonColors=["red", "blue", "green", "yellow"]     //it stores random color generated for game
var gamePattern=[];                               // it stores the color sequence which player has to match to win
var userClickedPattern=[];                // it stores player's sequence for a particular move
var level =0;                             // player score
var isGameStarted=0;                  // we have to start the game by pressing key so it hold the state

jQuery(document).keydown(function(){   // func to know the first keypress so that game starts
  if(isGameStarted==0){
  isGameStarted=1;
  jQuery("h1").html("level "+ level);
  nextSequence();                     // calls nextSequence to generate the first random color
}
});

jQuery(".btn").click(function(){           // func to know abt user's click , what box he clicks
  var userChosenColour=  $(this).attr("id");
  userClickedPattern.push(userChosenColour);   //push the seq of user's choosen color
playSound(userChosenColour);                  // to play sound on the choosen box by user
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);   // to check whether current choosen color matches the seq of gamePattern
                                            // if gamePattern has RBGR then we click 4 times R then B till R
                                            // this function compare each click

});

function checkAnswer(currLevel){
  if(userClickedPattern[currLevel]!=gamePattern[currLevel]){  // check if the current click is equal to the respective color in gamePattern
    var audio= new Audio("sounds/wrong.mp3")                   // if not then games end and play wrong audio and game over
    audio.play();
    jQuery("body").addClass("game-over");
    setTimeout(function(){
        jQuery("body").removeClass("game-over");
    },200);
    jQuery("h1").html("Game Over, Press Any Key to Restart");
    startOver();
}
else if(currLevel==gamePattern.length-1)   // to check if seq is over so that we can call nextSequence to generate
                                            // new color ...next level
setTimeout(function(){
  nextSequence();
},1000)

}


function nextSequence(){                   // generated new color
  userClickedPattern=[];                   // empty the user pattern on each correct seq matching 
  var randomNumber= Math.random();
  randomNumber= Math.floor(randomNumber*4);

  var randomChoosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  jQuery("h1").html("level "+ level);

  jQuery("#" +randomChoosenColor).fadeOut(100).fadeIn(100);
  var audio= new Audio("sounds/" + randomChoosenColor+ ".mp3")
  audio.play();
  level++;
}


function playSound(name){
  jQuery("#" +name).fadeOut(100).fadeIn(100);
  var audio= new Audio("sounds/" + name+ ".mp3");
  audio.play();
}

function animatePress(currentColor){
  jQuery("."+ currentColor).addClass("pressed");
  setTimeout(function(){
    jQuery("."+ currentColor).removeClass("pressed");
  },100)
}
function startOver(){
  level=0;
  gamePattern=[];
  isGameStarted=0;
}
