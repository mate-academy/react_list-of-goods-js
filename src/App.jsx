import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_NAME = 'name';
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

const sortGoods = (goods, sortingField, isReversed) => {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortingField) {
      case SORT_FIELD_NAME:
        return good1.localeCompare(good2);

      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      default:
        return '';
    }
  });

  return isReversed
    ? sortedGoods.reverse()
    : sortedGoods;
};

export const App = () => {
  const [sortingField, setSortingField] = useState('');
  const [isReversed, changeSortingOrder] = useState(false);

  const toggleSortingOrder = () => (
    changeSortingOrder(currentOrder => !currentOrder)
  );
  const sortedGoods = sortGoods(goodsFromServer, sortingField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortingField !== SORT_FIELD_NAME },
          )}
          onClick={() => setSortingField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortingField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortingField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed !== true },
          )}
          onClick={() => toggleSortingOrder()}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-danger',
            'is-light',
            { hidden: (sortingField === '') && (isReversed === false) },
          )}
          onClick={() => {
            setSortingField('');
            changeSortingOrder(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
