import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getSortedGoods(goods, { sortField, reverseState }) {
  const sortedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        sortedGoods.sort((good1, good2) => {
          return good1.localeCompare(good2);
        });
        break;

      case SORT_FIELD_LENGTH:
        sortedGoods.sort((good1, good2) => {
          return good1.length - good2.length;
        });
        break;

      default:
        break;
    }
  }

  if (reverseState) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseState, setReverseState] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, {
    sortField,
    reverseState,
  });

  const isListChanged = sortField || reverseState;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseState,
          })}
          onClick={() => setReverseState(!reverseState)}
        >
          Reverse
        </button>

        {isListChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReverseState(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
