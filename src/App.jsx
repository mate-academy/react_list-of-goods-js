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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  const sortByAlphabet = () => {
    const sortedGoodsByAlphabet = [...visibleGoods].sort((good1, good2) => {
      return isReversed
        ? good2.localeCompare(good1)
        : good1.localeCompare(good2);
    });

    setVisibleGoods(sortedGoodsByAlphabet);
    setSortField(SORT_FIELD_ALPHABET);
  };

  const sortByLength = () => {
    const sortedGoodsByLength = [...visibleGoods].sort((good1, good2) => {
      return isReversed
        ? good2.length - good1.length
        : good1.length - good2.length;
    });

    setVisibleGoods(sortedGoodsByLength);
    setSortField(SORT_FIELD_LENGTH);
  };

  const reverse = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const isInInitialOrder = () => {
    return visibleGoods.every((good, index) => good === goodsFromServer[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {!isInInitialOrder() && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
