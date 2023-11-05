function press(obj) {
    var x = "";
    if (document.getElementById('check').checked) {
        x = obj.innerHTML.toUpperCase()
    } else {
        x = obj.innerHTML.toLowerCase()
    }

    document.getElementById("showbox").innerHTML += x;
}

function cleartext() {
    document.getElementById("showbox").innerHTML = "";
}


function charAt() {
    var x = document.getElementById("showbox").innerHTML;
    var index = document.getElementById("number").value;
    alert(x.charAt(index))
}

function charCodeAt() {
    var x = document.getElementById("showbox").innerHTML;
    var index = document.getElementById("number").value;
    alert(x.charCodeAt(index))
}



function Print() {
    window.print();
}