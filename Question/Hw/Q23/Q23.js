
insertDynamicData();// start function

  async function insertDynamicData() {
    let result = "";
    await fetch("http://localhost:3001/api/userinfo") //to get JSON obj
      .then((res) => res.json())
      .then((data) => {
        result = data; //JSON data object
      })
      .catch((err) => console.log(err));

    // Get the userinfo element
    var userinfo = document.getElementById("userinfo");
    // Insert HTML elements recursively
    insertHTML(result.body, userinfo);

    // Function to insert HTML 
    function insertHTML(elementData, parentElement) {
      var element = createHTMLElement(elementData);
      parentElement.appendChild(element);//to create child element
    }

    // Function to create HTML elements recursively
    function createHTMLElement(elementData) {
      var element = document.createElement(elementData.element);

      // Set element styles
      if (elementData.style) {
        element.setAttribute("style", elementData.style);
      }

      // Set element text content
      if (elementData.text) {
        element.innerText = elementData.text;
      }

      // Set element attributes (e.g., src for img)
      if (elementData.src) {
        element.setAttribute("src", elementData.src);
      }

      // Recursively create child elements
      if (elementData.child && elementData.child.length > 0) {
        elementData.child.forEach(myFun); //array.forEach
        function myFun (childData) {
          var childElement = createHTMLElement(childData);
          element.appendChild(childElement);
        }
      }
      return element;
    }
  }
  /** $(document).ready(function () {
    $(selector).text("hello");
    $(a).css("color", "red");
    $("#a").attr("style", "font-size: x-large;color: green;");
    $("#myList").append("<li>jQuery</li>")
  });*/
