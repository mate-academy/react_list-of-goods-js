import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodList';

const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, isReveresed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });

    if (isReveresed === true) {
      preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReveresed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReveresed },
  );

  return (
    <div className="section content">
      <div className="buttons">

        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}

        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prevState => !prevState)}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReveresed },
          )}
        >
          Reverse
        </button>

        {(sortField || isReveresed) && (
          <button
            onClick={() => setSortField('')}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
