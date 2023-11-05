import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';

export const App = () => {
  const [chosenFilter, setChosenFilter] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  let sortedGoods = [...goodsFromServer];

  if (chosenFilter) {
    switch (chosenFilter) {
      case SORT_ALPHABETICALLY:
        sortedGoods = sortedGoods.sort((good1, good2) => (
          good1.localeCompare(good2)
        ));
        break;

      case SORT_LENGTH:
        sortedGoods = sortedGoods.sort((good1, good2) => (
          good1.length - good2.length
        ));
        break;

      default:
        break;
    }

    if (isReverse) {
      sortedGoods.reverse();
    }
  }

  if (!chosenFilter && isReverse) {
    sortedGoods.reverse();
  }

  const handleClickReset = () => {
    setChosenFilter('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': chosenFilter !== SORT_ALPHABETICALLY })
          }
          onClick={() => setChosenFilter(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': chosenFilter !== SORT_LENGTH })
          }
          onClick={() => setChosenFilter(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning',
              { 'is-light': !isReverse })
          }
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(chosenFilter || isReverse)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickReset}
          >
            Reset
          </button>
          )}
      </div>

      <ul>
        {sortedGoods.map((good, index) => (
          <li data-cy="Good" key={index}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
