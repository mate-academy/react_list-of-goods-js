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

const getPreparedGoods = (
  goods,
  { sortField, reverseOption, setReverseOption },
) => {
  const preparedGoods = [...goods];

  const reverseGoods = () => {
    setReverseOption(optionList => !optionList);
  };

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        preparedGoods.sort();
        break;
      case SORT_FIELD_LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return 0;
    }
  }

  if (reverseOption) {
    preparedGoods.reverse();
  }

  return { preparedGoods, reverseGoods };
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOption, setReverseOption] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseOption,
    setReverseOption,
  });

  const reset = () => {
    setReverseOption(false);
    setSortField('');
  };

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
          onClick={() => sortedGoods.reverseGoods()}
          className={cn({ 'is-light': !reverseOption }, 'button is-warning')}
        >
          Reverse
        </button>

        {!goodsFromServer[0]
          .toString()
          .includes(sortedGoods.preparedGoods[0].toString()) && (
          <button
            type="button"
            onClick={() => reset()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
