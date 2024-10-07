import { useState } from 'react';

import cn from 'classnames';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

const getPreparedGoods = (goods, { sortField }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY: {
        return preparedGoods.toSorted();
      }

      case SORT_FIELD_LENGTH: {
        return preparedGoods.toSorted(
          (good1, good2) => good1.length - good2.length,
        );
      }

      default:
        return 0;
    }
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOption, setReverseOption] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, { sortField });

  const reverse = () => {
    setReverseOption(optionList => !optionList);
  };

  const reset = () => {
    setReverseOption(false);
    setSortField('');
  };

  if (reverseOption) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => reverse()}
          className={cn({ 'is-light': !reverseOption }, 'button is-warning')}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={() => reset()}
          style={{ display: !sortField ? 'none' : '' }}
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
