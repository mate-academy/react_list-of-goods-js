import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

export const SORT_FIELD = {
  NAME: 'name',
  LENGTH: 'length',
};

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

const getSortedGoods = (goods, { sortField, isReversed }) => {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((item1, item2) => {
      switch (sortField) {
        case SORT_FIELD.NAME:
          return item1.localeCompare(item2);
        case SORT_FIELD.LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer,
    { sortField, isReversed });

  const resetSortField = () => {
    setSortField('');
    setIsReversed(false);
  };

  const showResetButton = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD.NAME })}
          onClick={() => setSortField(SORT_FIELD.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH })}
          onClick={() => setSortField(SORT_FIELD.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(reversed => !reversed)}
        >
          Reverse
        </button>

        { showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSortField()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
