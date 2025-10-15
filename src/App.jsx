import 'bulma/css/bulma.css';
import './App.scss';
import classN from 'classnames';
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

function prepareGoods(
  goods,
  { sortByAlphabet, sortByLength, reverseOrder } = {},
) {
  const preparedGoods = [...goods];

  if (sortByAlphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortByLength) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);
  const [reverseOrder, setReverse] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, {
    sortByAlphabet,
    sortByLength,
    reverseOrder,
  });

  function handleSortByAlphabet() {
    setSortByAlphabet(prev => !prev);
    setSortByLength(false);
  }

  function handleSortByLength() {
    setSortByLength(prev => !prev);
    setSortByAlphabet(false);
  }

  function handleReverse() {
    setReverse(prev => !prev);
  }

  function resetSorting() {
    setSortByAlphabet(false);
    setSortByLength(false);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortByAlphabet}
          className={classN('button', 'is-info', {
            'is-light': !sortByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={classN('button', 'is-info', { 'is-light': !sortByLength })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classN('button', 'is-warning', {
            'is-light': !reverseOrder,
          })}
        >
          Reverse
        </button>

        {(sortByAlphabet || sortByLength || reverseOrder) && (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
