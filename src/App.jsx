import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_ABC = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function changeActualGoods(actualGoods, { sortGoods, reverse }) {
  const preparedGoods = [...actualGoods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SORT_BY_ABC:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [reverse, setReverse] = useState(false);
  const actualGoods = changeActualGoods(
    goodsFromServer, { sortGoods, reverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortGoods !== SORT_BY_ABC })
          }
          onClick={() => setSortGoods(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', {
              'is-light': sortGoods !== SORT_BY_LENGTH,
            })
          }
          onClick={() => setSortGoods(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', { 'is-light': reverse !== true })
          }
          onClick={() => (reverse === false
            ? setReverse(true)
            : setReverse(false))
          }
        >
          Reverse
        </button>

        {JSON.stringify(actualGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortGoods('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {actualGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
