/**  it executes only after the DOM has fully loaded.*/
$(document).ready(function () {

  initLoad();
  /**this function will work when the page is first loaded */
  function initLoad() {
    let mode = localStorage.getItem("mode");
    if (mode == "dark") {
      darkTheme();
    } else {
      lightTheme();
    }
    insertData();//call function to insert data
  }

    /** function for changing dark mode and light mode */
    $("#mode").click(function () {
      let mode = $("#mode").find("ion-icon").attr("name");
      if (mode == "moon-sharp") {
        localStorage.setItem("mode", "dark");
        darkTheme();// to change dark mode
      } else {
        localStorage.setItem("mode", "light");
        lightTheme(); // to change light mode
      }
    });
 /** when save btn, it will update new data in local storage */
  $("#btnSave").click(function(){
    let position = $(".position").val();
    let fb = $(".fb").val();
    let ig = $(".ig").val();
    let language = $(".lang").val();
    let address = $(".address").val();
    localStorage.setItem("position", position);
    localStorage.setItem("fb", fb);
    localStorage.setItem("ig", ig);
    localStorage.setItem("language", language);
    localStorage.setItem("address", address);
  });

  /** this function is used for dark theme moon-sharp*/
  function darkTheme() {
    $("#mode").find("ion-icon").attr("name", "sunny-sharp");
    $("body").css("background-color", "black");
    $(".container").css("background-color", "gray");
    $("#contact input,#contact div").css({
      "background-color": "black",
      color: "white",
      transition: "all 1.5s linear 0s",
    });
    $("body").css("transition", "all 1.5s linear 0s");
  }
  /** this function is used for light theme */
  function lightTheme() {
    $("#mode").find("ion-icon").attr("name", "moon-sharp");
    $("body").css("background-color", "white");
    $(".container").css("background-color", "lightblue");
    $("#contact input,#contact div").css({
      "background-color": "white",
      color: "black",
      transition: "all 1.5s linear 0s",
    });
    $("body").css("transition", "all 1.5s linear 0s");
  }
    /** this function is used to insert data which stored in browser */
  function insertData() {
    let position = localStorage.getItem("position");
    let fb = localStorage.getItem("fb");
    let ig = localStorage.getItem("ig");
    let language = localStorage.getItem("language");
    let address = localStorage.getItem("address");
    $(".position").val(position);
    $(".fb").val(fb);
    $(".ig").val(ig);
    $(".language").val(language);
    $(".address").val(address);
  }
});
