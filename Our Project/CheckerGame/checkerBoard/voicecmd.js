var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitGrammarList;

var commands = ["find", "take"];

var recognition = new SpeechRecognition();

if (SpeechGrammarList) {
  var RecognitionGrammarList = new SpeechGrammarList();
  var grammar =
    "#JSGF V1.0; grammar commands; public <commands> = " +
    commands.join(" | ") +
    " ; ";

  SpeechGrammarList.addFromString(grammar, 1);

  recognition.grammars = SpeechRecognitionList;
}
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var selectedPiece;
var numericId;

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript.toLowerCase().trim();

  // alert(command);

  if (!isNaN(command)) {
    // If the spoken command is a number, select the corresponding div
    numericId = Number(command);

    selectedPiece = $("#" + numericId);

    if (selectedPiece.length > 0) {
      // The piece with the numeric ID exists
      $("#" + numericId + " > .player").click();
      console.log("Selected piece with ID: " + numericId);
    } else {
      // Piece with the numeric ID not found
      console.log("Piece with ID " + numericId + " not found!");
    }
  } else if (command.startsWith("move to")) {
    var target = command.replace("move to ", "").trim();

    numericId = convertSpokenNumberToNumericId(target);

    selectedPiece = $("#" + numericId);

    if (selectedPiece.length > 0) {
      // The piece with the numeric ID exists
      $("#" + numericId).click();
      console.log("moved to ID: " + numericId);
    } else {
      // Piece with the numeric ID not found
      console.log(numericId + " not found!");
    }
  } else if (command.toLowerCase() === "left.") {
    console.log(numericId);
    selectedPiece = $("#" + numericId);

    if (
      (selectedPiece && selectedPiece.find(".player").hasClass("one")) ||
      (selectedPiece && selectedPiece.find(".player").hasClass("one"))
    ) {
      console.log("gotp1");
      movePieceLeft(numericId);
    } else {
      console.log("gotp2");
      console.log(selectedPiece);
      movePieceLeft2(numericId);
    }
  } else if (command.toLowerCase() === "right.") {
    console.log(numericId);
    selectedPiece = $("#" + numericId);

    if (
      (selectedPiece && selectedPiece.find(".player").hasClass("one")) ||
      (selectedPiece && selectedPiece.find(".player").hasClass("one"))
    ) {
      movePieceRight(numericId);
    } else {
      movePieceRight2(numericId);
    }
  } else if (command.toLowerCase() === "take left.") {
    console.log(numericId);
    selectedPiece = $("#" + numericId);

    if (
      (selectedPiece && selectedPiece.find(".player").hasClass("one")) ||
      (selectedPiece && selectedPiece.find(".player").hasClass("one"))
    ) {
      takePieceLeft(numericId);
    } else {
      takePieceLeft2(numericId);
    }
  } else if (command.toLowerCase() === "take right.") {
    console.log(numericId);
    selectedPiece = $("#" + numericId);

    if (
      (selectedPiece && selectedPiece.find(".player").hasClass("one")) ||
      (selectedPiece && selectedPiece.find(".player").hasClass("one"))
    ) {
      takePieceRight(numericId);
    } else {
      takePieceRight2(numericId);
    }
  } else if (command.toLowerCase() === "move top left.") {
    selectedPiece = $("#" + numericId);

    moveKingTopLeft(numericId);
  } else if (command.toLowerCase() === "move top right.") {
    selectedPiece = $("#" + numericId);

    moveKingTopRight(numericId);
  } else if (command.toLowerCase() === "move bottom left.") {
    selectedPiece = $("#" + numericId);

    moveKingBottomLeft(numericId);
  } else if (command.toLowerCase() === "move bottom right.") {
    selectedPiece = $("#" + numericId);

    moveKingBottomRight(numericId);
  } else if (command.toLowerCase() === "take top left.") {
    selectedPiece = $("#" + numericId);
    takeKingTopLeft(numericId);
  } else if (command.toLowerCase() === "take top right.") {
    selectedPiece = $("#" + numericId);
    takeKingTopRight(numericId);
  } else if (command.toLowerCase() === "take bottom left.") {
    selectedPiece = $("#" + numericId);
    takeKingBottomLeft(numericId);
  } else if (command.toLowerCase() === "take bottom right.") {
    selectedPiece = $("#" + numericId);
    takeKingBottomRight(numericId);
  } else {
    alert("Please say a valid command!" + "\n Your Command is..." +' ( "  ' + command + ' " )');
  }
  $("#cmdBtn").css("background-color", "#0da518");
};

// Function to move a piece to the left
function movePieceLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 1;
  var newRow = row + 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move a piece to the right
function movePieceRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 1;
  var newRow = row + 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}
// Function to move a piece to the left
function movePieceLeft2(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 1;
  var newRow = row - 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move a piece to the right
function movePieceRight2(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 1;
  var newRow = row - 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move a piece to the left
function takePieceLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 2;
  var newRow = row + 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to move a piece to the right
function takePieceRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 2;
  var newRow = row + 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

function takePieceLeft2(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 2;
  var newRow = row - 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to move a piece to the right
function takePieceRight2(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 2;
  var newRow = row - 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to move the top-left
function moveKingTopLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 1;
  var newRow = row - 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move the top-right
function moveKingTopRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col + 1;
  var newRow = row - 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move the bottom-left
function moveKingBottomLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 1;
  var newRow = row + 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to move the bottom-right
function moveKingBottomRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col + 1;
  var newRow = row + 1;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
}

// Function to take a piece to the top left for the king
function takeKingTopLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 2;
  var newRow = row - 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to take a piece to the top right for the king
function takeKingTopRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 2;
  var newRow = row - 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to take a piece to the bottom left for the king
function takeKingBottomLeft(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));

  var newCol = col - 2;
  var newRow = row + 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

// Function to take a piece to the bottom right for the king
function takeKingBottomRight(numericId) {
  let str = numericId.toString();
  var row = parseInt(str.charAt(0));
  var col = parseInt(str.charAt(1));
  var newCol = col + 2;
  var newRow = row + 2;
  var newId = newRow.toString() + newCol.toString();

  $("#" + newId).click();
  $("#" + newId).click();
}

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onerror = function () {
  alert("Error ocured in recognition:");
};
function test() {
  alert("hehehehehhehe");
}

function convertSpokenNumberToNumericId(spokenNumber) {
  console.log("converting");
  var numberMap = {
    zero: "00",
    one: "01",
    two: "02",
    three: "03",
    four: "04",
    five: "05",
    six: "06",
    seven: "07",
    eight: "08",
    nine: "09",
    ten: "10",
    eleven: "11",
    twelve: "12",
    thirteen: "13",
    fourteen: "14",
    fifteen: "15",
    sixteen: "16",
    seventeen: "17",
    eighteen: "18",
    nineteen: "19",
    twenty: "20",
    "twenty-one": "21",
    "twenty-two": "22",
    "twenty-three": "23",
    "twenty-four": "24",
    "twenty-five": "25",
    "twenty-six": "26",
    "twenty-seven": "27",
    "twenty-eight": "28",
    "twenty-nine": "29",
    thirty: "30",
    "thirty-one": "31",
    "thirty-two": "32",
    "thirty-three": "33",
    "thirty-four": "34",
    "thirty-five": "35",
    "thirty-six": "36",
    "thirty-seven": "37",
    "thirty-eight": "38",
    "thirty-nine": "39",
    forty: "40",
    "forty-one": "41",
    "forty-two": "42",
    "forty-three": "43",
    "forty-four": "44",
    "forty-five": "45",
    "forty-six": "46",
    "forty-seven": "47",
    "forty-eight": "48",
    "forty-nine": "49",
    fifty: "50",
    "fifty-one": "51",
    "fifty-two": "52",
    "fifty-three": "53",
    "fifty-four": "54",
    "fifty-five": "55",
    "fifty-six": "56",
    "fifty-seven": "57",
    "fifty-eight": "58",
    "fifty-nine": "59",
    sixty: "60",
    "sixty-one": "61",
    "sixty-two": "62",
    "sixty-three": "63",
    "sixty-four": "64",
    "sixty-five": "65",
    "sixty-six": "66",
    "sixty-seven": "67",
    "sixty-eight": "68",
    "sixty-nine": "69",
    seventy: "70",
    "seventy-one": "71",
    "seventy-two": "72",
    "seventy-three": "73",
    "seventy-four": "74",
    "seventy-five": "75",
    "seventy-six": "76",
    "seventy-seven": "77",
  };

  // Convert the spoken number to lowercase for case-insensitive matching
  spokenNumber = spokenNumber.toString().toLowerCase();

  return numberMap[spokenNumber] !== undefined
    ? numberMap[spokenNumber]
    : spokenNumber;
}

$(document).ready(() => {
  function star() {
    if (recognition && recognition.state === "running") {
      recognition.stop();
    } else {
      recognition.start();
      $("#cmdBtn").css("background-color", "grey");
    }
  }

  $("#cmdBtn").on("click", star);
});

$(document).on("keydown", function (event) {
  // Check if any key is pressed
  if (event.which) {
    // Trigger a click on #cmdbtn
    $("#cmdBtn").click();
  }
});
