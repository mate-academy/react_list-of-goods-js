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

function getPreparedGoods(visibleGoods, { sortField }) {
  const goods = [...visibleGoods];

  if (sortField) {
    switch (sortField) {
      case ALPHABET:
        return goods.sort((good1, good2) => good1.localeCompare(good2));
      case LENGTH:
        return goods.sort((good1, good2) => good1.length - good2.length);
      case REVERSE:
        return goods.reverse();
      default:
        return 0;
    }
  }

  return visibleGoods;
}

const LENGTH = "length";
const ALPHABET = "alphabet";
const REVERSE = "reverse";

export const App = () => {
  const [isReverse, setReverse] = useState(false);
  const [sortField, setSortField] = useState("");

  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

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
            "is-light": isReverse === false,
          })}
          onClick={() => {
            setReverse(!isReverse);
            setSortField(REVERSE);
          }}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            type="button"
            className={classNames("button", "is-danger", "is-light")}
            onClick={() => {
              setSortField("");
            }}
          >
            Reset
          </button>
        )}
      </div>
      {visibleGoods.map((good) => (
        <ul key={good}>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
