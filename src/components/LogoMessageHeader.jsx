import { useCurrency } from "../context/CurrencyContext";

export function LogoMessageHeader() {
  const { error, choiceFrom, choiceTo } = useCurrency();
  const message = `${choiceFrom} to ${choiceTo} conversion`;

  return (
    <div className="logo_message">
      <h1>
        <span className="x">X</span>enit
      </h1>
      <p className="error_message" style={{ color: error ? "red" : "#ebebeb" }}>
        {error ? error : message ? message : "Currency converter"}
      </p>
      <h2 className="cur_conv"> Currency Converter</h2>
    </div>
  );
}
