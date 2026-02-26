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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, [sortField, reversedField]) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversedField, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, [
    sortField,
    reversedField,
  ]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_NAME)}
          className={cn('button', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(prev => !prev)}
          className={cn('button', { 'is-light': !reversedField })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversedField) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
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

/* export const App = () => (
  <div className="section content">
    <div className="buttons">
      <button type="button" className="button is-info is-light">
        Sort alphabetically
      </button>

      <button type="button" className="button is-success is-light">
        Sort by length
      </button>

      <button type="button" className="button is-warning is-light">
        Reverse
      </button>

      <button type="button" className="button is-danger is-light">
        Reset
      </button>
    </div>

    <ul>
      <li data-cy="Good">Dumplings</li>
      <li data-cy="Good">Carrot</li>
      <li data-cy="Good">Eggs</li>
      <li data-cy="Good">Ice cream</li>
      <li data-cy="Good">Apple</li>
      <li data-cy="Good">...</li>
    </ul>
  </div>
); */
