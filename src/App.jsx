import 'bulma/css/bulma.css';
import { useState } from 'react';
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

const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICAL:
        return a.localeCompare(b);

      case SORT_FIELD_LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const [order, setOrder] = useState('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICAL,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': order !== 'reverse',
          })}
          onClick={() => setOrder(order === '' ? 'reverse' : '')}
        >
          Reverse
        </button>

        {(sortField !== '' || order !== '') && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setOrder('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {order
          ? visibleGoods
              .slice()
              .reverse()
              .map(good => (
                <li key={good} data-cy="Good">
                  {good}
                </li>
              ))
          : visibleGoods.map(good => (
              <li key={good} data-cy="Good">
                {good}
              </li>
            ))}
      </ul>
    </div>
  );
};
