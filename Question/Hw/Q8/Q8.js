
var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");
var num1Btn = document.getElementById("num1Btn");
var num2Btn = document.getElementById("num2Btn");
var showScore = document.getElementById("showScore");
var showTimes=document.getElementById("showTimes");
var outputHistory= document.getElementById("outputHistory");
var num1;
var num2;
var score=0;
var times=0;
var trueAns;
var custChoose;
btnStop.disabled = true;
num1Btn.disabled = true;
num2Btn.disabled = true;
/* This function is used for start btn */
function start(){
  btnStart.setAttribute("class","btnStart inactiveStart");
  btnStart.disabled = true;
  btnStop.setAttribute("class", "btnStop activeStop");
  btnStop.disabled = false;
  num1Btn.setAttribute("class","num1Btn activeNum1Btn");
  num1Btn.disabled = false;
  num2Btn.setAttribute("class","num2Btn activeNum2Btn");
  num2Btn.disabled = false;
  //reset score and times
  score=0;
  showScore.innerHTML = "Score : ";
  showTimes.innerHTML = "Time : ";
  //call forChoose function
  forChoose();
}
/* This function is showing random numbers */
function forChoose(){
  num1 = Math.floor(Math.random()*100);
  num2 = Math.floor(Math.random()*100);
  num1Btn.innerText = num1;
  num2Btn.innerText = num2;
   if(num1>num2){
     trueAns = num1;
   }else{
    trueAns = num2;
   }
}
/* This function is used for user click first answer btn */
function chooseOne(){
  //count times
  times++;
  showTimes.innerHTML= "Time : " + times;
  //condition to show score
    if(trueAns==num1){
    score+=10;
    }else{
    score-=10;
   }
   showScore.innerHTML= "Score : " + score;
   forChoose();
}
/* This function is used for user click second answer btn */
function chooseTwo(){
  times++;
  showTimes.innerHTML= "Time : " + times;
  //condition to show score
  if(trueAns==num2){
    score+=10;
    }else{
    score-=10;
   }
   showScore.innerHTML= "Score : " + score;
   forChoose();
}
/* This function is used for stop btn */
function stop(){
  btnStop.setAttribute("class", "btnStop inactiveStop");
  btnStop.disabled = true;
  btnStart.setAttribute("class","btnStart activeStart");
  btnStart.disabled = false ;
  num1Btn.setAttribute("class","num1Btn inactiveNum1Btn");
  num1Btn.disabled = true;
  num2Btn.setAttribute("class","num2Btn inactiveNum2Btn");
  num2Btn.disabled = true;
  //clear some data
  num1Btn.innerText = "";
  num2Btn.innerText = "";
   times=0;
   // To show History
   outputHistory.innerHTML += "Your score is : " + score +"<br/>";
  
}