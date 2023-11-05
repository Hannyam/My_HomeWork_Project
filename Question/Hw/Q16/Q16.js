var displayBox=document.getElementById("displayBox");
var input_num= document.getElementById("typebox");
var alert_type= document.getElementById("alertType");
var key= document.getElementsByClassName("key");
var checkboxCapslock = document.getElementById("myCheckbox");


// function for Capital & Small letter
  function capsBtn(forcap){
    if(forcap.innerText=="caps"){
        checkboxCapslock.checked = true;
        for (let i = 0; i < key.length; i++) {
    
             var keyChar=key[i].innerHTML;
             var upperCase=keyChar.toUpperCase(); 
             key[i].innerHTML=upperCase;  
        } 
    }else{
        checkboxCapslock.checked = false;
        for (let i = 0; i < key.length; i++) {
           
             var keyChar=key[i].innerHTML;
             var lowerCase=keyChar.toLowerCase(); 
             key[i].innerHTML= lowerCase;  
        } 
    }

  }
// check display box is empty or not
function testDisplaybox(){
    if(displayBox.innerHTML==""){
        alert("Please Type Something...");
    }
}
// Start code for all function buttons
function clickCharAt(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert number...";
    }else{
        var result=displayBox.innerHTML.charAt(input_num.value);
        alert("The character of charAt("+ input_num.value +") is -->  "+result);
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function charCodeAt(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert number...";
    }else{
        var result=displayBox.innerHTML.charCodeAt(input_num.value);
        alert("The decimal code of charCodeAt("+ input_num.value +") is -->  "+result);
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function toUpperCase(){
    if(displayBox.innerHTML==""){
        alert("Please Type Something...");
    }else{
        var result=displayBox.innerHTML.toUpperCase(input_num.value);
        alert("The upper case of your data is --> "+'"'+result+'"');
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function toLowerCase(){
    if(displayBox.innerHTML==""){
        alert("Please Type Something...");
    }else{
        var result=displayBox.innerHTML.toLowerCase(input_num.value);
        alert("The lower case of your data is --> "+'"'+result+'"');
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function clickTrim(){
    if(displayBox.innerHTML==""){
        alert("Please Type Something...");
    }else{
        var result=displayBox.innerHTML.trim(input_num.value);
        alert("The trim of your data is -->  "+'"'+result+'"');
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function clickInclude(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert some word...";
    }else{
        var result=displayBox.innerHTML.includes(input_num.value);
        console.log(result);
        if(result==true){
            alert("Your searching data ("+ input_num.value +") is included in your typing inbox. ");
        }else{
            alert("Your searching data ("+ input_num.value +") is not included in your typing inbox. ");
        }
        
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function clickIndexOf(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert some text...";
    }else{
        var result=displayBox.innerHTML.indexOf(input_num.value);
        alert("The first position of indexOf("+ input_num.value +") is -->  "+result);
        input_num.value="";
        alert_type.innerHTML="";
    }   
}
function clickLastIndexOf(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert some text...";
    }else{
        var result=displayBox.innerHTML.lastIndexOf(input_num.value);
        alert("The last position of indexOf("+ input_num.value +") is -->  "+result);
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function clickStartsWith(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert char or word...";
    }else{
        var result=displayBox.innerHTML.startsWith(input_num.value);
        
        if(result==true){
            alert("Your typing data starts with -> ( "+ input_num.value +" ) ");
        }else{
            alert("Your typing data not starts with ->( "+ input_num.value +" ) ");
        }
        input_num.value="";
        alert_type.innerHTML="";
    }  
}
function clickEndsWith(){
    testDisplaybox();
    if(input_num.value==""){
        alert_type.innerHTML="Please insert char or word...";
    }else{
        var result=displayBox.innerHTML.endsWith(input_num.value);
        
        if(result==true){
            alert("Your typing data ends with -> ( "+ input_num.value +" ) ");
        }else{
            alert("Your typing data not ends with ->( "+ input_num.value +" ) ");
        } 
        input_num.value="";
        alert_type.innerHTML="";
    }   
}
// End code for all function buttons


// Start code for keyboard Part

//when click keyboard key

function clickBtn(obj){
if(obj.innerHTML=="space"|| obj.innerHTML=="SPACE"){
    displayBox.innerHTML+=String.fromCharCode(32);
    console.log(displayBox.innerHTML);
}else{
    displayBox.innerHTML+=obj.innerHTML;
    console.log(displayBox.innerHTML);
}
}
//when click Clear key
function clearBtn(){
    displayBox.innerHTML="";
}
function clickTab(){
    displayBox.innerHTML+="\t";
    console.log(displayBox.innerHTML);
}
//when click Backspace key
function clickBackspace(){
  var str= displayBox.innerHTML;
//   var del=str.slice(0,str.length);
  var del=str.slice(0,str.length-1);
  displayBox.innerHTML=del;
  console.log(displayBox.innerHTML);

}

