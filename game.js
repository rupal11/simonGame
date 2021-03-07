var buttonColours= [ "blue" , "purple" , "orange" , "green"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;


function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern=[];

    var randomNumber=Math.floor(Math.random()*4);

    randomChoosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeOut().fadeIn();

    playSound(randomChoosenColour);

}



$(".btn").click(function(){

    var userChoosenColour=$(this).attr("id");

    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour)

    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);

});



function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ 
	$("#" + currentColor).removeClass("pressed");
	},100);
   

}

$(document).keypress(function(){
    
    if(started===false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;

    }
 });



function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){nextSequence();},1000);
        }
    }
     
    else
     {
        console.log("wrong");
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
		$("#level-title").text("Game Over, Press any Key to Restart");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        
        startOver();
     }

}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}


$("button").click(function(){
    setTimeout(function(){ $("body").toggleClass("dark-mode");},10);
});
