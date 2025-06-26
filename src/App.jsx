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

function GoodsList({ goods }) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function sortGoods(goodsItems, { sort, reversed }) {
    const goods = [...goodsItems];

    if (sort === SORT_BY_ALPHABET) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sort === SORT_BY_LENGTH) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      return goods.reverse();
    }

    return goods;
  }

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const sortedGoods = sortGoods(goodsFromServer, { sort: sortBy, reversed: isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={sortedGoods} />
    </div>
  );
};
