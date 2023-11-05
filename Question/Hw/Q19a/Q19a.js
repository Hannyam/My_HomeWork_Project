
const imgId=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
const image=["./img/boat.jpg","./img/sunflower.jpg","./img/pagoda.jpg","./img/kimbab.jpg","./img/puppy.jpg","./img/art.jpg","./img/fruit.jpg","./img/paperflower.jpg"];
let winMessage=document.getElementById("winMessage");
let btnStart=document.getElementById("btnStart");

//this is for Random Image
randomImage();

function randomImage() {
    for (var index = 0; index < 8; index++) {
        var card1= Math.floor(Math.random()*(imgId.length)); // form of length is 16,14,12....      
        document.getElementById(imgId[card1]).style.backgroundImage="url("+image[index]+")";
        imgId.splice(card1,1);  // drop 1 value by index no...from imgId array

    
        var card2= Math.floor(Math.random()*(imgId.length));// form of length is 15,13,11....  
        document.getElementById(imgId[card2]).style.backgroundImage="url("+image[index]+")";
        imgId.splice(card2,1); // drop 1 value "again" by index no... from imgId array
        
        
    }
}

let timer;
let valid=false; // game finished or not
let isWin=false;

var start=true;
var mycard1img;
var mycard1id;
var x=0;
let mycard1;
let cards = document.getElementsByClassName("card");

function clickCard(obj) {
    if (valid && !obj.disabled) { 
     let userclickId=obj.id;    
     let mycard2=document.getElementById(userclickId); //control for double click
     mycard2.disabled=true;

    if(start==true){ // for card 1
       
        document.getElementById(userclickId).style.transform="rotateY(180deg)";  
        document.getElementById(userclickId).style.transition="transform 0.8s";
        mycard1id=userclickId;
        let backid=document.getElementById(userclickId).lastElementChild.id; // 5
        let url=document.getElementById(backid).style.backgroundImage; // url("./img/sunflower.jpg")
        mycard1img=url.substring(4,url.length-1);//   "./img/sunflower.jpg"
       
        start=false;
        mycard1=document.getElementById(mycard1id);//control for double click
        mycard1.disabled=true;
       
    }
    else{  // for card 2 
        document.getElementById(userclickId).style.transform="rotateY(180deg)";
        document.getElementById(userclickId).style.transition="transform 0.8s";

       //don't allow click while flip two cards
        for (let index = 0; index < cards.length; index++) {
            cards[index].disabled = true;
          }
        
        setTimeout(() => {   
            let backid=document.getElementById(userclickId).lastElementChild.id; // card 2 id
            let url=document.getElementById(backid).style.backgroundImage; // url("./img/paperflower.jpg")
            if(url.substring(4,url.length-1)==mycard1img){ // card1 and card 2 equal or not
                document.getElementById(mycard1id).remove();
                document.getElementById(userclickId).remove();
                x=x+2;
                if (x==16) {
                    isWin=true;
                    winMessage.innerHTML='"You Win"';
                    winMessage.style.color="green";
                    document.getElementById("btnRestart").style.display="block";
                    clearInterval(timer);
                }
                start=true;            
               
            }else{ // if cards not equal, flash back...
                document.getElementById(mycard1id).style.transform="rotateY(360deg)";
                document.getElementById(userclickId).style.transform="rotateY(360deg)";
                start=true;
                mycard1.disabled=false;
                mycard2.disabled=false;
                               
            }
            for (let index = 0; index < cards.length; index++) {
                cards[index].disabled = false;
              }
        }, 700);   
        
    }      
}
}



//this is for countdown
let seconds = 46;

function countdown() {
    if (seconds > 0) {
        seconds--;
        document.getElementById('timer').style.animation="fadeInOut 0.8s 46";
        document.getElementById('timer').innerHTML = seconds +"s";
    } else {
        clearInterval(timer);
          
        if (isWin) {
        //   winMessage.innerHTML = '"You Win"';
        //   winMessage.style.color = "green";
        //   document.getElementById("btnRestart").style.display="block";
        } else {
          winMessage.innerHTML = '"You lose"';
          winMessage.style.color = "deeppink";

          let cards = document.getElementsByClassName("card");
          for (let index = 0; index < cards.length; index++) {
            cards[index].style.display = "none";
          }
        
          document.getElementById("btnRestart").style.display="block";

          valid = false;
        }
       
    }
}

let back=document.getElementsByClassName("back");

//when click start btn , this prosess will run
function clickStart() {
    btnStart.setAttribute("class","inactiveStart");//start btn can't click again
    btnStart.disabled = true;
    valid=true;
    // to show images a little sec 
    for (let index = 0; index < back.length; index++) {
         back[index].style.backfaceVisibility="visible"; 
         back[index].style.animation="move 3s linear 1";
    }
    // timer countdown will appear after 1500ms
    setTimeout(() => {
        for (let index = 0; index < back.length; index++) {
            back[index].style.backfaceVisibility="hidden";                 
       }//when timer apper , hide all images
       
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(countdown, 800);
    }, 3000);

   
}

   function clickRestart() {
    location.reload(); // This method reloads the current document
   } 





