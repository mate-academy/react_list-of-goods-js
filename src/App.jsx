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

function getSortedGoods(goods, sortType, reversedFlag) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case 'alphabetically':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversedFlag) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType('alphabetically')}
          type="button"
          className={
            sortType === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType('length')}
          type="button"
          className={
            sortType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {sortType || reversed ? (
          <button
            onClick={() => {
              setSortType('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {getSortedGoods(goodsFromServer, sortType, reversed).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
