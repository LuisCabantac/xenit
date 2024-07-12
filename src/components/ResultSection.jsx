import { useCurrency } from "../context/CurrencyContext";

export function ResultSection() {
  const {
    choiceFrom,
    choiceTo,
    input,
    symbolFrom,
    symbolTo,
    convertedLong,
    convertedInverted,
  } = useCurrency();

  return (
    <div className="converted_results">
      <p className="converted_result">
        <span className="converted_from">{symbolFrom}</span>
        <span className="from_value"></span>
        {input} {choiceFrom} =
      </p>
      <p className="converted_all">
        <span className="converted_to">{symbolTo}</span>
        <span className="converted_value">
          {convertedLong} {choiceTo}
        </span>
      </p>
      <p className="inverted_conversion">
        <span className="inverted_from"></span>
        <span className="inverted_from_value"></span>
        {input} {choiceFrom} ={" "}
        <span className="inverted_to">
          {convertedInverted} {choiceFrom}
        </span>
      </p>
    </div>
  );
}
