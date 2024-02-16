$(document).ready(function () {
    
    /** function for Registiration Process , when user click Reg btn */
    $("#btnRegister").click(()=>{
        let regUsername = $("#regUsername").val();
        let regEmail = $("#regEmail").val();
        let regPassword = $("#regPassword").val();
  
        if (regUsername === "" || regEmail === "" || regPassword === "") {
          console.log("Some fields require!, Can't Register");
        } else {
          // Check if the username is not already registered
          if (!localStorage.getItem(regUsername)) {
            // Store registration data in local storage -- stored by JsonPattern
            localStorage.setItem(regUsername, JSON.stringify({ email: regEmail, password: regPassword }));
            alert("Registration successful!");
            window.location.href = "../index.html";
          } else {
            alert("Username is already taken. Choose a different one.");          
          }
          $("#regUsername").val("");
          $("#regEmail").val("");
          $("#regPassword").val("");
        }
    });

     /** function for login Process , when user click login btn */
     $("#btnLogin").click(()=>{
        let loginUsername = $("#loginUsername").val();
        let loginPassword = $("#loginPassword").val();
  
        // Retrieve user data from local storage
        var userData = localStorage.getItem(loginUsername); // get string data
  
        if (userData) {
          // change string Data to Obj type -->easy to check condition
          userData = JSON.parse(userData); 
          // Check if the user typed password matches the stored password
          if (userData.password === loginPassword) {
            alert("Login successful!");
            window.location.href = "../index.html";
          } else {
            alert("Incorrect password. Please try again.");
           
          }
        } else {
          alert("User not found. Please register first.");
         
        }

        $("#loginPassword").val("");
        $("#loginUsername").val("");

     });
   /** function for click link */
    $(".loginLink").click(()=>{
      $(".loginform").css("display","block");
      $(".registration").css("display","none");
    });

    $(".regLink").click(()=>{
        $(".loginform").css("display","none");
        $(".registration").css("display","block");   
    });
     /** function for close icon */
    $(".closeIcon").click(()=>{
        $(".myForm").css("display","none");
    });
   

});