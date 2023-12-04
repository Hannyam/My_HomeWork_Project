let randomCharArray = [];
let usertypeArray=[];
let randomchars;
let usertypedchars;
let count=0;
let correctCount = 0;
let missCount = 0;
generateAtoz();
startProcess();
// Generate random a to z
function generateAtoz(){
  for (let index = 0; index < 5; index++) { 
    let decimalCode = Math.floor(Math.random() * (122 - 97 + 1) + 97);//formula for random a-z
    document.getElementById("randomchar").innerHTML += String.fromCharCode(decimalCode);
    randomCharArray.push(String.fromCharCode(decimalCode));
  }randomchars=randomCharArray.join("");//to get string type of random chars
} 
function startProcess(){// to get user's typing char
  window.addEventListener("keyup", function (e) {
    count++;
    let userKey = e.key;
    usertypeArray.push(userKey);//insert to array what user type
    // change effect on keyboard screen by user type   
    let keys = document.getElementsByClassName("key");
    for (let index = 0; index < keys.length; index++) {
      if (userKey == keys[index].innerHTML) {
        keys[index].style.backgroundImage = "linear-gradient(white,white,red)";
        document.getElementById("typebtnDiv").innerHTML += ` <button class="typebtn">${keys[index].innerHTML}</button>
      `;
      }
    }
    usertypedchars = usertypeArray.join("");//to get string type of user chars
    removeKeyboardeffect();
    isMatch();
   //function for remove effect on keyboard screen after type 5 chars
   function removeKeyboardeffect(){
    if (count % 5 == 0) {
      setTimeout(() => {
        document.getElementById("typebtnDiv").innerHTML = "";
        for (let index = 0; index < keys.length; index++) {
          keys[index].style.backgroundImage = "linear-gradient(rgb(229, 95, 229),rgb(229, 95, 229))";
        }
      }, 100);
    }
  }
   //Check user type char is match with random char
    function isMatch(){
        if (usertypeArray.length==5) {
          if (randomchars == usertypedchars) {
            document.getElementById("showMessage").innerHTML = "Correct!";
            document.getElementById("showMessage").style.color="blue";
            correctCount++;
            document.getElementById("correctCount").innerHTML = correctCount;
            randomCharArray.splice(0,5);// clear random  array to remove previous random chars
            //to generate new random chars
            document.getElementById("randomchar").innerHTML="";
            generateAtoz();// random again if correct
          } else {
            document.getElementById("showMessage").innerHTML = "Wrong!";
            document.getElementById("showMessage").style.color="deeppink";
            missCount++;
            document.getElementById("missCount").innerHTML = missCount;
          }
          usertypeArray.splice(0, 5);// clear type array
        }
   }  
   //Calculate wpm user type char 
   let numofchar=count; 
   let wpm=(numofchar/5)/60; //within 60seconds
   document.getElementById("wpm").innerHTML=wpm.toFixed(2);
  }); 
}




   



 
 


  

  

