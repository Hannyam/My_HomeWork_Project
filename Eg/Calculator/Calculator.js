
var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");
var answerbox = document.getElementById("answerBox");
var userAnswer = document.getElementById("userAnswer");
var q1 = document.getElementById("q1");
var list = document.getElementById("list");
var trueAnswer;

/* This function is used for start btn */
function start(){
    btnStart.setAttribute("class","btnStart inactiveStart");
    btnStart.disabled = true;
    btnStop.setAttribute("class", "btnStop activeStop");
    btnStop.disabled = false;
    answerbox.disabled = false;
    userAnswer.disabled =false;
    //call quiz function
    quiz();
    
}
/* Random number Generate*/
function quiz(){
   var num1 = Math.floor(Math.random()*100 + 1);
   var num2 = Math.floor(Math.random()*100 + 1);
   trueAnswer= num1 + num2;
   // q1.innerText= num1 + "+" + num2;
   
    var op= "";
   var operator = Math.floor(Math.random()* 4);
  switch(operator){
     case 0: 
      op= num1 + "+" + num2;
    break;
    case 1: 
       op= num1 + "-" + num2;
    break;
    case 2: 
       op= num1 + "*" + num2;
    break;
    case 3: 
       op= num1 + "/" + num2;
    break;
    default:
        break;
  }
  q1.innerText= op;

}
/* This function is used for stop btn */
function stop(){
    btnStop.setAttribute("class", "btnStop inactiveStop");
    btnStop.disabled = true;
    btnStart.setAttribute("class","btnStart activeStart");
    btnStart.disabled = false ;
    answerbox.disabled = true;
    userAnswer.disabled =true;
    q1.innerText = "";
    list.innerHTML="";
}
/* This function is used for check user answer*/
function checkAnswer(){
 var userinput= document.getElementById("answerBox").value;
 if(userinput == trueAnswer){
    //correct
    list.innerHTML +="<li>Correct</li>";
 }else{
    // wrong
    list.innerHTML +="<li>Wrong</li>";
 }
 answerbox.value = "";
 // call quiz function
 quiz();
}