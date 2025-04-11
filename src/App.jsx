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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function sortGoodsByState(goods, { stateGoods, reverse }) {
  const goodsCopy = [...goods];

  switch (stateGoods) {
    case SORT_ALPHABETICALLY:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      return goodsCopy;
  }

  if (reverse) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoodsByState(goodsFromServer, {
    stateGoods: sortGoods,
    reverse,
  });

  const handleReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortGoods(SORT_ALPHABETICALLY)}
          type="button"
          className={
            sortGoods === SORT_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortGoods(SORT_BY_LENGTH)}
          type="button"
          className={
            sortGoods === SORT_BY_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={reverse ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {sortGoods && (
          <button
            onClick={() => {
              setSortGoods('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
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
