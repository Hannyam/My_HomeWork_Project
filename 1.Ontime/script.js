// var result = "Today is hot.";
// var res = result.charAt(0);
// console.log(res);

//Generate Random A to  z
for (let index = 0; index < 10; index++) {
    let decimalCode = Math.floor(Math.random() * (122 - 65 + 1) + 65);
    console.log(String.fromCharCode(decimalCode));
}
var text="A is";
var res=text.charCodeAt(1);
console.log("this "+ res);
console.log("t"+String.fromCharCode(32)+String.fromCharCode(65)+"space"+String.fromCharCode(32)+".");