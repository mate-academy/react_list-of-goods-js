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

const SORT_ABC = 'abc';
const SORT_BY_LENGTH = 'leng';

function getGoodsView(sortField, reverse) {
  let prepearedGoods = [...goodsFromServer];

  switch (sortField) {
    case SORT_ABC:
      prepearedGoods = prepearedGoods.sort((cur, prew) => {
        return reverse ? prew.localeCompare(cur) : cur.localeCompare(prew);
      });
      break;
    case SORT_BY_LENGTH:
      prepearedGoods = reverse
        ? prepearedGoods.sort((a, b) => a.length - b.length).reverse()
        : prepearedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      prepearedGoods = reverse
        ? prepearedGoods.reverse()
        : [...goodsFromServer];
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getGoodsView(sortField, reverse);

  const sortGoods = (sorting, reversing = false) => {
    setReverse(reversing);
    setSortField(sorting);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ABC,
          })}
          onClick={() => sortGoods(SORT_ABC, reverse)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => sortGoods(SORT_BY_LENGTH, reverse)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => sortGoods(sortField, !reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => sortGoods('', false)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
