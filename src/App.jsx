import cn from 'classnames';
import 'bulma/css/bulma.css';
import { useState } from 'react';

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

const SORT_BY_INITIAL = '';
const SORT_BY_ALPHABET = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortedBy, isReversed) {
  const preparedGoods = goods.map(good => (
    {
      id: crypto.randomUUID(),
      name: good,
      length: good.length,
    }
  ));

  if (sortedBy) {
    preparedGoods.sort((goodFirst, goodSecond) => {
      switch (sortedBy) {
        case SORT_BY_ALPHABET:
          return goodFirst[sortedBy].localeCompare(goodSecond[sortedBy]);

        case SORT_BY_LENGTH:
          return goodFirst[sortedBy] - goodSecond[sortedBy];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortedBy, setSortedBy] = useState(SORT_BY_INITIAL);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortedBy, isReversed);

  const reset = () => {
    setSortedBy(SORT_BY_INITIAL);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortedBy !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortedBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortedBy !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortedBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good.id}>{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
