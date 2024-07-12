import { useCurrency } from "../context/CurrencyContext";

export function LogoMessageHeader() {
  const { error, choiceFrom, choiceTo } = useCurrency();
  const message = `${choiceFrom} to ${choiceTo} conversion`;

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
