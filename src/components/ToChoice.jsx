import { useCurrency } from "../context/CurrencyContext";
import { Options } from "./Options";

export function ToChoice() {
  const { choices, choiceTo, dispatch, convertedShort, symbolTo } =
    useCurrency();

  return (
    <>
      <label className="to_label">TO:</label>
      <div className="to_section">
        <p>
          <span className="currency_symbol_output">{symbolTo}</span>
          <input
            type="number"
            className="to_country_output"
            defaultValue={convertedShort}
          />
        </p>
        <select
          id="select_2"
          className="select_options"
          value={choiceTo}
          onChange={(e) =>
            dispatch({ type: "choiceTwo", payload: e.target.value })
          }
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
