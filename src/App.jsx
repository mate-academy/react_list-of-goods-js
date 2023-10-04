import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';

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

const SortType = {
  alphabetically: 'Sort alphabetically',
  length: 'Sort by length',
};

const getGoodsList = (goods, sortField, isReversed) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [targetInnerText, setTargetInnerText] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getGoodsList(
    goodsFromServer, targetInnerText, isReversed,
  );

  const handleSort = (e) => {
    setTargetInnerText(e.currentTarget.innerText);
  };

  const handlleReverse = (e) => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setTargetInnerText('');
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
              { 'is-light': targetInnerText !== SortType.alphabetically },
            )
          }
          onClick={handleSort}
        >
          {SortType.alphabetically}
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': targetInnerText !== SortType.length },
            )
          }
          onClick={handleSort}
        >
          {SortType.length}
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={handlleReverse}
        >
          Reverse
        </button>

        {
          (targetInnerText || isReversed)
            && (
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

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
