
const checkArray = [];
var userpress;
var mine;
var p1;
var p2;
var p3;
var p4;
var p5;
var p6;
var p7;
var p8;
var finished = false;
//call minebuild function
mineBuild();
// This function is used for mine build
function mineBuild(){
 var xAx = Math.floor(Math.random() * 6 +1); // 1 to 6 on x-axis
 var yAx = Math.floor(Math.random() * 6 +1); // 1 to 6 on y-axis
 mine = xAx + "" + yAx; // 11 or 23,...random
 //console.log(mine);

 //calculate around mine
 p1 = (xAx - 1) + "" + (yAx - 1);
 p2 = (xAx - 1) + "" + yAx ;
 p3 = (xAx - 1) + "" + (yAx + 1);
 p4 = xAx  + "" + (yAx - 1);
 p5 = xAx  + "" + (yAx + 1);
 p6 = (xAx + 1) + "" + (yAx - 1);
 p7 = (xAx + 1) + "" + (yAx);
 p8 = (xAx + 1) + "" + (yAx + 1);
}
// this is used for user click cells
function press(obj){
 //console.log(obj.id);
 if(finished == false){
  userpress = Number(obj.id);
 //console.log(userpress); 
 if(userpress == mine){
    //touch mine
    obj.style.backgroundColor = "red";
    gameoverSound();
    gameoverDisplay();
    obj.innerText = "BOMB" ;
 }else if(
    userpress == p1 ||
    userpress == p2 ||
    userpress == p3 ||
    userpress == p4 ||
    userpress == p5 ||
    userpress == p6 ||
    userpress == p7 ||
    userpress == p8
    ){
     // touch mine around    
     obj.style.backgroundColor = "red";   
     playClick();
     //call forwin to check win
     forWin();
    }else{
        //clear
        obj.style.backgroundColor = "teal";    
        playClick();
      //call forwin to check win
       forWin();
      
    }  
   
}
// if win , show winning process 
winGame();
// appear sound when user click
function playClick(){
    var audio = document.getElementById("clicksound");
    audio.play();
}

function gameoverSound(){
    var audio = document.getElementById("gameover");
    audio.play();
}
// all box red after game lose
function gameoverDisplay(){
    finished = true;
    for (let index = 0; index < 36; index++) {
       document.getElementsByClassName("cell")[index].style.backgroundColor="red";
        
    }
    document.getElementById("32").innerText= "G";
    document.getElementById("33").innerText= "A";
    document.getElementById("34").innerText= "M";
    document.getElementById("35").innerText= "E";

    document.getElementById("42").innerText= "O";
    document.getElementById("43").innerText= "V";
    document.getElementById("44").innerText= "E";
    document.getElementById("45").innerText= "R";
}
// Function to handle winning the game
function forWin(){
    if(!checkArray.includes(userpress)){
        
        checkArray.push(userpress);

    }else{ // no need..this is use for trace
        console.log("Duplicate is not count.") // just checking
      }
     console.log(checkArray.join(","));// just check in dev side
 }
 
// if win , show winning process 
function winGame(){
  if(checkArray.length == 35){
    console.log("Congratulations! You've won the game!");
    gamewinSound();
    gamewinDisplay();
   
  }
}
function gamewinSound(){
    var audio = document.getElementById("gamewin");
    audio.play();
}
// all box pink after game win
function gamewinDisplay(){
    finished = true;
    for (let index = 0; index < 36; index++) {
       document.getElementsByClassName("cell")[index].style.backgroundColor="#e84b9e";
        
    }
    document.getElementById("32").innerText= "G";
    document.getElementById("33").innerText= "A";
    document.getElementById("34").innerText= "M";
    document.getElementById("35").innerText= "E";

    document.getElementById("42").innerText= "W";
    document.getElementById("43").innerText= "I";
    document.getElementById("44").innerText= "N";
    document.getElementById("45").innerText= "!";
}
}




 


