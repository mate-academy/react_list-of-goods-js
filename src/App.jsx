import cn from 'classnames';
import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodList';

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
const SORT_FIELD_ORDER = 'alphabetically';

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ORDER:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visablGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortField !== SORT_FIELD_ORDER,
            },
          )}
          onClick={() => setSortField(SORT_FIELD_ORDER)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visablGoods} />
    </div>
  );
};
