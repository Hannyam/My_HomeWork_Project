let totalSum = 0;
let sum = document.getElementById("sum");
// Generate a random number between 1 and 99
var randomNumber = Math.floor(Math.random() * 99) + 1;
document.getElementById("randomNum").innerHTML = randomNumber;

//  keyup event listener
window.addEventListener("keyup", getUserInput);
function getUserInput(event) {
  // Get the key code of the pressed key
  var keyCode = event.keyCode;
  // Check if the pressed key is a number (48-57 numeric keys)
  if (keyCode >= 48 && keyCode <= 57) {
    userTyped = String.fromCharCode(keyCode);
    sum.innerHTML == "" ? sum.innerHTML = userTyped : sum.innerHTML +=   " + " + userTyped ;
    totalSum += Number(userTyped);
    document.getElementById("answer").innerHTML = totalSum;
  }
  checkCalculation();
  // change effect on num screen by user type
  let keys = document.getElementsByClassName("num");
  for (let index = 0; index < keys.length; index++) {
    if (userTyped == keys[index].innerHTML) {
      keys[index].style.backgroundImage = "linear-gradient(white,white,red)";
    }
  }
}

function checkCalculation() {
  if (totalSum === randomNumber) {
    document.getElementById("showMessage").innerHTML = "Correct!";
    window.removeEventListener("keyup", getUserInput); 
  } else if (totalSum > randomNumber) {
    document.getElementById("showMessage").innerHTML = " Wrong!";
    window.removeEventListener("keyup", getUserInput);
  }
}

function clickbtnplay() {
  // Reload the webpage
  location.reload();
}
