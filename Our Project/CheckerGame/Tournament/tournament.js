$(document).ready(function () {
  let players = [];

  // Array to store leaderboard information
  let leaderboard = [];
  /** When user clicks restart btn */
  $(".restartBtn").click(() => {
    setTimeout(() => {
      window.location.href = "./tournament.html";
    }, 700);
  });


   /** 
  * Player menu --  hamburger menu session
  */
 //Auto open  hamburger menu
 setTimeout(() => {  
  $("#hamburger-menu").slideDown(1500); 
}, 4000); 
  // Open hamburger menu
  $("#open-menu-btn").click(function() {
    $("#hamburger-menu").slideDown(1500);
});

// Close hamburger menu
$("#close-btn,#startPlayerBtn").click(function() {
    $("#hamburger-menu").slideUp(1500);
});

// click  player input box
$("#player1,#player2,#player3,#player4").click(function() {
  $(this).val("");
});

// when click start btn,
$("#startPlayerBtn").click(function() {
  let firstname=$("#player1").val();
  let secondname=$("#player2").val();
  $(".p1").text(firstname);
  $(".p2").text(secondname);
});


/**
 * Leader Board
 */
  // Open Board menu
  $("#open-board-btn").click(function() {
    $("#board-hamburger-menu").slideDown(1500);
});

// Close Board menu
$("#board-close-btn").click(function() {
    $("#board-hamburger-menu").slideUp(1500);
});

// when click start Play btn,
$("#playBtn").click(function() {
  $("#open-menu-btn").off("click");
  $("#open-board-btn").off("click");
});


  // Open Board menu
  $("#open-explain-btn").click(function() {
    $("#explainMenu").slideDown(1500);
});

// Close explain menu
$("#explain-close-btn").click(function() {
  $("#explainMenu").slideUp(1500);
});




  function retrieveLeaderboard() {
    const storedLeaderboard = localStorage.getItem("tournamentLeaderboard");
    if (storedLeaderboard) {
      leaderboard = JSON.parse(storedLeaderboard);
      displayLeaderboard();
    }
  }
  retrieveLeaderboard();

 


  $("#startPlayerBtn").click(function () {
    startTournament();
  });

  function startTournament() {
    players = [
      $("#player1").val(),
      $("#player2").val(),
      $("#player3").val(),
      $("#player4").val(),
    ];

    $("#semiwinner1").val("Player");
    $("#semiwinner2").val("Player");
    $("#winner").val("Winner");

    updatePlayerNames();
    simulateRound();
  }

  function updatePlayerNames() {
    $(".p1").text(players[0]);
    $(".p2").text(players[1]);
  }
 
  function updateLeaderboard(winner) {
    
    // Update leaderboard with the final winner
    leaderboard.push({
      winner: winner,
     
    });
    localStorage.setItem("tournamentLeaderboard", JSON.stringify(leaderboard));
  }

  function displayLeaderboard() {
    // $(".items").empty();
   
    // Display the final winner on the leaderboard
    if (leaderboard.length > 0) {
      const finalWinner = leaderboard[leaderboard.length - 1].winner;
      $(".items").append(`
        <div class="leaderboard-item">
          <p class="rank">1</p>
          <p class="name">${finalWinner}</p>
          <p class="score">${calculateScore(finalWinner)}</p>
        </div>
      `);
    }
  }

  function calculateScore(winner) {
    return winner === "Draw" ? 0 : 1;
  }

  function simulateRound() {
    const semiwinner1 = simulateMatch(players[0], players[1]);
    const semiwinner2 = simulateMatch(players[2], players[3]);
    const winner = simulateMatch(semiwinner1, semiwinner2);

    $("#semiwinner1").val(semiwinner1);
    $("#semiwinner2").val(semiwinner2);
    $("#winner").val(winner);

    updateLeaderboard(winner);
    displayLeaderboard();
  }
  function simulateMatch(player1, player2) {
    const isDraw = Math.random() < 0.00001;

    if (isDraw) {
      console.log("Match is a draw. Rematch!");

      return "Draw";
    } else {
      // The player with a higher score wins
      const score1 = Math.floor(Math.random() * 10);
      const score2 = Math.floor(Math.random() * 10);

      // Return the winner
      return score1 > score2 ? player1 : player2;
    }
  }
});
