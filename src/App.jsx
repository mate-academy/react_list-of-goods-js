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

const sortValue = {
  alphabet: 'alphabet',
  length: 'length',
};

function prepareGoods(goods, sortBy, isReversed) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortBy) {
        case sortValue.alphabet:
          return goods1.localeCompare(goods2);
        case sortValue.length:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === sortValue.alphabet ? '' : 'is-light'}`}
          onClick={() => setSortBy(sortValue.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === sortValue.length ? '' : 'is-light'}`}
          onClick={() => setSortBy(sortValue.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
