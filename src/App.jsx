import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const [goodsList, setGoodsList] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = (type, reversed = false) => {
    const sorted = [...goodsFromServer];

    switch (type) {
      case 'alphabet':
        sorted.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        sorted.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (reversed) {
      sorted.reverse();
    }

    setGoodsList(sorted);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : ' is-light'}`}
          onClick={() => {
            setSortType('alphabet');
            applySorting('alphabet', isReversed);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === 'length' ? '' : ' is-light'}`}
          onClick={() => {
            setSortType('length');
            applySorting('length', isReversed);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : ' is-light'}`}
          onClick={() => {
            const newReversed = !isReversed;

            setIsReversed(newReversed);

            if (sortType === null) {
              const base = [...goodsFromServer];

              setGoodsList(newReversed ? base.reverse() : base);
            } else {
              applySorting(sortType, newReversed);
            }
          }}
        >
          Reverse
        </button>

        {!(sortType === null && isReversed === false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoodsList([...goodsFromServer]);
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
