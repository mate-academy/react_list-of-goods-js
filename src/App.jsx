import "bulma/css/bulma.css";
import "./App.scss";
import { useState } from "react";
import cn from "classnames";

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

const ALPHABETICAL = "alphabetical";
const BYLENGTH = "bylength";

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [status, setStatus] = useState({
    sort: "",
    isReversed: false,
  });

  const isModified = status.sort || status.isReversed;

  function sortAlphabetically() {
    setGoods((prevState) => {
      if (!status.isReversed) {
        return [...prevState].sort();
      }

      return [...prevState].sort((a, b) => b.localeCompare(a));
    });

    setStatus((prevState) => ({
      ...prevState,
      sort: ALPHABETICAL,
    }));
  }

  function sortByLength() {
    setGoods((prevState) => {
      if (!status.isReversed) {
        return [...prevState].sort((a, b) => a.length - b.length);
      }

      return [...prevState].sort((a, b) => b.length - a.length);
    });

    setStatus((prevState) => ({
      ...prevState,
      sort: BYLENGTH,
    }));
  }

  function reverseGoods() {
    setGoods((prevState) => [...prevState].reverse());
    setStatus((prevState) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  }

  function resetGoods() {
    setGoods(goodsFromServer);
    setStatus({
      sort: "",
      isReversed: false,
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button is-info", {
            "is-light": status.sort !== ALPHABETICAL,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", {
            "is-light": status.sort !== BYLENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button is-warning", {
            "is-light": !status.isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
