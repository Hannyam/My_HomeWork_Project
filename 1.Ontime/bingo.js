//Define row for cell
let row1 = [0, 0, 0, 0];
let row2 = [0, 0, 0, 0];
let row3 = [0, 0, 0, 0];
let row4 = [0, 0, 0, 0];
// initial setting
let p1 = 1;
let p2 = 2;

let current = p1;
let finished = false;
//for check random again or not
const pressArray=[];

//When user click cell
function flip(obj) {

  if (finished == false) {
    let rc = obj.id.split(","); //[1,1]

    let row = Number(rc[0]);
    let col = Number(rc[1]) - 1;

    let valid = true;

    switch (row) {
      case 1:
        if (row1[col] != 0) {
          valid = false;
          break;
        }
        row1[col] = current;
        break;
      case 2:
        if (row2[col] != 0) {
          valid = false;
          break;
        }
        row2[col] = current;
        break;
      case 3:
        if (row3[col] != 0) {
          valid = false;
          break;
        }
        row3[col] = current;
        break;
      case 4:
        if (row4[col] != 0) {
          valid = false;
          break;
        }
        row4[col] = current;
        break;
        
       
    }
    // if cell is valid or not
    if (valid) {
      obj.style.transform = "scaleY(-1)";
      
      if (current == p1) {
        obj.style.background = "tomato";
        current = p2;
        document.getElementById("turn").innerHTML = "player 2 Turn!";
        document.getElementById("turn").style.color = "teal";

        pressArray.push(obj.id);
        bot();
      } else {
        obj.style.background = "teal";
        current = p1;
        document.getElementById("turn").innerHTML = "player 1 Turn!";
        document.getElementById("turn").style.color = "tomato";

        pressArray.push(obj.id);
       
      }
    }  
    // check win player
    checkWhowin();
    
    
  }
}

function bot() {
  // horizontalBlockAI();
  doRandom();
 }

function doRandom(){ 
  let r = Math.floor(Math.random() * 4 + 1);
  let c = Math.floor(Math.random() * 4 + 1);
  let randomClick = r + "," + c;
  setTimeout(() => {
    document.getElementById(randomClick).click();
  }, 1000);
  // random again or not
  if (pressArray.includes(randomClick)) {
    console.log("random again");
    doRandom();
  }
  
}
// check win player win 3 conditions
function checkWhowin() {
  //horizonal check
  if (horizontal(p1) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 1 Win!";
  } else if (horizontal(p2) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 2 Win!";
  } 
  //vertical check
  if (vertical(p1) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 1 Win!";
  } else if (vertical(p2) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 2 Win!";
  } 
  //crossing check
  if (crossing(p1) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 1 Win!";
  } else if (crossing(p2) == true) {
    finished = true;
    document.getElementById("win").innerHTML = "Player 2 Win!";
  } 
    //draw check
    if (draw() == true) {
      document.getElementById("win").innerHTML = "It's draw!";
      finished = true;
    } 

}

 //check draw or not
 function draw() {
  let drawArray= row1.concat(row2,row3,row4);
  let count=16;
  for (let index = 0; index < drawArray.length; index++) {
    if(drawArray[index]!=0){
      count--;    
    }
  } console.log(count); 
  // if(drawArray.includes(0))...
  if(count==0 && finished == false){
    console.log("draw");
    return true;
  }
  
 }

// Vertical check return true or not
function vertical(player) {
  for (let index = 0; index < 4; index++) {
    if (
      row1[index] == player &&
      row2[index] == player &&
      row3[index] == player &&
      row4[index] == player) {
      return true;
    }
  }
  return false;
}

// Horizontal check return true or not
function horizontal(player){

   if(row1[0]==player&&
      row1[1]==player&&
      row1[2]==player&&
      row1[3]==player ||

      row2[0]==player&&
      row2[1]==player&&
      row2[2]==player&&
      row2[3]==player ||

      row3[0]==player&&
      row3[1]==player&&
      row3[2]==player&&
      row3[3]==player ||

      row4[0]==player&&
      row4[1]==player&&
      row4[2]==player&&
      row4[3]==player

    ){   
      return true;         
    }
     return false;

    //  for (let rowindex = 0; rowindex < 4; rowindex++) {
    //   let count = 0;
    //   for (let colindex = 0; colindex < 4; colindex++) {
    //    if (rows[rowindex][colindex]==player) {
    //      count++;
    //    }
        
    //   }
    //   if (count==4) {
    //     return true
    //   }
    //   return false
      
    //  }
  
}

// crossing check return true or not
function crossing(player) {
        if (
          row1[0] == player &&
          row2[1] == player &&
          row3[2] == player &&
          row4[3] == player ||
          row1[3] == player &&
          row2[2] == player &&
          row3[1] == player &&
          row4[0] == player
          ) {
          return true;
        }
        return false;
      
  }


function horizontalBlockAI(){
  probability(row1,1);
  probability(row2,2);
  probability(row3,3);
  probability(row4,4);
}

function probability(array,row) {
    let count = 0;
    let blank = 0;

    for (let index = 0; index < array.length; index++) {
        if (array[index] == p1) {
            count++;
           
        } else {
            blank = index;
           
        }
    }
    
    if (count == 3) {
        blank = blank + 1;
        let  forceClick = row + "," + blank; 
        setTimeout(() => {
            document.getElementById(forceClick).click();
        }, 1000);
        return true;
    }
    
    return false;
    
}





