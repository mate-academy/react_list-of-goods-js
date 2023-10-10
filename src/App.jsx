import 'bulma/css/bulma.css';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, sortField, isReversed) {
  let preparedGoods = goods.map(good => ({
    name: good,
    length: good.length,
    id: uuidv4(),
  }));

  if (sortField.length !== 0) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      if (sortField.includes(SORT_FIELD_NAME)) {
        return good1[SORT_FIELD_NAME].localeCompare(good2[SORT_FIELD_NAME]);
      }

      if (sortField.includes(SORT_FIELD_LENGTH)) {
        return good1[SORT_FIELD_LENGTH] - good2[SORT_FIELD_LENGTH];
      }

      return 0;
    });
  }

  if (sortField.includes(SORT_FIELD_REVERSE)) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState([]);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const handleClick = (value) => {
    setSortField(sortField.includes(value)
      ? sortField.filter(field => field !== value)
      : [...sortField, value]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !sortField.includes(SORT_FIELD_NAME),
          })}
          onClick={() => handleClick(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !sortField.includes(SORT_FIELD_LENGTH),
          })}
          onClick={() => handleClick(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortField.includes(SORT_FIELD_REVERSE),
          })}
          onClick={() => handleClick(SORT_FIELD_REVERSE)}
        >
          Reverse
        </button>

        {(sortField.length !== 0) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
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
            key={good.id}
          >
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
