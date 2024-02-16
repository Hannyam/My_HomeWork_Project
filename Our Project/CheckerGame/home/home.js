$(document).ready(function () {

  

 /** this fun: is to insert click sound & effect  */
  clickEffect(".oneplayerBtn");
  clickEffect(".twoplayerBtn");
  clickEffect(".start-button");
  clickEffect(".tourBtn");

  clickEffect("#backMenu");
  clickEffect("#playBtn"); 
  clickEffect("#defaultTheme");
  clickEffect("#darkTheme");
  clickEffect("#lightTheme");
  clickEffect("#woodenTheme");
  clickEffect("#redTheme");
  clickEffect("#greenTheme");
  clickEffect(".homeBtn");
  clickEffect(".restartBtn");
  clickEffect(".replayBtn"); 
  
  function clickEffect(selector) {
    $(selector).click(()=>{
        var audio = document.getElementById("clicksound");
        audio.play();  
        $(selector).css("box-shadow","10px 10px 10px black");
      });   
  }

  $(".oneplayerBtn").click(()=>{
    setTimeout(() => {  
        window.location.href = "../onePlayer/oneplayer.html";
    }, 700);   
  });

  $(".twoplayerBtn").click(()=>{
    setTimeout(() => {  
        window.location.href = "../twoPlayer/twoplayer.html";
    }, 700);   
  });

  $(".tourBtn").click(()=>{
    setTimeout(() => {  
        window.location.href = "../Tournament/tournament.html";
    }, 700); 
  });

  
  $("#cmdBtn,#startPlayerBtn").click(()=>{
    var audio = document.getElementById("clicksound");
        audio.play(); 
  });


});