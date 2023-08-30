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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_LENGTH = 'length';

function getPreparedGood(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        preparedGoods.sort((item1, item2) => item1.localeCompare(item2));
        break;
      case SORT_LENGTH:
        preparedGoods.sort((item1, item2) => item1.length - item2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goodsFromServer,
    { sortField, isReversed });

  const isVisibleReset = isReversed || sortField;

  const onResetClicked = () => {
    setIsReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortField !== SORT_ALPHABETICALLY,
            },
          )}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortField !== SORT_LENGTH,
            },
          )}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isVisibleReset && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            onResetClicked();
          }}
        >
          Reset
        </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
