import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGHT = 'length';

function getPreperedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  prepearedGoods.sort((item1, item2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return item1.localeCompare(item2);

      case SORT_FIELD_LENGHT:
        return item1.length - item2.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? prepearedGoods.reverse()
    : prepearedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGHT },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
