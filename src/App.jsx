import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_DEFAULT = 'default';

function getSortedGoods(goods, sortField, reversed) {
  const sortedGoods = [...goods];

  if (sortField !== SORT_FIELD_DEFAULT) {
    sortedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        case SORT_FIELD_NAME:
          return a.localeCompare(b);

        default:
          return 0;
      }
    });
  }

  return reversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState(SORT_FIELD_DEFAULT);
  const [reversedValue, setReversedValue] = useState(false);

  const goods = getSortedGoods(goodsFromServer, sortValue, reversedValue);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue(SORT_FIELD_NAME)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortValue !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortValue(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortValue !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversedValue(!reversedValue)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversedValue,
          })}
        >
          Reverse
        </button>
        {sortValue !== SORT_FIELD_DEFAULT || reversedValue === true ? (
          <button
            onClick={() => {
              setSortValue(SORT_FIELD_DEFAULT);
              setReversedValue(false);
            }}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.index}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
