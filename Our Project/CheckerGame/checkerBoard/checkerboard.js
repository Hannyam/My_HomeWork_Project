$(document).ready(function () {
	var player = 1; // 1 is player One
	var board = $("#board");
	board.html("");
	var player1TakeCount = 0;
	var player2TakeCount = 0;

	var pieces = [
		[-1, 0, -1, 0, -1, 0, -1, 0],
		[0, -1, 0, -1, 0, -1, 0, -1],
		[-1, 0, -1, 0, -1, 0, -1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
	];

	/* to change Theme */
	let currentTheme = "default";

	setUp();

	function setUp() {
		for (let i = 0; i < pieces.length; i++) {
			var row = $("<div></div>").addClass("row");

			for (let j = 0; j < pieces[i].length; j++) {
				var col = $("<div></div>");
				var piece = $("<div></div>");
				$(col).attr("id", i + "" + j);
				// col.innerText = i + "" + j;
				if (pieces[i][j]) {
					if (pieces[i][j] == -1) {
						piece.addClass("player one");
					} else if (pieces[i][j] == 1) {
						piece.addClass("player two");
					} else {
						piece.addClass("empty");
					}
				}
				if (i % 2) {
					// odd row
					if (j % 2) {
						// odd row, odd col
						col.addClass("square classicSquare");
					} else {
						// odd row, even col
						col.addClass("square whiteSquare");
					}
				} else {
					// even row
					if (j % 2) {
						// even row, odd col
						col.addClass("square whiteSquare");
					} else {
						// even row, even col
						col.addClass("square classicSquare");
					}
				}
				col.append(piece);
				row.append(col);
			}
			board.append(row);
		}
	}

	/** Function to move pieces...  */
	function moveProcess() {
		$(".two").on("click", clickPiece);
	}
	/**
	 *
	 */
	function clickPiece() {
		clearTempState();
		var id = $(this).parent().attr("id");
		checkMovable(id);
		$(".movable").on("click", { id: id }, movePiece);
		$(".kingMovable").on("click", { id: id }, movePiece);
	}

	/**
	 *
	 * @param {*} id
	 */
	function checkMovable(id) {
		var newRow = calcNextRow(id);
		// left cell
		var newLCol = calcNextLCol(id);
		// right cell
		var newRCol = calcNextRCol(id);
		if (newRow >= 0 && newRow <= 7) {
			var newLeftCell = $(`#${newRow}${newLCol}`);
			var newRightCell = $(`#${newRow}${newRCol}`);
			if (newLCol >= 0) {
				if (classifyPiece(id, "left") == -player) {
					checkTakeablePiece(id, newRow + "" + newLCol, "left");
				} else if (classifyPiece(id, "left") == 0) {
					if ($(`#${id}>div`).hasClass("king")) {
						newLeftCell.addClass("kingMovable");
					} else {
						newLeftCell.addClass("movable");
					}
				}
			}
			if (newRCol <= 7) {
				if (classifyPiece(id, "right") == -player) {
					checkTakeablePiece(id, newRow + "" + newRCol, "right");
				} else if (classifyPiece(id, "right") == 0) {
					if ($(`#${id}>div`).hasClass("king")) {
						newRightCell.addClass("kingMovable");
					} else {
						newRightCell.addClass("movable");
					}
				}
			}
		}
		// king
		if ($(`#${id}>div`).hasClass("king")) {
			var backRow = newRow + 2 * player;
			if (backRow >= 0 && backRow <= 7) {
				var newLeftCell = $(`#${backRow}${newLCol}`);
				var newRightCell = $(`#${backRow}${newRCol}`);
				if (newLCol >= 0) {
					if (classifyBackPiece(id, "left") == -player) {
						checkTakeablePiece(id, backRow + "" + newLCol, "left");
					} else if (classifyBackPiece(id, "left") == 0) {
						newLeftCell.addClass("kingMovable");
					}
				}
				if (newRCol <= 7) {
					if (classifyBackPiece(id, "right") == -player) {
						checkTakeablePiece(id, backRow + "" + newRCol, "right");
					} else if (classifyBackPiece(id, "right") == 0) {
						newRightCell.addClass("kingMovable");
					}
				}
			}
		}
	}

	/**
	 *to check if the enemy exits diagonal and next diagonal cell is clear
	 * @param {current cell} oldId
	 * @param {enemy cell} newId
	 * @param {left or right} side
	 */
	function checkTakeablePiece(oldId, newId, side) {
		var isNormal;
		if (player == 1) {
			isNormal = oldId.slice()[0] - newId.slice()[0] == 1;
		} else {
			isNormal = oldId.slice()[0] - newId.slice()[0] == -1;
		}
		console.log(oldId.slice()[0], newId.slice()[0][0], isNormal);

		var targetRow = calcNextRow(newId);
		var targetCol = side == "left" ? calcNextLCol(newId) : calcNextRCol(newId);
		var targetCellId = targetRow + "" + targetCol;
		if (targetRow >= 0 && targetRow <= 7 && targetCol >= 0 && targetCol <= 7) {
			if (isNormal) {
				if (classifyPiece(newId, side) == 0) {
					if ($(`#${oldId}>div`).hasClass("king")) {
						$(`#${targetCellId}`).addClass("kingTakeable");
					} else {
						$(`#${targetCellId}`).addClass("takeable");
					}
					$(`#${targetCellId}`).on(
						"click",
						{
							prevId: oldId,
							enemyId: [newId],
							nextId: targetCellId,
						},
						takePiece
					);

					if (
						targetRow > 0 &&
						targetRow < 7 &&
						targetCol >= 0 &&
						targetCol <= 7
					) {
						checkSecTake(oldId, newId, targetCellId, "left");
						checkSecTake(oldId, newId, targetCellId, "right");
					}
				}
			} else {
				// king take backwards
				console.log(classifyBackPiece(newId, side));
				if (classifyBackPiece(newId, side) == 0) {
					var backRow = calcNextRow(oldId) + 2 * player;
					var col = side == "left" ? calcNextLCol(oldId) : calcNextRCol(oldId);
					col = side == "left" ? col - 1 : col + 1;
					var nextRow = backRow + player;
					console.log(nextRow, col);
					$(`#${nextRow}${col}`).addClass("kingTakeable");

					$(`#${nextRow}${col}`).on(
						"click",
						{
							prevId: oldId,
							enemyId: [newId],
							nextId: nextRow + "" + col,
						},
						takePiece
					);
				}
			}
		}
	}

	/**
	 *to check if it is possible to double take
	 * @param {first take cell} oldId
	 * @param {enemy cell} newId
	 * @param {left or right} side
	 */
	function checkSecTake(oldId, newId, targetCellId, side) {
		if (classifyPiece(targetCellId, side) == -player) {
			var secEnemyId = calcNextId(targetCellId, side);
			var lastCell = calcNextId(secEnemyId, side);
			if (
				checkNextCelllegit(secEnemyId) &&
				classifyPiece(secEnemyId, side) == 0
			) {
				$(`.takeable`).off("click");
				$(`.kingTakeable`).off("click");

				// $(`#${lastCell}`).addClass("takeable");

				if ($(`#${oldId}>div`).hasClass("king")) {
					$(`#${lastCell}`).addClass("kingTakeable");
				} else {
					$(`#${lastCell}`).addClass("takeable");
				}
				$(`#${lastCell}`).on(
					"click",
					{
						prevId: oldId,
						enemyId: [newId, secEnemyId],
						nextId: lastCell,
					},
					takePiece
				);
			}
		}
	}

	/**
	 *to move when player click .movable cell
	 * @param {*} e
	 */
	function movePiece(e) {
		changePlayerClickEvent();
		var oldId = e.data.id;
		var newId = $(this).attr("id");

		pieces[oldId.slice()[0]][oldId.slice()[1]] = 0;
		pieces[newId.slice()[0]][newId.slice()[1]] = player;
		if ($(`#${oldId}>div`).hasClass("king")) {
			$(this).append(
				`<div class="king ${
					player == -1 ? "kingOne" : "kingTwo"
				}"><div class="kingLogo"><i class="fa-solid fa-crown"></i></div></div></div>`
			);
			// put king effect
			$(".kingLogo i").css("animation", "boardAnimation 2.1s -2s 1 alternate");
			$(".kingLogo").css("display", "block");
			//play move audio
			OnOffSound("movesound");
		} else {
			$(this).append(
				`<div class="player ${player == -1 ? "one" : "two"}"></div>`
			);
			//play move audio
			OnOffSound("movesound");
			//play move audio
			checkAndChangeKing(newId);
		}

		$(`#${oldId}`).empty();

		clearTempState();
		changePlayer();
	}

	/**
	 *to take enemy piece when click takable or kingTakable cell
	 */
	function takePiece(e) {
		var oldId = e.data.prevId;
		var enemyId = e.data.enemyId;
		var currentId = e.data.nextId;
		changePlayerClickEvent();

		if ($(`#${oldId}>div`).hasClass("king")) {
			$(this).append(
				`<div class="king ${
					player == -1 ? "kingOne" : "kingTwo"
				}"><div class="kingLogo"><i class="fa-solid fa-crown"></i></div></div>`
			);
			
			// put king effect
			$(".kingLogo i").css("animation", "boardAnimation 2.1s -2s 1 alternate");
			$(".kingLogo").css("display", "block");

			//play move audio
			OnOffSound("hurtsound");
		} else {
			$(this).append(
				`<div class="player ${player == -1 ? "one" : "two"}"></div>`
			);
			//play move audio
			//OnOffSound("movesound");
			//play move audio
			checkAndChangeKing(currentId);
		}

		pieces[currentId.slice()[0]][currentId.slice()[1]] = player;
		pieces[oldId.slice()[0]][oldId.slice()[1]] = 0;
		$(`#${oldId}`).empty();

		for (let i = 0; i < enemyId.length; i++) {
			pieces[enemyId[i].slice()[0]][enemyId[i].slice()[1]] = 0;
			$(`#${enemyId[i]}`).empty();
			//play take audio
			OnOffSound("hurtsound");
			// Insert Take count.....
			if (player == -1) {
				// Increase player two take count
				player2TakeCount++;
				$("#playerTwoEat").text(player2TakeCount);
			} else {
				// Increase player two take count
				player1TakeCount++;
				$("#playerOneEat").text(player1TakeCount);
			}

			isWin(); //checkIsWin or not
		}

		clearTempState();
		changePlayer();
	}

	/**
	 *check piece/ after it move, reach last row or not
	 */
	function checkAndChangeKing(id) {
		if (player == 1) {
			if (id.slice()[0] == 0) {
				$(`#${id}>div`).removeClass("player two");
				$(`#${id}>div`).addClass("king kingTwo");
				$(`#${id}>div`).append(
					`<div class="kingLogo"><i class="fa-solid fa-crown"></i></div>`
				);
				// put king effect
				$(".kingLogo").css("display", "block");
				//play audio
				OnOffSound("kingsound");
			}
		} else {
			if (id.slice()[0] == 7) {
				$(`#${id}>div`).removeClass("player one");
				$(`#${id}>div`).addClass("king kingOne");
				$(`#${id}>div`).append(
					`<div class="kingLogo"><i class="fa-solid fa-crown"></i></div>`
				);
				// put king effect
				$(".kingLogo").css("display", "block");
				//play audio
				OnOffSound("kingsound");
			}
		}
	}

	/**
	 *alternate player
	 */
	function changePlayer() {
		if (player == 1) {
			//put player 2 effect
			$("#playerTwo").css("background-color", "#36ed3c");
			$("#playerOne").css("background-color", "white");
		} else {
			// put player 1 effect
			$("#playerOne").css("background-color", "#36ed3c");
			$("#playerTwo").css("background-color", "white");
		}
		player = player == -1 ? 1 : -1;
	}

	/**
	 *for remmove the dynamic changing state(takeable/movable/ click event)
	 */
	function clearTempState() {
		// go to defult if the player change the piece without moving the first choice
		$(".movable").off("click");
		$(".kingMovable").off("click");
		$(".kingTakeable").off("click");
		$(".takeable").off("click");

		$(".square").removeClass("movable");
		$(".square").removeClass("kingMovable");
		$(".square").removeClass("takeable");
		$(".square").removeClass("kingTakeable");
	}

	/**
	 *calc next row with respect to player
	 */
	function calcNextRow(id) {
		return Number(id.slice()[0]) - player;
	}

	/**
	 *calc next left diagonal col with respect to player
	 */
	function calcNextLCol(id) {
		return Number(id.slice()[1]) - 1;
	}

	/**
	 *calc next right diagonal col with respect to player
	 */
	function calcNextRCol(id) {
		return Number(id.slice()[1]) + 1;
	}

	/**
	 *calc next cell id  with respect to player
	 * @param {cell id} id
	 * @param {left or right} side
	 * @returns next diagonal cell id
	 */
	function calcNextId(id, side) {
		var row = calcNextRow(id);
		var col = side == "left" ? calcNextLCol(id) : calcNextRCol(id);
		return row + "" + col;
	}

	/**
	 *@param {cell id} id
	 * @param {left or right} side
	 * @returns next cell piece
	 */
	function classifyPiece(id, side) {
		var row = calcNextRow(id);
		var col = side == "left" ? calcNextLCol(id) : calcNextRCol(id);
		return pieces[row][col];
	}

	/**
	 *for king back check
	 * *@param {cell id} id
	 * @param {left or right} side
	 * @returns
	 */
	function classifyBackPiece(id, side) {
		var backRow = calcNextRow(id) + 2 * player;
		var col = side == "left" ? calcNextLCol(id) : calcNextRCol(id);
		return pieces[backRow][col];
	}

	/**
	 *
	 * @param {*} id
	 * @param {*} side
	 * @returns
	 */
	function classifyBackPiece(id, side) {
		var backRow = calcNextRow(id) + 2 * player;
		var col = side == "left" ? calcNextLCol(id) : calcNextRCol(id);
		return pieces[backRow][col];
	}

	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	function checkNextCelllegit(id) {
		var row = calcNextRow(id);
		var leftCol = calcNextLCol(id);
		var rightCol = calcNextRCol(id);

		return (
			row >= 0 &&
			row <= 7 &&
			leftCol >= 0 &&
			leftCol <= 7 &&
			rightCol >= 0 &&
			rightCol <= 7
		);
	}

	/**
	 *event changing for player change
	 */
	function changePlayerClickEvent() {
		$(".player").off("click");
		$(".king").off("click");

		if (player == -1) {
			$(".two").on("click", clickPiece);
			$(".kingTwo").on("click", clickPiece);
		} else {
			$(".one").on("click", clickPiece);
			$(".kingOne").on("click", clickPiece);
		}
	}

	/**
	 * Check Win Condition
	 */
	function isWin() {
		// Log the winner based on the counts
		if (player2TakeCount === 12) {
			$("#whichWinText").text("... Player 2 Win ... ");
			setTimeout(() => {
				WinEffect();
			}, 1000);
		} else if (player1TakeCount === 12) {
			$("#whichWinText").text("... Player 1 Win ... ");
			setTimeout(() => {
				WinEffect();
			}, 900);
		}

		/**Fun: to Put Win effect */
		function WinEffect() {
			$(".container").css("display", "none");
			$(".win").css("display", "flex");
			$(".winbox").css("display", "flex");
			var audio = document.getElementById("winsound");
			audio.play();
		}
	}

	/** For design */

	/** function to change Theme */
	function changeTheme(theme) {
		board.removeClass(currentTheme);
		board.addClass(theme);
		currentTheme = theme;
		// Add logic to change border color
		if (theme === "dark") {
			board.css("border-color", "black");
		} else if (theme === "default") {
			board.css("border-color", "#471f02");
		} else if (theme == "light") {
			board.css("border-color", "#666666");
		} else if (theme == "wooden") {
			board.css("border-color", "#98612e");
		} else if (theme == "red") {
			board.css("border-color", "black");
		} else {
			board.css("border-color", "#344e03");
		}
	}

	$("#defaultTheme").click(function () {
		changeTheme("default");
	});

	$("#darkTheme").click(function () {
		changeTheme("dark");
	});

	$("#lightTheme").click(function () {
		changeTheme("light");
	});

	$("#woodenTheme").click(function () {
		changeTheme("wooden");
	});
	$("#redTheme").click(function () {
		changeTheme("red");
	});
	$("#greenTheme").click(function () {
		changeTheme("green");
	});
	/** When user hover theme Btn */
	changeThemeHover("#defaultTheme", "#8B4513", "#986b41");
	changeThemeHover("#darkTheme", "black", "grey");
	changeThemeHover("#woodenTheme", "#986b41", "#eab996");
	changeThemeHover("#lightTheme", "#a3a9f3", "#bfc3f6");
	changeThemeHover("#redTheme", "#de0a26", "#f94449");
	changeThemeHover("#greenTheme", "#568203", "#009E60");
	changeThemeHover("#backMenu", "green", "rgb(52, 244, 52)");
	changeThemeHover("#playBtn", "darkorange", "orange");
	changeThemeHover(".homeBtn", "darkorange", "orange");
	changeThemeHover(".restartBtn", "#009E60", "blue");
	changeThemeHover(".replayBtn", "skyblue", "rgb(98, 208, 252)");

	/** function to change Theme */
	function changeThemeHover(theme, color1, color2) {
		$(`${theme}`).hover(
			function () {
				$(this).css({
					"background-color": `${color1}`,
					"box-shadow": `0 0 5px ${color1},0 0 25px ${color1}`,
					color: "white",
				});
			},
			function () {
				$(this).css({
					"background-color": `${color2}`,
					"box-shadow": `0 0 5px ${color2}`,
				});
			}
		);
	}
	/** click back to Menu btn */
	$("#backMenu,.homeBtn").click(() => {
		setTimeout(() => {
			window.location.href = "../home/home.html";
		}, 700);
	});

	/** click Play Game btn */
	$("#playBtn").click(() => {
		toHide("#defaultTheme", "hideAnimationR");
		toHide("#darkTheme", "hideAnimationT");
		toHide("#woodenTheme", "hideAnimationT");
		toHide("#lightTheme", "hideAnimationR");
		toHide("#redTheme", "hideAnimationR");
		toHide("#greenTheme", "hideAnimationT");
		toHide("#backMenu", "hideAnimationT");
		toHide("#playBtn", "hideAnimationT");

		$(".game").css("animation", `boardAnimation 4s 1 alternate`);
		$(".game").css("display", "block");
		$(".showplayer").css("animation", `boardAnimation 4s 1 alternate`);
		$(".showplayer").css("display", "flex");
		$(".fullboard").css("animation", "hideAnimationT 4s -1.5s 1 alternate"); // in Here
		$(".command").css("display", "block");

		//clear square animation when start play
		$(".square").css("transition", "background-color 0s ease");
		// can start move
		moveProcess();
	});

	/** This fun to hide all btn with animation */
	function toHide(selector, animation) {
		$(selector).css("animation", `${animation} 2s  1 alternate`);
		setTimeout(() => {
			$(selector).css("display", "none");
		}, 2000);
	}

	setTimeout(() => {
		$("#justShow").css("display", "none");
		$(".container").css("display", "flex");
	}, 3000);

	/** Show Player button */
	$("#playerOne").hover(
		() => {
			$(".showplayer .p1").css("color", "#01d908");
		},
		() => {
			$(".showplayer .p1").css("color", "#a920f8");
		}
	);

	$("#playerTwo").hover(
		() => {
			$(".showplayer .p2").css("color", "#01d908");
		},
		function () {
			$(".showplayer .p2").css("color", "#fc1bed");
		}
	);

	// Get the mic button element
	var micButton = $("#micButton");
	// Add a click event listener to toggle mic on/off
	$("#micButton").on("click", function () {
		// Toggle between mic and mic-off icons
		if (micButton.attr("name") === "mic") {
			micButton.attr("name", "mic-off");
			// $(".allsound").html("");
		} else {
			micButton.attr("name", "mic");
			// $(".allsound").html("");
		}
	});
	/** Function for on / off sound */
	function OnOffSound(soundIdName) {
		var micButton = $("#micButton");
		var audio = document.getElementById(soundIdName);
		//  depends mic and mic-off icons
		if (micButton.attr("name") === "mic") {
			audio.play();
		} else {
			audio.pause();
		}
	}
});
