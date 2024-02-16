$(document).ready(function () {
    /** function to hide cart from start condition*/
      function hideCard() {
        $(".startPart").css("display", "none");
        $(".moviePart").css("display", "block");
        $("#goback").css("display", "block");
        $(".prev").css("display", "block");
        $(".next").css("display", "block");
      }
      function isValidNum(typecount) {
       // Check if the input is a valid number and within the range
       if (typecount >= 10 && typecount <= 100) {
        return true;
       } else {
        window.alert("Please enter a valid number between 10 and 100.");
         
       }
       $('#mtypedCount').val("");
       $('#stypedCount').val("");
      }
    $("#showMovieToplist").click(function () {
        // Get the user input
        let topCount =Number($('#mtypedCount').val());
      if(isValidNum(topCount)){
        hideCard();
        $(".slider").html("");
        getMovieData(topCount);
      }
      
    });
    $("#showSeriesToplist").click(function () {
       // Get the user input
       let topCount =Number($('#stypedCount').val());
       if(isValidNum(topCount)){
         hideCard();
         $(".slider").html("");
       getSerieData(topCount);
      }
    });
    
      async function getMovieData(count) {
        const url = "https://imdb-top-100-movies.p.rapidapi.com/";
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "13fc9be917msh782a30579e56ee9p1cb6f5jsne5660b76c2ce",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
          },
        };
    
        try {
          const response = await fetch(url, options);
          const data = await response.json();// object data type
    
          console.log(typeof data);
          console.log(data);
          
          $("#count").text(count);
          // Process only the top 10 movies
          const top10Movies = data.slice(0, count);
          console.log(top10Movies);
    
          // Process the data and create HTML elements for each movie
        
          const moviesContainer = $("#movies-container");
          top10Movies.forEach((movie) => {
            const movieElement = `
                        <div class="movie card">
                            <img src="${movie.image}" alt="${movie.title}" width="100%">
                            <div>
                                <div class="rating">
                                    <ion-icon name="star"></ion-icon> ${movie.rating}
                                    <p id="rank"> ${movie.rank}</p>
                                    
                                </div>
                                <span id="movietitle">${movie.title}</span><br/>
                                <button class="watch-trailer" id="${movie.id}" >Watch Trailer</button>
                            </div>
                        </div>
                    `;
            moviesContainer.append(movieElement);
          });
    
          // Add event listener to watch trailer buttons
          /** when user click trailer button , this fun will work */
          $(".watch-trailer").on("click", function () {
            let videoId = $(this).attr("id"); // get video id to fetch
            console.log(videoId + " - videoId");
    
            let movietitle = $(this).find("movietitle").text;// search movie title
            $(".player").css("display", "block");
            $(".moviePart").css("display", "none");
            $(".prev").css("display", "none");
            $(".next").css("display", "none");  
            $(".trailerTitle").text(movietitle);
    
            getYoutubeData();
            async function getYoutubeData() {        
              // fetch data by movie Id
              const url = `https://imdb-top-100-movies.p.rapidapi.com/${videoId}`;
              const options = {
                method: "GET",
                headers: {
                  "X-RapidAPI-Key":
                    "13fc9be917msh782a30579e56ee9p1cb6f5jsne5660b76c2ce",
                  "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
                },
              };
    
              try {
                const response = await fetch(url, options);
                const data = await response.json();
             
                console.log(data.trailer_youtube_id + " youtube Id ");
                 console.log(data);
    
               $("#trailerTitle").text(data.title);
               $("#description").html("Description : " + data.description);
               $("#year").html("Year : " + data.year + "  ,  ");
               $("#director").html("  Director : " + data.director);
                let ybvideoId = data.trailer_youtube_id;
                const videoSrc = `https://www.youtube.com/embed/${ybvideoId}`;
                $("#video-container").attr("src", videoSrc); 
              } catch (error) {
                console.error(error);
              }
            }
    
          });
        } catch (error) {
          console.error(error);
        }
      }
    
      async function getSerieData(count) {
        const url = "https://imdb-top-100-movies.p.rapidapi.com/series/";
        
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "13fc9be917msh782a30579e56ee9p1cb6f5jsne5660b76c2ce",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
          },
        };
    
        try {
          const response = await fetch(url, options);
          const data = await response.json();// object data type
    
          console.log(typeof data);
          console.log(data);
        
          $("#count").text(count);
          // Process only the top 10 movies
          const top10Movies = data.slice(0, count);
          console.log(top10Movies);
    
          // Process the data and create HTML elements for each movie
          const moviesContainer = $("#movies-container");
          top10Movies.forEach((movie) => {
            const movieElement = `
                        <div class="movie card">
                            <img src="${movie.image}" alt="${movie.title}" width="100%">
                            <div>
                                <div class="rating">
                                    <ion-icon name="star"></ion-icon> ${movie.rating}
                                    <p id="rank"> ${movie.rank}</p>
                                    
                                </div>
                                <span id="movietitle">${movie.title}</span><br/>
                                <button class="watch-trailer" id="${movie.id}" >Watch Trailer</button>
                            </div>
                        </div>
                    `;
            moviesContainer.append(movieElement);
          });
    
          // Add event listener to watch trailer buttons
          /** when user click trailer button , this fun will work */
          $(".watch-trailer").on("click", function () {
            let videoId = $(this).attr("id"); // get video id to fetch
            console.log(videoId + " - videoId");
    
            let movietitle = $(this).find("movietitle").text;// search movie title
            $(".player").css("display", "block");
            $(".moviePart").css("display", "none");
            $(".prev").css("display", "none");
            $(".next").css("display", "none");  
            $(".trailerTitle").text(movietitle);
    
            getYoutubeData();
            async function getYoutubeData() { 
                  
              // fetch data by movie Id
              const url = ` https://imdb-top-100-movies.p.rapidapi.com/series/${videoId}`;
             
              const options = {
                method: "GET",
                headers: {
                  "X-RapidAPI-Key":
                    "13fc9be917msh782a30579e56ee9p1cb6f5jsne5660b76c2ce",
                  "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
                },
              };
    
              try {
                const response = await fetch(url, options);
                const data = await response.json();
             
                console.log(data.trailer_youtube_id + " youtube Id ");
                 console.log(data);
    
               $("#trailerTitle").text(data.title);
               $("#description").html("Description : " + data.description);
               $("#year").html("Year : " + data.year + "  ,  ");
               $("#director").html("  Genre : " + data.genre);
                let ybvideoId = data.trailer_youtube_id;
                const videoSrc = `https://www.youtube.com/embed/${ybvideoId}`;
                $("#video-container").attr("src", videoSrc); 
              } catch (error) {
                console.error(error);
              }
            }
    
          });
        } catch (error) {
          console.error(error);
        }
      }
    
      //Call the function to fetch and display data
      // getData();
    
      $("#toback").click(function () {
        console.log("its ok");
       $(".player").css("display", "none");
       $(".moviePart").css("display", "block");
       $(".prev").css("display", "block");
       $(".next").css("display", "block");  
       
      
      });

        /** This fun: will work, when you click back btn */
    $("#goback").click(function () {
        $(".startPart").css("display", "flex");
        $(".moviePart").css("display", "none");
        $("#goback").css("display", "none");
        $(".prev").css("display", "none");
        $(".next").css("display", "none");  
        $('#mtypedCount').val("");
        $('#stypedCount').val("");
      });
    
      Toslide();
     function Toslide() {
      let currentIndex = 0;
      const cardWidth = $('.card').outerWidth();
      const cardsToShow = 4;

      $('.next').on('click', function() {
          if (currentIndex < $('.card').length - cardsToShow) {
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
          const xvalue = -currentIndex * cardWidth * 5;
          console.log(xvalue);
          $('.slider').css('transform', 'translateX(' + xvalue + 'px)');
      }
     }
    
    });
    
    
    