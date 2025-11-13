import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const SORT_BY_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

const getPreparedGoods = (goods, sortField, isReversed) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABETICALLY: {
          return good1.localeCompare(good2);
        }

        case SORT_BY_LENGTH: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
