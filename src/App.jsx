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
const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortParameter) {
  if (sortParameter) {
    goods.sort((a, b) => {
      switch (sortParameter) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  return goods;
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortParameter, setSortParameter] = useState('');

  const goods = getPreparedGoods([...goodsFromServer], sortParameter);

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortParameter(SORT_BY_ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortParameter !== SORT_BY_ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortParameter(SORT_BY_LENGTH);
          }}
          type="button"
          className={`button is-success ${sortParameter !== SORT_BY_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>
        {(sortParameter || isReversed) && (
          <button
            onClick={() => {
              setSortParameter('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good.name} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
