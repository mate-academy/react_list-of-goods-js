import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import { GoodsList } from './components/GoodsList/GoodList';

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

const SORT_BUTTON_ALPHABET = 'alphabetically';
const SORT_BUTTON_LENGHT = 'length';

function getPreperedGoods(goods, { sortButton, isReverse }) {
  const preperedGoods = [...goods];

  if (sortButton) {
    preperedGoods.sort((good1, good2) => {
      switch (sortButton) {
        case SORT_BUTTON_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BUTTON_LENGHT:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortButton, setSortButton] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const visibleGoods = getPreperedGoods(goods, {
    sortButton,
    isReverse,
  });

  const handleSort = type => setSortButton(type);
  const handleReverse = () => setIsReverse(prev => !prev);
  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortButton('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== SORT_BUTTON_ALPHABET,
          })}
          onClick={() => {
            handleSort(SORT_BUTTON_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== SORT_BUTTON_LENGHT,
          })}
          onClick={() => {
            handleSort(SORT_BUTTON_LENGHT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortButton || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
