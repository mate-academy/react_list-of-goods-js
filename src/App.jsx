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

const SORT_BY_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

const applySorting = (goodsSort, { goods, reversed }) => {
  const sortedGoods = [...goodsSort];

  if (!goodsFromServer) {
    return 0;
  }

  if (goods) {
    switch (goods) {
      case SORT_BY_ALPHABETICALLY:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_BY_LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [goodsBy, setGoodsBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = applySorting(goodsFromServer, {
    goods: goodsBy,
    reversed: isReversed,
  });

  const resetList = () => {
    setIsReversed(false);
    setGoodsBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${goodsBy === SORT_BY_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setGoodsBy(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${goodsBy === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setGoodsBy(SORT_BY_LENGTH)}
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

        {(goodsBy || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetList}
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
