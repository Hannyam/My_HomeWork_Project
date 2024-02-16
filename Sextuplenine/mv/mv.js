$(document).ready(function () {
  

/** Weekly MV */
$("#topViewweekly").click(function () {
  hideCard();
  
  $("#playerPart").css("display","none");
  $("#linkPart").css("display","block");
  let weeklyurl="https://musicdata-api.p.rapidapi.com/youtube/weekly/2023/46";
  //  getViewData(weeklyurl); 
});

/** English Ternd MV */
$("#eMusic").click(function () {
  
  $("#playerPart").css("display","none");
  $("#linkPart").css("display","block");
  hideCard();
 
  let topEmusiyearurl = `https://musicdata-api.p.rapidapi.com/youtube/24h/english`;
   //getViewData(topEmusiyearurl); 

});
/** Top View by MV */
$("#showtopViewYear").click(function () {
  
  $("#playerPart").css("display","none");
  $("#linkPart").css("display","block");
  let userTypeYear = $("#typedTYear").val();
  if (isValidYear(userTypeYear)) {
    hideCard();
  } else {
    
    alert("Invalid year. Please enter a year between 2010 and 2023.");
  }
  console.log(userTypeYear);
  let topViewyear = `https://musicdata-api.p.rapidapi.com/youtube/topviews/published/${userTypeYear}`;
     //getViewData(topViewyear);
   $("#typedTYear").val("");
});
/** check input year is valid or not */
function isValidYear(year) {
  // Check if the year is a four-digit number
  var regex = /^\d{4}$/;
  if (!regex.test(year)) {
      return false;
  }

  // Check if the year is between 2010 and 2023
  var numericYear = parseInt(year, 10);
  return numericYear >= 2010 && numericYear <= 2023;
}
/** Korean Trend */
$("#kTrendMv").click(function () {
  hideCard();
  $("#linkPart").css("display","none");
  $("#playerPart").css("display","block");
  $("#playerPart").html(` <iframe id="video-container" width="800" height="400" src=""
  frameborder="0" allowfullscreen></iframe>`);
  
  let TrendkpopUrl="https://musicdata-api.p.rapidapi.com/youtube/trending/countries/kr";
    //getKData(TrendkpopUrl);
});


async function getKData(fetchurl) {
  const url = fetchurl;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b749a76386msh23b03730ea13becp116844jsn0be9ccda2c43",
      "X-RapidAPI-Host": "musicdata-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // const result = await response.text();
    // console.log(result);
    const data = await response.json();

    console.log(typeof data);
    console.log(data);
    let musicdata=data.music;
    console.log(musicdata);

    // Process only the top 10 mv
    const top10Mvs = musicdata.slice(0, 30);
    console.log(top10Mvs);

    // Process the data and create HTML elements for each mv
    const mvsContainer = $("#mvs-container");
    $("#mvs-container").html(`
      <div class="mvlistTitle">
        <p id="pos">Rank</p>
        <p id="title">Artist - Song </p>
       
        <p id="date">Status</p>
       <p id="link">Youtube Link </p>
      </div>
      <div class="slider-container">
      <div class="slider" id="slider">
      </div> 
      </div>
      <span class="prev"><ion-icon name="arrow-up-circle-outline"></ion-icon></span>
      <span class="next"><ion-icon name="arrow-down-circle-outline"></ion-icon></span> `);
       
    const listContainer = $("#slider");
    top10Mvs.forEach((mv) => {
      let mvlink = mv.link;
    //   let mvid = mvlink.slice(-11);
    let mvid = mvlink.slice(-11);

       const mvElement = `
       <div class="mvlist">
       <p id="pos"> #${Number(mv.ranking) - 50}</p>
       <p id="title">  ${mv.video}</p>
      
       <p id="date"> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;${mv.likes}</p>
       <p><p id="icon"><ion-icon name="logo-youtube"></ion-icon></p></p>
       
       <p id="vdid">${mvid}</p>
     </div>
            `;
      listContainer.append(mvElement);
    });
  } catch (error) {
    console.error(error);
  }

  playclickedMV();
  toScroll();

}

async function getViewData(fetchurl) {
  const url = fetchurl;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b749a76386msh23b03730ea13becp116844jsn0be9ccda2c43",
      "X-RapidAPI-Host": "musicdata-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // const result = await response.text();
    // console.log(result);
    const data = await response.json();

    console.log(typeof data);
    console.log(data);
    // let musicdata=data.music;
    // console.log(musicdata);

    // Process only the top 10 mv
    const top10Mvs = data.slice(0, 20);
    console.log(top10Mvs);

    // Process the data and create HTML elements for each mv
    const mvsContainer = $("#mvs-container");
    $("#mvs-container").html(`
       <div class="mvlistTitle">
        <p id="pos">Rank</p>
        <p id="title">Artist - Song </p>
         <p id="view"> Views</p>
         <p id="link"> YouTube Link</p> 
      </div>

      <div class="slider-container">
      <div class="slider" id="slider">
      </div> 
      </div>
      <span class="prev"><ion-icon name="arrow-up-circle-outline"></ion-icon></span>
      <span class="next"><ion-icon name="arrow-down-circle-outline"></ion-icon></span> 
     
      `);
       
      const listContainer = $("#slider");
    top10Mvs.forEach((mv) => {
      let mvlink = mv.link;
    //   let mvid = mvlink.slice(-11);
    let mvid = mvlink.slice(-11);

       const mvElement = `
       <div class="mvlist">
       <p id="pos"> #${mv.ranking}</p>
       <p id="title">  ${mv.video}</p>
         <p id="view"><ion-icon name="eye-outline"></ion-icon> ${mv.views} </p>
         <p><p id="icon"><ion-icon name="logo-youtube"></ion-icon></p></p>
       
       <p id="vdid">${mvid}</p>
     </div>
            `;
            listContainer.append(mvElement);
    });
  } catch (error) {
    console.error(error);
  }
  toScroll();
  playclickedMV();
  

}


playclickedMV();
function playclickedMV() {
  $(".mvlist").click(function () {
    $(".listContainer").css("display","none");
    $(".mvPart").css("display","block");
    
   
    let vdid = $(this).find("#vdid").text();
  console.log(vdid);
  let vdtitle = $(this).find("#title").text();
  console.log(vdtitle);
  
    playMusicVideo(vdid,vdtitle);
   
   });
  
   function playMusicVideo(videoId,videotitle) {
    $("#mvTitle").html(' " ' + videotitle + ' " ');
    $("#yblink").attr("href",`https://www.youtube.com/watch?v=${videoId}`);
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    $("#video-container").attr("src", videoSrc);

   
  }
 }


/** function to scroll list*/
 function toScroll() {
  let currentIndex = 0;
  const cardHeight = $('.mvlist').outerHeight();
  const cardsToShow = 4;

  $('.next').on('click', function() {
      if (currentIndex < $('.mvlist').length - cardsToShow) {
          currentIndex++;
          updateSlider();
          
      }
  });

  $('.prev').on('click', function() {
      if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
      }
  });

  function updateSlider() {
      const yvalue = -currentIndex * cardHeight * 5;
      console.log(yvalue);
      $('.slider').css('transform', 'translateY(' + yvalue + 'px)');
  }
 }
/** function to hide card */
 function hideCard() {
  $(".startPart").css("display", "none");
  $(".listContainer").css("display", "block");
   $(".mainPart").css("display", "block");
}
/** This fun: will work, when you click back btn */
$("#gotocart").click(function () {
  console.log("kee");
  $(".startPart").css("display", "flex");
  $(".listContainer").css("display", "none");
  $(".mainPart").css("display", "none");
});


/** when user click to back , it will go previous page */
$("#gotolist").click(function () {
  $(".mvPart").css("display", "none");
  $(".listContainer").css("display", "block");
});

});