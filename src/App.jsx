import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

function getPreparedGoods(goods, sortField) {
  let preparedGoods = [...goods];

  if (sortField === '') {
    preparedGoods = [...goodsFromServer];

    return preparedGoods;
  }

  if (sortField) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return goods1.localeCompare(goods2);
        case SORT_BY_LENGTH:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (sortField === SORT_REVERSE) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const sort = (param) => {
    setVisibleGoods(getPreparedGoods(visibleGoods, param));
    setSortField(param);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortField === SORT_ALPHABETICALLY,
          })}
          onClick={() => sort(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortField === SORT_BY_LENGTH,
          })}
          onClick={() => sort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': sortField === SORT_REVERSE,
          })}
          onClick={() => sort(SORT_REVERSE)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn({
            'button is-danger': true,
            'is-light': sortField === '',
          })}
          onClick={() => sort('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(product => (
          <li data-cy="Good" key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
