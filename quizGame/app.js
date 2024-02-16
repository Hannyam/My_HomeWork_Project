$(document).ready(() => {
	var quizData;
	var question;
	var correctAns;
	var incorrectAns;
	var gameLost = false;
	let currentLvl = 1;

	let quizDataArr = [
		["animal", 27, "multiple"],
		["animal", 27, "boolean"],
		["history", 23, "multiple"],
		["history", 23, "boolean"],
		["Geography", 22, "multiple"],
		["Geography", 22, "boolean"],
		["Science & Nature", 17, "multiple"],
		["Science & Nature", 17, "boolean"],
		["Science: Mathematics", 19, "multiple"],
		["Science: Mathematics", 19, "boolean"],
	];
	inintLoad();

	/**
	 *
	 */
	function inintLoad() {
		var cateHtml = "";
		var lvlHtml = "";
		for (let i = 0; i < 10; i++) {
			lvlHtml += `
					<div class="lvl" id="${i + 1}">Level ${i + 1}</div>
            `;
			cateHtml += `
                <div class="cateGp" cateInfo="${[
									quizDataArr[i][1],
									quizDataArr[i][2],
								]}">
                    <div class="type">${
											quizDataArr[i][2] == "multiple" ? "Multi" : "T/F"
										}</div>
                    <div class="category">${quizDataArr[i][0]}</div>
                </div>
            `;

			$(".categories").html(cateHtml);
			$(".level").html(lvlHtml);
			$(".level div:first").addClass("current");
		}
	}

	/**
	 *
	 * @param {*} id
	 * @param {*} type
	 */

	let getQuiz = async (id, type) => {
		let url = `https://opentdb.com/api.php?amount=1&category=${id}&difficulty=easy&type=${type}`;

		try {
			const response = await fetch(url);
			const result = await response.json();

			showQuestion(result);
		} catch (error) {
			console.error(error);
		}
	};
	// let getQuiz = (id, type) => {
	// 	let apiLink = `https://opentdb.com/api.php?amount=1&category=${id}&difficulty=easy&type=${type}`;

	// 	fetch(apiLink)
	// 		.then((res) => res.json())
	//         .then((data) => {
	//             console.log(typeof data);
	// 			quizData = data.results[0];
	// 			question = quizData.question;
	// 			correctAns = quizData.correct_answer;
	// 			incorrectAns = quizData.incorrect_answers;
	// 			console.log(question);
	// 			console.log(correctAns);
	// 			setTimeout(showQuestion, 1 * 1000);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	/**
	 *
	 */
	$(".cateGp").on("click", cateClick);

	function cateClick() {
		// prevet to click the same cate again
		if (!$(this).hasClass("selected")) {
			$(".cateGp").off("click");
			var cateInfo = $(this).attr("cateInfo").split(",");
			$(this).addClass("selected");
			getQuiz(cateInfo[0], cateInfo[1]);
		} else {
			console.log("already selected");
		}
	}

	/**
	 *
	 */
	function showQuestion(data) {
		quizData = data.results[0];
		question = quizData.question;
		correctAns = quizData.correct_answer;
		incorrectAns = quizData.incorrect_answers;
		console.log(question);
		console.log(correctAns);
		$(".categories").css("display", "none");
		$(".quiz").css("display", "block");
		//ques insert
		$(".ques").html(question);

		// ans insert
		let randNum = Math.floor(Math.random() * (incorrectAns.length + 1));
		let ansHtml = "";
		let incorrectIndex = 0;
		for (let i = 0; i <= incorrectAns.length; i++) {
			if (i == randNum) {
				ansHtml += `<div class="ans rightAns">${correctAns}</div>`;
			} else {
				ansHtml += `<div class="ans">${incorrectAns[incorrectIndex]}</div>`;
				i == randNum ? incorrectIndex : incorrectIndex++;
			}
		}
		$(".answers").html(ansHtml);
	}

	/**
	 *
	 */
	$(".answers").on("click", ".ans", function () {
		if ($(this).hasClass("rightAns")) {
			// correct ans case
			$(this).addClass("correct");
			correctCase();
		} else {
			// wrong ans case
			$(this).addClass("wrong");
			gameLost = true;
		}
		// setTimeout(pageChange, 1000);
		pageChange();
	});

	/**
	 *
	 */
	function pageChange() {
		$(".cateGp").on("click", cateClick);
		setTimeout(() => {
			if (gameLost) {
				gameResult(false);
			} else if (currentLvl > 10) {
				gameResult(true);
			} else {
				changeToCatePg();
			}
		}, 1 * 1000);
	}

	/**
	 *
	 */
	function correctCase() {
		$(".level")
			.find("#" + currentLvl)
			.removeClass("current");
		$(".level")
			.find("#" + currentLvl)
			.addClass("finished");
		currentLvl++;
		$(".level")
			.find("#" + currentLvl)
			.addClass("current");
	}

	/**
	 *
	 * @param {*} result
	 */
	function gameResult(result) {
		$(".categories").css("display", "none");
		$(".result").css("display", "flex");
		if (result) {
			$(".result > div").text("You Win!!");
			$(".result > button").addClass("correct");
			$(".result > button").text("Restart");
		} else {
			$(".result > div").text("You Lose!!");
			$(".result > button").addClass("wrong");
			$(".result > button").text("Try Again");
		}
	}

	/**
	 *
	 */
	function changeToCatePg() {
		$(".categories").css("display", "flex");
		$(".quiz").css("display", "none");
	}

	/**
	 *
	 */
	function restart() {
		gameLost = false;
		currentLvl = 1;
		$(".categories").css("display", "flex");
		$(".quiz").css("display", "none");
		$(".result").css("display", "none");

		$(".lvl").removeClass("finished");
		$(".lvl").removeClass("current");

		$(".level")
			.find("#" + currentLvl)
			.addClass("current");
		$(".cateGp").removeClass("selected");
	}

	/**
	 *
	 */
	$(".result > button").on("click", restart);
	/////////////////
});

// https://opentdb.com/api.php?amount=10&difficulty=easy

// category: "Animals";
// correct_answer: "Murder";
// difficulty: "easy";
// incorrect_answers: (3)[("Pack", "Gaggle", "Herd")];
// question: "What is the collective noun for a group of crows?";
// type: "multiple";

// category: "Animals";
// correct_answer: "True";
// difficulty: "easy";
// incorrect_answers: ["False"];
// question: "A bear does NOT defecate during hibernation. ";
// type: "boolean";
