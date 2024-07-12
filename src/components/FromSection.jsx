import { useCurrency } from "../context/CurrencyContext";
import { Options } from "./Options";

export function FromSection() {
  const { choiceFrom, choices, dispatch, input, symbol } = useCurrency();

  return (
    <div className="from_section">
      <div className="from_input">
        <p>
          <span className="currency_symbol_input">{symbol}</span>
          <input
            type="number"
            className="from_country_input"
            value={input}
            onChange={(e) =>
              dispatch({ type: "inputValue", payload: e.target.value })
            }
          />
        </p>
      </div>

      <select
        id="select_1"
        className="select_options"
        value={choiceFrom}
        onChange={(e) =>
          dispatch({ type: "choiceOne", payload: e.target.value })
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
  );
}
