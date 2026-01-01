//
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ABC = 'alphabetic';

function getPreparedGoods(goods, { SortField, isReversed }) {
  const preparedGoods = [...goods];

  if (SortField) {
    preparedGoods.sort((good1, good2) => {
      switch (SortField) {
        case SORT_FIELD_LENGTH:
          return good1[SortField] - good2[SortField];
        case SORT_FIELD_ABC:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [SortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const isChanged = SortField !== '' || isReversed;
  const visivleGoods = getPreparedGoods(goodsFromServer, {
    SortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': SortField !== SORT_FIELD_ABC,
          })}
          onClick={() => setSortField(SORT_FIELD_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': SortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visivleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
