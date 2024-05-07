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

const SORT_BY_ALPHABETICALLY = 'ALPHABETICALLY';
const SORT_BY_LENGTH = 'LENGTH';

function getPrepareSort(goods, { sortedMethod, isRevers }) {
  const prepareGoods = [...goods];

  if (sortedMethod) {
    prepareGoods.sort((a, b) => {
      switch (sortedMethod) {
        case SORT_BY_ALPHABETICALLY:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isRevers) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortedMethod, setSortedMethod] = useState('');
  const [isRevers, setIsRevers] = useState(false);
  const visibleGoods = getPrepareSort(goodsFromServer, {
    sortedMethod,
    isRevers,
  });

  const reset = sortedMethod !== '' || isRevers === true;

  const onReset = () => {
    setSortedMethod('');
    setIsRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortedMethod === SORT_BY_ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => setSortedMethod(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedMethod === SORT_BY_LENGTH ? '' : ' is-light'}`}
          onClick={() => setSortedMethod(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isRevers ? '' : ' is-light'}`}
          onClick={() => setIsRevers(!isRevers)}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
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
