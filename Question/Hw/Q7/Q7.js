function calculate() {
    // Get the user's input 
    var firstNumber = parseFloat(document.getElementById('firstNumber').value);
    var secondNumber = parseFloat(document.getElementById('secondNumber').value);
    var operator = document.getElementById('operator').value;
    
    // Get the output div 
    var outputDiv = document.getElementById("output");
    
    // Clear output
    outputDiv.innerHTML = " ";
  
    // Make calculation 
    var result;
    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === '-') {
        result = firstNumber - secondNumber;
    } else if (operator === '*') {
        result = firstNumber * secondNumber;
    } else if (operator === '/') {
        result = firstNumber / secondNumber;
    } else {
        result = 'Invalid operator';
    }
  
    // Show result
    outputDiv.innerHTML = result;
  }
  
  function show() {
    // Get the user's input
    var multiplyNumber = parseInt(document.getElementById('multiplyNumber').value);
    var times = parseInt(document.getElementById('times').value);
    
    // Get div for output
    var outputDiv = document.getElementById('outputMultiply');
    
    // Clear output
    outputDiv.innerHTML = '';
  
  // Process multiplication 
  
        var outputForHTML = " ";
        for (var i = 1; i <= times; i++) {
            var result = multiplyNumber * i;
            outputForHTML += multiplyNumber + "x" + i + "=" + result + "<br/><br/>";
        }
         // Show result
        outputDiv.innerHTML = outputForHTML;
  
    
  }
  