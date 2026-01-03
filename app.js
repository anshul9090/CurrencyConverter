// ======================
// CONFIGURATION
// ======================
const API_KEY = "fca_live_Pm38nJl5o2CDmk47mnI55BhJtf6NF2vZdAjRD0zo"; // replace with your FreeCurrencyAPI key
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// ======================
// POPULATE DROPDOWNS
// ======================
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// ======================
// FETCH EXCHANGE RATE
// ======================
const updateExchangeRate = async () => {
  let amount = parseFloat(document.querySelector(".amount input").value) || 1;

  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch API");

    const data = await response.json();
    const rate = data.data[toCurr.value];

    if (!rate) throw new Error("Currency not available");

    const converted = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${converted} ${toCurr.value}`;
  } catch (err) {
    console.error(err);
    msg.innerText = "Error fetching exchange rate";
  }
};

// ======================
// UPDATE FLAG IMAGE
// ======================
const updateFlag = (element) => {
  const code = element.value;
  const countryCode = countryList[code];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// ======================
// EVENT LISTENERS
// ======================
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
