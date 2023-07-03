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

const getSortedGoods = (goods, { sortField, isReversed }) => {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((item1, item2) => {
      switch (sortField) {
        case 'name':
          return item1.localeCompare(item2);
        case 'length':
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
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

        {(sortField || isReversed) && (
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
