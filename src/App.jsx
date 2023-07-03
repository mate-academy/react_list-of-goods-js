import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

const SORT_BY = {
  ALPHABET: 'alpabet',
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

function sortGoodsBy(goodList, sortBy, isNeedReverse) {
  const goodListCopy = [...goodList];

  goodListCopy.sort((good1, good2) => {
    switch (sortBy) {
      case (SORT_BY.ALPHABET):
        return good1.localeCompare(good2);

      case (SORT_BY.LENGTH):
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isNeedReverse) {
    goodListCopy.reverse();
  }

  return goodListCopy;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const isShowResetButton = sortBy || isReversed;
  const goods = sortGoodsBy(goodsFromServer, sortBy, isReversed);

  function resetClickHandler() {
    setSortBy('');
    setIsReversed(false);
  }

  const resetButton = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => resetClickHandler()}
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY.ALPHABET,
          })}
          onClick={() => setSortBy(SORT_BY.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY.LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentIsReversed => !currentIsReversed)}
        >
          Reverse
        </button>

        {isShowResetButton && resetButton}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
