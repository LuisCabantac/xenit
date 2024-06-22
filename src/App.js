import { useEffect, useState } from "react";

const choices = [
  { id: "AU", value: "AUD", text: "Australian Dollar" },
  { id: "BG", value: "BGN", text: "Bulgarian Lev" },
  { id: "BR", value: "BRL", text: "Brazilian Real" },
  { id: "CA", value: "CAD", text: "Canadian Dollar" },
  { id: "CH", value: "CHF", text: "Swiss Franc" },
  { id: "CN", value: "CNY", text: "Chinese Renminbi Yuan" },
  { id: "CZ", value: "CZK", text: "Czech Koruna" },
  { id: "DK", value: "DKK", text: "Danish Krone" },
  { id: "EU", value: "EUR", text: "Euro" },
  { id: "GB", value: "GBP", text: "British Pound" },
  { id: "HK", value: "HKD", text: "Hong Kong Dollar" },
  { id: "HU", value: "HUF", text: "Hungarian Forint" },
  { id: "ID", value: "IDR", text: "Indonesian Rupiah" },
  { id: "IL", value: "ILS", text: "Israeli New Sheqel" },
  { id: "IN", value: "INR", text: "Indian Rupee" },
  { id: "IS", value: "ISK", text: "Icelandic Króna" },
  { id: "JP", value: "JPY", text: "Japanese Yen" },
  { id: "KR", value: "KRW", text: "South Korean Won" },
  { id: "MX", value: "MXN", text: "Mexican Peso" },
  { id: "MY", value: "MYR", text: "Malaysian Ringgit" },
  { id: "NO", value: "NOK", text: "Norwegian Krone" },
  { id: "NZ", value: "NZD", text: "New Zealand Dollar" },
  { id: "PH", value: "PHP", text: "Philippine Peso" },
  { id: "PL", value: "PLN", text: "Polish Złoty" },
  { id: "RO", value: "RON", text: "Romanian Leu" },
  { id: "SE", value: "SEK", text: "Swedish Krona" },
  { id: "SG", value: "SGD", text: "Singapore Dollar" },
  { id: "TH", value: "THB", text: "Thai Baht" },
  { id: "TR", value: "TRY", text: "Turkish Lira" },
  { id: "US", value: "USD", text: "United States Dollar" },
  { id: "ZA", value: "ZAR", text: "South African Rand" },
];

function App() {
  const [choiceFrom, setChoiceFrom] = useState("EUR");
  const [choiceTo, setChoiceTo] = useState("USD");
  const [input, setInput] = useState("1.00");
  const [convertedShort, setConvertedShort] = useState("");
  const [convertedLong, setConvertedLong] = useState("");
  const [convertedInverted, setConvertedInverted] = useState("");
  const [error, setError] = useState("");
  const [symbolFrom, setSymbolFrom] = useState("$");
  const [symbolTo, setSymbolTo] = useState("€");

  async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Something went wrong ${response.status}`);
    else {
      try {
        return await response.json();
      } catch (error) {
        throw new Error(`Error parsing JSON: ${error.message}`);
      }
    }
  }

  useEffect(
    function () {
      async function currencyFetch() {
        try {
          const data = await Promise.all([
            getJSON(`https://api.vatcomply.com/rates?base=${choiceFrom}`),
            getJSON(`https://api.vatcomply.com/rates?base=${choiceTo}`),
          ]);

          const [_from, dataFrom] = data.map((d) => d.rates[choiceFrom]);
          const [dataTo, _to] = data.map((d) => d.rates[choiceTo]);

          if (!dataFrom || !dataTo) throw new Error("Unable to retrieve data");
          setConvertedLong((input * dataTo).toFixed(4));
          setConvertedShort((input * dataTo).toFixed(2));
          setConvertedInverted((input * dataFrom).toFixed(4));
        } catch (error) {
          console.error(error.message);
          setError(
            `Something went wrong. ${
              error.message === "Failed to fetch"
                ? "Please check your internet connection and try again."
                : `${error.message}, Try again!`
            }`
          );
        }
      }
      currencyFetch();
    },
    [choiceFrom, choiceTo, input]
  );

  useEffect(
    function () {
      const renderCurrencySymbols = async function () {
        try {
          const data = await getJSON(`https://api.vatcomply.com/currencies`);
          setSymbolFrom(data[choiceFrom].symbol);
          setSymbolTo(data[choiceTo].symbol);
        } catch (error) {
          console.error(error.message);
        }
      };
      renderCurrencySymbols();
    },
    [choiceFrom, choiceTo]
  );

  return (
    <div className="container">
      <LogoMessageHeader
        error={error}
        message={`${choiceFrom} to ${choiceTo} conversion`}
      />
      <main className="conversion_section">
        <Labels />
        <div className="main_content">
          <FromSection
            value={choiceFrom}
            onChoiceFrom={setChoiceFrom}
            input={input}
            onInput={setInput}
            symbol={symbolFrom}
          />
          <ToChoice
            value={choiceTo}
            onChoiceTo={setChoiceTo}
            output={convertedShort}
            symbol={symbolTo}
          />
        </div>
        <ResultSection
          from={choiceFrom}
          to={choiceTo}
          input={input}
          symbolFrom={symbolFrom}
          symbolTo={symbolTo}
          convertedFromLong={convertedLong}
          inverted={convertedInverted}
        />
      </main>
      <Footer />
    </div>
  );
}

function LogoMessageHeader({ error, message }) {
  return (
    <div className="logo_message">
      <h1>
        <span className="x">X</span>enit
        <span className="cur_conv"> Currency Converter</span>
      </h1>
      <p className="error_message" style={{ color: error ? "red" : "#ebebeb" }}>
        {error ? error : message ? message : "Currency converter"}
      </p>
    </div>
  );
}

function Labels() {
  return (
    <div className="labels">
      <label htmlFor="from_country_input">AMOUNT:</label>
      <label htmlFor="select_2" className="from_label">
        TO:
      </label>
    </div>
  );
}

function FromSection({ value, onChoiceFrom, input, onInput, symbol }) {
  return (
    <div className="from_section">
      <div className="from_input">
        <p>
          <span className="currency_symbol_input">{symbol}</span>
          <input
            type="number"
            className="from_country_input"
            value={input}
            onChange={(e) => onInput(e.target.value)}
          />
        </p>
      </div>

      <select
        id="select_1"
        className="select_options"
        value={value}
        onChange={(e) => onChoiceFrom(e.target.value)}
      >
        {choices.map((choice) => (
          <Options
            id={choice.id}
            value={choice.value}
            text={choice.text}
            key={choice.id}
          />
        ))}
      </select>
    </div>
  );
}

function ToChoice({ value, onChoiceTo, output, symbol }) {
  return (
    <>
      <label className="to_label">TO:</label>
      <div className="to_section">
        <p>
          <span className="currency_symbol_output">{symbol}</span>
          <input
            type="number"
            className="to_country_output"
            defaultValue={output}
          />
        </p>
        <select
          id="select_2"
          className="select_options"
          value={value}
          onChange={(e) => onChoiceTo(e.target.value)}
        >
          {choices.map((choice) => (
            <Options
              id={choice.id}
              value={choice.value}
              text={choice.text}
              key={choice.id}
            />
          ))}
        </select>
      </div>
    </>
  );
}

function Options({ id, value, text }) {
  return (
    <option id={id} value={value}>
      {text}
    </option>
  );
}

function ResultSection({
  from,
  to,
  input,
  symbolFrom,
  symbolTo,
  convertedFromLong,
  inverted,
}) {
  return (
    <div className="converted_results">
      <p className="converted_result">
        <span className="converted_from">{symbolFrom}</span>
        <span className="from_value"></span>
        {input} {from} =
      </p>
      <p className="converted_all">
        <span className="converted_to">{symbolTo}</span>
        <span className="converted_value">
          {convertedFromLong} {to}
        </span>
      </p>
      <p className="inverted_conversion">
        <span className="inverted_from"></span>
        <span className="inverted_from_value"></span>
        {input} {to} ={" "}
        <span className="inverted_to">
          {inverted} {from}
        </span>
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        <a
          href="https://github.com/LuisCabantac/xenit"
          target="_blank"
          rel="noreferrer"
        >
          &copy; 2024 Luis Cabantac
        </a>
      </p>
    </footer>
  );
}

export default App;
