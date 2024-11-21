import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
// import { reverse } from 'cypress/types/lodash';

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

const SORT_GOODS_ALPHABETICALY = 'alphabetically';
const SORT_GOODS_LENGTH = 'length';
// const SORT_GOODS_REVERSE = 'reverse';

function getSortBy(goods, { sortGoods, reverse }) {
  const preparedGoods = [...goods];

  switch (sortGoods) {
    case SORT_GOODS_ALPHABETICALY:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_GOODS_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [reverse, setReverse] = useState(false);
  const visbleGoods = getSortBy(goodsFromServer, { sortGoods, reverse });

  const reset = () => {
    setSortGoods('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortGoods !== SORT_GOODS_ALPHABETICALY,
          })}
          onClick={() => setSortGoods(SORT_GOODS_ALPHABETICALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortGoods !== SORT_GOODS_LENGTH,
          })}
          onClick={() => setSortGoods(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {(sortGoods !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visbleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
