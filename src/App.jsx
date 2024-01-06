import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

const getPrepareGoods = (goods, { sortBy, isReverse }) => {
  const prepareGoods = [...goods];

  if (sortBy) {
    prepareGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SORT_ALPHABETICALLY:
          return goodA.localeCompare(goodB);
        case SORT_BY_LENGTH:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPrepareGoods(goodsFromServer, { sortBy, isReverse });

  const GoodItems = ({ goodsArr }) => (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );

  const handleSort = sort => () => setSortBy(sort);
  const handleReverse = () => setIsReverse(!isReverse);

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SORT_ALPHABETICALLY)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortBy !== 'alphabet' })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SORT_BY_LENGTH)}
          type="button"
          className={
            cn('button is-success', { 'is-light': sortBy !== 'length' })
          }
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={
            cn('button is-warning', { 'is-light': !isReverse })
          }

        >
          Reverse
        </button>

        {(isReverse || sortBy)
         && (
         <button
           onClick={reset}
           type="button"
           className="button is-danger is-light"
         >
           Reset
         </button>
         )}
      </div>

      <GoodItems goodsArr={goods} />
    </div>
  );
};
