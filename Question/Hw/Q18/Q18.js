
let holidayArray = [];
let days = document.getElementsByClassName("day");
let date = new Date();
currentCalendar(date);

function currentCalendar(date) {
    let current = date;
    // current month first date
    current.setDate(1);
    let startDate= current.getDay();
    let countdate = 1;
    // go next month
    current.setMonth(current.getMonth() + 1);
    current.setDate(0);// current month of end date
    let enddate = current.getDate();  
    for (let dayCount = startDate; dayCount < 40; dayCount++) {
        if(countdate<=enddate){
            days[dayCount].innerHTML = countdate++;
        }  
    }
  
   
}
// for check input length of Month and Year when user type input
function checkInput(input,maxlength){
    if (input.value.length> maxlength) {
        window.alert("Please Enter only " + maxlength + " numbers...");
        input.value=input.value.slice(0,maxlength);
    }
}
//when user click show btn , do this process
function show() {
  let year = document.getElementById("year").value;
  let month = document.getElementById("month").value;
     // check user inputs equal null or not
     if (year === "" || month === "") {
        window.alert("Please enter both year and month.");
        return;
    }
     // check year or month value is valid or not
    if (year<0 || month < 0 || month > 12) {
        alert("Invalid year or month. Please enter valid values.");
        return;
    }

    for (let dayCount = 0; dayCount < 40; dayCount++) {
        days[dayCount].innerHTML = "";
        days[dayCount].style.backgroundColor = "";
      }
        year = Number(year);
        month = Number(month);
        date = new Date(year, month - 1);
       
        currentCalendar(date);

        var yearMonthShow = year +","+month; // to find holiday in array
     
        findHoliday(yearMonthShow);
       
       
 
}
/* @param {*} date --> date from show section
 */
function findHoliday(date) {
    //to place holiday position correctly in calendar
    let blank = 0;
    for (let i = 0; i < 7; i++) {
      console.log(days[i].innerHTML);
      if (days[i].innerHTML == "") {
        blank++;
      }
    } console.log("blank count: " + blank);

   // check holiday exist or not... with YearMonth[i][0]
    for (var i = 0; i < holidayArray.length; i++) {
        if (holidayArray[i][0] == date) {
            let setHoliday=holidayArray[i][1]-1; // the date of month(-1 is cuz of classId)
            let setHolidayName=holidayArray[i][2];//holiday name           
            //add style for holiday  
            days[setHoliday+blank].style.backgroundColor = "orange";
            // days[setHoliday].style.color="white";
            days[setHoliday+blank].style.fontSize="18px";
            days[setHoliday+blank].innerHTML =(setHoliday+1) + "<br/>"+setHolidayName;

        }
    }   
}

// for Adding Holidays
let holiday = document.getElementById("holiday");
let holidayName = document.getElementById("holidayName");

function clickbtnAdd() {
    if (holiday.value === "" || holidayName.value === "") {
        window.alert("Please insert both date and holiday name.");
        return;
    }

    let holidate=holiday.value.split("-").join();//from 2023-10-20 to 2023,10,21
    console.log(holidate);

    date=new Date(holidate);
   // for check with array
    var yearMonth = date.getFullYear() +","+(date.getMonth()+1);
    

   // form of para (" 2023,10 --> 6 --> Thingyun" )
    collectHoliday(yearMonth,date.getDate(),holidayName.value);
}

// to collect all Holidays in one array
function collectHoliday(yearMonth,date,name) { 
    if (HolidayExist(yearMonth,date)) { // holiday exist
        window.alert("Holiday already exists....");
        console.log("Holiday found in the array.");
    } else { // not exist
         // check user inputs equal null or not
        holidayArray.push([yearMonth,date, name]);//Array ['2023,10', 20, 'Thingyun']
        console.log("save holiday"); 

        //for Holiday List...easy for checking holidays
        let showHdy=document.getElementById("showHdy");
        console.log(showHdy);
        showHdy.innerHTML+= yearMonth +","+ date + " ...  " + name + "<br/>";
    }
    
}
//check for holiday already exists or not
function HolidayExist(yearMonth,date) {
    for (var i = 0; i < holidayArray.length; i++) {
        if (holidayArray[i].includes(yearMonth) && holidayArray[i].includes(date)) {
               //holiday found in the array
               return true; 
         } 
      } return false;
}
//show Holiday List...easy for checking holidays
function showList() {
    var showDiv = document.getElementById("showDiv");
    var checkbox = document.getElementById("showCheckbox");

    if (checkbox.checked) {
        showDiv.style.display="block";
    }else{
        showDiv.style.display="none";
    }
}

