import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import React, { useState } from 'react';
import { ListOfGoods } from './components/ListOfGoods';

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

const ALPHABET_SORT = 'alphabet';
const LENGTH_SORT = 'length';

function getSortedGoods(goods, sortType) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case ALPHABET_SORT:
          return good1.localeCompare(good2);

        case LENGTH_SORT:
          return good1.length - good2.length;

        default:
          return preparedGoods;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const visibleGoods = getSortedGoods(goodsFromServer, sortType);
  const [isReversed, setIsReversed] = useState(false);

  function handleReverse(goods) {
    return [...goods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(ALPHABET_SORT)}
          type="button"
          className={cn(
            'button', 'is-info', { 'is-light': sortType !== ALPHABET_SORT },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(LENGTH_SORT)}
          type="button"
          className={cn(
            'button', 'is-success', { 'is-light': sortType !== LENGTH_SORT },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortType(''); setIsReversed(false);
          }}
          type="button"
          className="button is-danger is-light"
          style={{ display: isReversed || sortType ? 'block' : 'none' }}
        >
          Reset
        </button>
      </div>

      {isReversed
        ? <ListOfGoods goods={handleReverse(visibleGoods)} />
        : <ListOfGoods goods={visibleGoods} />}
    </div>
  );
};
