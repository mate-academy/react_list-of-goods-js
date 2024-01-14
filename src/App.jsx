import "bulma/css/bulma.css";
import "./App.scss";
import { useState } from "react";
import classNames from "classnames";

export const goodsFromServer = [
  "Dumplings",
  "Carrot",
  "Eggs",
  "Ice cream",
  "Apple",
  "Bread",
  "Fish",
  "Honey",
  "Jam",
  "Garlic",
];

const LENGTH = "length";
const ALPHABET = "alphabet";

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case ALPHABET:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return 0;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState("");

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames("button", "is-info", {
            "is-light": sortField !== ALPHABET,
          })}
          onClick={(event) => {
            setSortField(ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames("button", "is-success", {
            "is-light": sortField !== LENGTH,
          })}
          onClick={() => {
            setSortField(LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames("button", "is-warning", {
            "is-light": isReversed === false,
          })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className={classNames("button", "is-danger", "is-light")}
            onClick={() => {
              setSortField("");
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
