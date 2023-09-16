var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");
var num1Btn = document.getElementById("num1Btn");
var num2Btn = document.getElementById("num2Btn");
var num3Btn = document.getElementById("num3Btn");
var showScore = document.getElementById("showScore");
var showTimes = document.getElementById("showTimes");
var outputHistory = document.getElementById("outputHistory");
var question = document.getElementById("question");
var ans1;
var ans2;
var ans3;
var score = 0;
var times = 0;
var trueAnswer;
var custChoose;
btnStop.disabled = true;
num1Btn.disabled = true;
num2Btn.disabled = true;
num3Btn.disabled = true;
/* This function is used for start btn */
function start() {
  btnStart.setAttribute("class", "btnStart inactiveStart");
  btnStart.disabled = true;
  btnStop.setAttribute("class", "btnStop activeStop");
  btnStop.disabled = false;
  num1Btn.setAttribute("class", "num1Btn activeNum1Btn");
  num1Btn.disabled = false;
  num2Btn.setAttribute("class", "num2Btn activeNum2Btn");
  num2Btn.disabled = false;
  num3Btn.setAttribute("class", "num3Btn activeNum3Btn");
  num3Btn.disabled = false;
  //reset score and times
  score = 0;
  showScore.innerHTML = "Score : ";
  showTimes.innerHTML = "Time : ";
  //call function quiz
  quiz();
  //call forChoose function
  forChoose();

}

function quiz() {
  var num1 = parseFloat(Math.floor(Math.random() * 100)+1);
  var num2 = parseFloat(Math.floor(Math.random() * 100)+1);

  var selectedRadio = document.querySelector('input[name="level"]:checked');
  
  var lvl = selectedRadio.id;
  
  //console.log(lvl);
  if(lvl=="easylvl"){
     
     trueAnswer = num1 + num2;
  question.innerText = num1 + "+" + num2;

  }else{
    console.log(trueAnswer);
    var op= "";
    var operator = Math.floor(Math.random()* 4);
   switch(operator){
      case 0:
       op= num1 + "+" + num2;
       trueAnswer=num1+num2;
     break;
     case 1:
        op= num1 + "-" + num2;
        trueAnswer=num1-num2;
     break;
     case 2:
        op= num1 + "*" + num2;
        trueAnswer=num1*num2;
     break;
     case 3:
        op= num1 + "/" + num2;
        trueAnswer=parseInt(num1/num2);
     break;
     default:
         break;
   }
question.innerText= op;

  }

  
}

/* This function is showing random numbers */
function forChoose() {
  ans1 = Math.floor(Math.random() * 100);
  ans2 = Math.floor(Math.random() * 100);
  ans3 = trueAnswer;
  var position = Math.floor(Math.random() * 3);
  
  switch (position) {
    case 0:
      num1Btn.innerText = trueAnswer;
      num2Btn.innerHTML = ans1;
      num3Btn.innerHTML = ans2;
      break;
    case 1:
      num1Btn.innerHTML = ans1;
      num2Btn.innerText = trueAnswer;
      num3Btn.innerHTML = ans2;
      break;
    case 2:
      num1Btn.innerHTML = ans1;
      num2Btn.innerHTML = ans2;
      num3Btn.innerText = trueAnswer;
      break;
    default:
      break;
  }
}
/* This function is used for user click first answer btn */
function chooseOne() {
  //count times
  times++;
  showTimes.innerHTML = "Time : " + times;
  //condition to show score

  var btn1Correct = num1Btn.innerHTML;

  if (trueAnswer == btn1Correct) {
    score += 10;
  } else {
    score -= 10;
  }
  showScore.innerHTML = "Score : " + score;

  quiz();
  forChoose();
}
/* This function is used for user click second answer btn */
function chooseTwo() {
  times++;
  showTimes.innerHTML = "Time : " + times;
  //condition to show score
  var btn2Correct = num2Btn.innerHTML;
  if (trueAnswer == btn2Correct) {
    score += 10;
  } else {
    score -= 10;
  }
  showScore.innerHTML = "Score : " + score;
  quiz();
  forChoose();
}
/* This function is used for user click second answer btn */
function chooseThree() {
  times++;
  showTimes.innerHTML = "Time : " + times;
  //condition to show score
  var btn3Correct = num3Btn.innerHTML;
  if (trueAnswer == btn3Correct) {
    score += 10;
  } else {
    score -= 10;
  }
  showScore.innerHTML = "Score : " + score;
  quiz();
  forChoose();
}
/* This function is used for stop btn */
function stop() {
  btnStop.setAttribute("class", "btnStop inactiveStop");
  btnStop.disabled = true;
  btnStart.setAttribute("class", "btnStart activeStart");
  btnStart.disabled = false;
  num1Btn.setAttribute("class", "num1Btn inactiveNum1Btn");
  num1Btn.disabled = true;
  num2Btn.setAttribute("class", "num2Btn inactiveNum2Btn");
  num2Btn.disabled = true;
  num3Btn.setAttribute("class", "num3Btn inactiveNum3Btn");
  num3Btn.disabled = true;
  //clear some data
  num1Btn.innerText = "";
  num2Btn.innerText = "";
  num3Btn.innerText = "";
  times = 0;
  // To show History
  outputHistory.innerHTML += "Your score is : " + score + "<br/>";
}
