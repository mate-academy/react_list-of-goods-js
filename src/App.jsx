import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const classname = condition => (!condition ? 'is-light' : '');

  const [sortAlphaber, setSortAlphabet] = useState(false);
  const [checkSortLength, setCheckSortLength] = useState(false);
  const [checkReverse, setCheckReverse] = useState(false);

  let showBtn = false;
  const visiblegoods = [...goodsFromServer];

  if (sortAlphaber) {
    visiblegoods.sort();
    showBtn = true;
  }

  if (checkSortLength) {
    visiblegoods.sort((goods1, goods2) => goods1.length - goods2.length);
    showBtn = true;
  }

  if (checkReverse) {
    visiblegoods.reverse();
    showBtn = true;
  }

  const sortByAlphabet = () => {
    setSortAlphabet(true);

    setCheckSortLength(false);
  };

  const sortByLength = () => {
    setSortAlphabet(false);
    setCheckSortLength(true);
  };

  const reversedGoods = () => {
    setCheckReverse(!checkReverse);
  };

  const removeState = () => {
    setSortAlphabet(false);
    setCheckSortLength(false);
    setCheckReverse(false);
    showBtn = false;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classname(sortAlphaber)} `}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${classname(checkSortLength)}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${classname(checkReverse)}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>
        {showBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={removeState}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiblegoods.map((good, index) => {
          const uniqueKey = `${index} - ${Math.floor(Math.random * goodsFromServer.length)}`;

          return (
            <li key={uniqueKey} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
