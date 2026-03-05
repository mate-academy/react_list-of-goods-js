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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_NAME)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_BY_NAME,
            active: sortField === SORT_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
            active: sortField === SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
            active: reversed,
          })}
        >
          Reverse
        </button>

        {reversed || sortField ? (
          <button
            onClick={() => {
              setReversed(false);
              setSortField('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
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
