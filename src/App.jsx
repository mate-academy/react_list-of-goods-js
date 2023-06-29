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

const SORT_GOODS_LENGTH = 'length';
const SORT_GOODS_ALPHABETICALLY = 'alphabetically';

function sortGoods(goods, { sort }) {
  const goodS = [...goods];

  if (sort) {
    switch (sort) {
      case 'length':
        goodS.sort((a, b) => a.length - b.length);

        return goodS;

      case 'alphabetically':
        goodS.sort((a, b) => a.localeCompare(b));

        return goodS;

      default:
        break;
    }
  }

  return goodS;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setRevers] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, { sort });
  const booleanReset = sort !== '' || reverse;

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sort !== SORT_GOODS_ALPHABETICALLY },
          )}
          onClick={() => {
            setSort(SORT_GOODS_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', { 'is-light': sort !== SORT_GOODS_LENGTH },
          )}
          onClick={() => {
            setSort(SORT_GOODS_LENGTH);
          }}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', { 'is-light': reverse === false },
          )}
          onClick={() => {
            setRevers(!reverse);
          }}
        >
          Reverse
        </button>

        {booleanReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setRevers(false);
            }}
          >
            Reset
          </button>

        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
