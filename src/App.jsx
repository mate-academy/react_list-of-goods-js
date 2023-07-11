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
const SORT_LENGTH = 'length';
const SORT_ALPHABET = 'alphabetically';

function getPreparedGoods(goods, { sortType, reverse }) {
  const prepared = [...goods];

  if (sortType) {
    prepared.sort((good1, good2) => {
      switch (sortType) {
        case SORT_LENGTH:
          return good1.length - good2.length;

        case SORT_ALPHABET:
          return good1.localeCompare(good2);

        default:
          throw new Error('Sorting went wrong...');
      }
    });
  }

  if (reverse) {
    prepared.reverse();
  }

  return prepared;
}

export const App = () => {
  const [sortType, setsortType] = useState('');
  const [reverse, setReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortType, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SORT_ALPHABET && 'is-light'}`}
          onClick={() => setsortType(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SORT_LENGTH && 'is-light'}`}
          onClick={() => setsortType(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setsortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
