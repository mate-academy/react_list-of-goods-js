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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== 'alphabet' ? 'is-light' : ''
          }`}
          onClick={() => {
            // prettier-ignore
            const sorted = [...goodsFromServer].sort((a, b) =>
              a.localeCompare(b))

            if (isReversed) {
              sorted.reverse();
            }

            setVisibleGoods(sorted);
            setSortType('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== 'length' ? 'is-light' : ''
          }`}
          onClick={() => {
            const sorted = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            if (isReversed) {
              sorted.reverse();
            }

            setVisibleGoods(sorted);
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => {
            setVisibleGoods(prev => [...prev].reverse());
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortType !== 'none' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setVisibleGoods(goodsFromServer);
              setSortType('none');
              setIsReversed(false);
            }}
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
