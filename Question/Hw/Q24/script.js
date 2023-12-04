/**  it executes only after the DOM has fully loaded.*/
$(document).ready(function () {
  let clickphoto;
  let clickname;
  let clickprice;
  let clickcode;
  let price;
  var codeArray = []; // Array to store added item
  let lastValidValue = 1; // Initialize with the default value
  /**
   * function is used to get what customer click & add order items in cart
   * @param {Event} e - It contains information about the click, such as the target element. 
   * @returns void
   */
  $(".card").click(function (e) {
    // to show cart when the user chooses an item
    $(".cart").slideDown(2000);
    console.log(e.currentTarget); //e.currentTarget.querySelector(".detail .pname").textContent;
    clickphoto = e.currentTarget.childNodes[1].childNodes[1].getAttribute("src");
    price =e.currentTarget.childNodes[1].childNodes[3].childNodes[0].textContent;
    clickprice = price.slice(3);
    clickname = e.currentTarget.childNodes[3].childNodes[1].childNodes[0].textContent;
    clickcode =e.currentTarget.childNodes[3].childNodes[3].childNodes[0].textContent;
    insertOrderItem(); //call insertOrder function
  });
  /**
   * function is used to insert customer order item in the cart
   */
  function insertOrderItem() {
    var multilineHTML = `
        <div class="items">
          <div id="pic"><img src="${clickphoto}" /></div>
          <div><span id="clothName">${clickname}</span><br/>(<span id="clothModel">${clickcode}</span>)</div>
          <div><input id="inputnum" type="number" value="1"></div> <span id="priceunit">${clickprice}</span>
          <ion-icon name="trash-outline" class="delete-item"></ion-icon>
        </div>`;

    // Check if the item already exists
    if (isCodeExists(clickcode)) {
      alert("This item is already in the Cart!");
    } else {
      codeArray.push(clickcode); // Add the item
      $("#orderItem").append(multilineHTML);
      updateGrandTotal(); // Update grand total when a new item is added
    }
  }

  /** Function to check if cloth's code already exists in the array
   * @param {*} clickcode
   * @returns true/false
   */
  function isCodeExists(clickcode) {
    return codeArray.includes(clickcode);
  }

  /** To check cloths between 1 and 9
   * @returns void
   */
  $("#orderItem").on("blur", "#inputnum", function () {
    let data = $(this).val();
    if (data > 0 && data < 10) {
      lastValidValue = data; // Update lastValidValue when the value is between 1 and 9
    } else {
      window.alert("Allow 1 to 9...");
      $(this).val(lastValidValue); // Set back to last value if the value is not between 1 and 9
    }
    // Recalculate grand total when item is increase or decrease
    updateGrandTotal();
  });

  /** To remove order item in the cart when the user clicks the delete icon */
  $("#orderItem").on("click", ".delete-item", function () {
    $(this).parent().remove(); // remove item from cart
    /** remove item from array */
    const deletedCode = $(this).parent().find("#clothModel").text(); // search clothModel in cart
    codeArray = codeArray.filter((code) => code !== deletedCode); // drop deleted item in array using filter

    //There is no order item , cart will slide up
    if (codeArray == 0) {
      $(".cart").slideUp(3000);
    }
    // Recalculate grand total when  item is deleted
    updateGrandTotal();
  });

  /** To get the delivery cost when change option from the select box and
   * recalculate total amount
   */
  $("#delivery").change(function () {
    updateGrandTotal();
  });

  /** Function to update the grand total */
  function updateGrandTotal() {
    let grandTotal = 0;
    let deliveryCost = parseInt($("#delivery").val());

    /**Calculate total for each item in the cart */
    $(".items").each(function () {
      let quantity = $(this).find("#inputnum").val();
      let unitPrice = parseInt($(this).find("#priceunit").text());
      let itemTotal = calculateItemTotal(quantity, unitPrice);
      grandTotal += itemTotal;
    });

    // Check if today is Saturday or Sunday between 9am to 5pm
    let today = new Date().getDay();
    let currentHour = new Date().getHours();
    if ((today === 0 || today === 6) && currentHour >= 9 && currentHour < 17) {
      $("#discounttitle").css("display", "block");
      // Apply 15% discount on Saturdays and Sundays
      let discountPercentage = 15;
      let discountAmount = (grandTotal * discountPercentage) / 100;
      let grandTotaldiscount = grandTotal - discountAmount;
      $("#discountprice").text("Ks " + grandTotaldiscount.toFixed(2));
      // Add delivery cost
      grandTotaldiscount += deliveryCost;
      // Update the HTML element with the discount grand total
      $("#grand").text("Ks " + grandTotaldiscount.toFixed(2));
    } else {
      // normal calculation on weekdays
      $("#discountprice").text("Ks " + grandTotal.toFixed(2));
      // Add delivery cost
      grandTotal += deliveryCost;
      // Update the HTML element with the grand total
      $("#grand").text("Ks " + grandTotal.toFixed(2));
    }
  }
  /** Function to calculate the total amount for a specific item
   * @param {number} quantity - The quantity of items.
   * @param {number} unitPrice - The unit price of each item.
   * @returns {number} - The total cost calculated by multiplying.
   */
  function calculateItemTotal(quantity, unitPrice) {
    return quantity * unitPrice;
  }

  /** When the user clicks the Place order button, this function will work
   * show reply info to the customer
   * @returns void
   */
  $("#order").click(function () {
    let username = $("#yourname").val();
    let address = $("#address").val();
    let phone = $("#phone").val();
    if (username == "") {
      window.alert("Please fill in your name...");
    } else if (address == "") {
      window.alert("Please fill in your address...");
    } else if (phone == "") {
      window.alert("Please fill in your phone...");
    } else {
      $("#orderdetail").css("display", "block");
    }
    $("#username").html(username);
    $("#useraddress").text(address);
    $("#userph").text(phone);
  });
});
  