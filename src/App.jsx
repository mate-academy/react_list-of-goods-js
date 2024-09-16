import 'bulma/css/bulma.css';
import cn from 'classnames';

import { useState } from 'react';
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

const SORT_FIELD_ALPH = 'alphabet';
const SORT_BY_LENGTH = 'length';

const getPreparedGoods = (goods, sortField, reverseGoods) => {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseGoods,
  );

  const handleResetSort = () => {
    setSortField('');
    setReverseGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPH)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseGoods(!reverseGoods)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseGoods })}
        >
          Reverse
        </button>

        {(sortField || reverseGoods) && (
          <button
            onClick={() => handleResetSort()}
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
