import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPrepearedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  prepearedGoods.sort((a, b) => {
    switch (sortField) {
      case SORT_BY_ALPHABET:
        return a.localeCompare(b);
      case SORT_BY_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepearedGoods(
    goodsFromServer, sortField, isReversed,
  );

  const makeSetSortField = (field) => () => setSortField(field);

  const reverse = () => (
    setIsReversed(prevIsReversed => !prevIsReversed)
  );

  const reset = () => {
    const isResetButton = sortField !== '' || isReversed;

    return isResetButton;
  };

  const resetButton = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortField !== SORT_BY_ALPHABET },
            )}
          onClick={makeSetSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': sortField !== SORT_BY_LENGTH },
            )}
          onClick={makeSetSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverse}
        >
          Reverse
        </button>

        {reset() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButton}
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
