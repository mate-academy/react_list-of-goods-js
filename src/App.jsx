import 'bulma/css/bulma.css';
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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isOriginal = sortType === '' && !isReversed;

  function getVisibleGoods(goods, { sType, isRev }) {
    const visibleGoods = [...goods];

    if (sType === 'alphabet') {
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (sType === 'length') {
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (isRev) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  const visibleGoods = getVisibleGoods(goodsFromServer, {
    sType: sortType,
    isRev: isReversed,
  });

  const sortAlphabetically = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const reverse = () => {
    setIsReversed(current => !current);
  };

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={
            sortType === 'alphabet' ? 'button is-info' : 'button is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={
            sortType === 'length' ? 'button is-success' : 'button is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={isReversed ? 'button is-warning' : 'button is-light'}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
