
let toCurrency = document.getElementById("toCurrency");
let convertedAmountTxt = document.getElementById("convertedAmount");
let userInput = document.getElementById("userInput");
let flagImg = document.getElementById("flagImg");

getData();
// function for get JSON data 
async function getData() {
  const url = " https://v6.exchangerate-api.com/v6/a90e623b740ebe6529b62ff5/latest/USD";
  let datafromJson = "";
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      datafromJson = data; // data is js object
    })
    .catch((err) => console.log(err));
   
  /**function for insert country in select box */
    let countryrates = datafromJson.conversion_rates; //  object include countrycode & rates {MMK:2095.5622}
    for (const key in countryrates) {
      key == "USD"
        ? (toCurrency.innerHTML = "")
        : (toCurrency.innerHTML += `<option value="${key}">${key}</option>`);
    }
  /** calculate convertedAmount for every country */
  userInput.addEventListener("input", () => {
    let amount = Number(userInput.value);
    //  if  user put empty value or 0
    if (amount == 0) {
      amount = 1;
    }
    if (amount > 0) {
      let exchangeRate = countryrates[toCurrency.value]; // 2095.5622 for MMK
      let convertedAmount = (amount * exchangeRate).toFixed(2);
      convertedAmount=Number(convertedAmount).toLocaleString(); // use Thousand Separator
      convertedAmountTxt.innerHTML = `${amount.toLocaleString()} USD = ${convertedAmount} ${toCurrency.value}`;
    } else {
      convertedAmountTxt.innerHTML = "Please Enter valid value";
    }
  });
}
// this function is to change flag icons
let changeflag= _ =>{
  toCurrency.addEventListener("change", function () {
    let flagCode = toCurrency.value.slice(0, 2); // flag icon need 2 char (USD->US)
    flagImg.src = `https://flagsapi.com/${flagCode}/flat/64.png`;
  });
}
changeflag();

