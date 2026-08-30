import { useState } from "react";
import cn from "classnames";

import "bulma/css/bulma.css";
import "./App.scss";

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

export const App = () => {
  const [sortType, setSortType] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setSortType("alphabetically");
  };

  const sortByLength = () => {
    setSortType("length");
  };

  const reverseGoods = () => {
    setIsReversed((currentValue) => !currentValue);
  };

  const reset = () => {
    setSortType("");
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortType === "alphabetically") {
    visibleGoods.sort((first, second) => first.localeCompare(second));
  }

  if (sortType === "length") {
    visibleGoods.sort((first, second) => first.length - second.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button is-info", {
            "is-light": sortType !== "alphabetically",
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", {
            "is-light": sortType !== "length",
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button is-warning", {
            "is-light": !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType !== "" || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
