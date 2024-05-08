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

const SORT_BY_NAME = 'name';
const SORT_BY_LENTGH = 'length';

function sorting(goods, { sortValue, isRevers }) {
  const preparedGoods = [...goods];

  if (sortValue) {
    preparedGoods.sort((good1, good2) => {
      switch (sortValue) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);
        case SORT_BY_LENTGH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isRevers) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isRevers, setIsRevers] = useState(false);
  const visibledGoods = sorting(goodsFromServer, { sortValue, isRevers });

  const reset = sortValue !== '' || isRevers === true;

  const onReset = () => {
    setSortValue('');
    setIsRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortValue === SORT_BY_NAME
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortValue(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortValue === SORT_BY_LENTGH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortValue(SORT_BY_LENTGH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isRevers ? '' : ' is-light'}`}
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
        {visibledGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
