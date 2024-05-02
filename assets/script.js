const renderMessages = function (message, type) {
  const displayMessage = document.querySelector(".error_message");
  if (type === "error") {
    displayMessage.textContent = `Something went wrong. ${
      message.message === "Failed to fetch"
        ? "Please check your internet connection and try again."
        : `${message.message}, Try again!`
    }`;
    displayMessage.style.color = "red";
  } else {
    displayMessage.textContent = message;
    displayMessage.style.color = "#ebebeb";
  }
};

const getJSON = async function (url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Something went wrong ${response.status}`);
  return response.json();
};

const renderCurrencySymbols = async function (fromCurrency, toCurrency) {
  try {
    const data = await getJSON(`https://api.vatcomply.com/currencies`);

    document.querySelector(".currency_symbol_input").textContent =
      data[fromCurrency].symbol;
    document.querySelector(".currency_symbol_output").textContent =
      data[toCurrency].symbol;

    const checkSymbol = function (whereCurrency, whereSelector) {
      if (data[whereCurrency].symbol !== whereCurrency)
        document.querySelector(whereSelector).textContent =
          data[whereCurrency].symbol;
      else document.querySelector(whereSelector).textContent = "";
    };

    checkSymbol(fromCurrency, `.converted_from`);
    checkSymbol(toCurrency, `.converted_to`);
  } catch (error) {
    console.error(error.message);
    renderMessages(error, "error");
  }
};

const conversionFetch = async function (amount, fromCurrency, toCurrency) {
  try {
    const data = await Promise.all([
      getJSON(`https://api.vatcomply.com/rates?base=${fromCurrency}`),
      getJSON(`https://api.vatcomply.com/rates?base=${toCurrency}`),
    ]);

    const [_from, dataFrom] = data.map((d) => d.rates[fromCurrency]);
    const [dataTo, _to] = data.map((d) => d.rates[toCurrency]);

    if (!dataFrom || !dataTo) throw new Error("Unable to retrieve data");
    const convertedRateFrom = amount * dataTo;
    const convertedRateTo = amount * dataFrom;
    document.querySelector(".to_country_output").value =
      convertedRateFrom.toFixed(2);
    document.querySelector(
      ".converted_value"
    ).textContent = `${convertedRateFrom.toFixed(4)} ${toCurrency}`;
    document.querySelector(
      ".inverted_from"
    ).textContent = `${amount} ${toCurrency}`;
    document.querySelector(
      ".inverted_to"
    ).textContent = `${convertedRateTo.toFixed(4)} ${fromCurrency}`;
  } catch (error) {
    console.error(error.message);
    renderMessages(error, "error");
  }
  document.querySelector(
    ".from_value"
  ).textContent = `${amount} ${fromCurrency}`;
};

const getCountriesAndValue = function () {
  const select1 = document.querySelector("#select_1");
  const select2 = document.querySelector("#select_2");
  const fromInput = document.querySelector(".from_country_input").value;

  renderCurrencySymbols(select1.value, select2.value);
  renderMessages(
    `${select1[select1.selectedIndex].text} to ${
      select2[select2.selectedIndex].text
    }`,
    "conversion"
  );
  if (select1.value === select2.value) {
    if (select2.selectedIndex !== 0) {
      select2.selectedIndex -= 1;
    } else {
      select1.selectedIndex += 1;
    }
  }

  if (fromInput && select1.value !== select2.value)
    conversionFetch(fromInput, select1.value, select2.value);
};

getCountriesAndValue();

document
  .querySelector(".from_country_input")
  .addEventListener("input", function () {
    getCountriesAndValue();
  });

document.querySelectorAll(".select_options").forEach(function (el) {
  el.addEventListener("change", function () {
    getCountriesAndValue();
  });
});
