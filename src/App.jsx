import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

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

const SORT_FIELD_NAME = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_REVERSE = 'Reverse';

function getPreparedGoods(goods, sortField, isRevesed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isRevesed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isRevesed, setIsRevesed] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, sortField, isRevesed);

  const handleReverse = () => setIsRevesed(!isRevesed);
  const handleReset = () => {
    setSortField('');
    setIsRevesed(false);
  };

  const showResetButton = !!sortField || isRevesed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
        >
          {SORT_FIELD_NAME}
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          {SORT_FIELD_LENGTH}
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isRevesed },
          )}
        >
          {SORT_FIELD_REVERSE}
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )
        }

      </div>

      <GoodList goods={sortedGoods} />

    </div>
  );
};
