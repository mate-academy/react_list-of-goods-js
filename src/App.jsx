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

const sortGoodsLength = 'length';
const sortGoodsAlphabeticaly = 'alphabetically';

function sortGoods(goods, { sort }) {
  const copyGoods = [...goods];

  if (sort) {
    switch (sort) {
      case 'length':
        copyGoods.sort((a, b) => a.length - b.length);

        return copyGoods;

      case 'alphabetically':
        copyGoods.sort((a, b) => a.localeCompare(b));

        return copyGoods;

      default:
        break;
    }
  }

  return copyGoods;
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
            { 'is-light': sort !== sortGoodsAlphabeticaly },
          )}
          onClick={() => {
            setSort(sortGoodsAlphabeticaly);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', { 'is-light': sort !== sortGoodsLength },
          )}
          onClick={() => {
            setSort(sortGoodsLength);
          }}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', { 'is-light': !reverse },
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
