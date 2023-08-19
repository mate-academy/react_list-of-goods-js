import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';

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

function getPreparedGoods(goods, { sortBy, isReverse }) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visiableGoods = getPreparedGoods(goodsFromServer,
    { sortBy, isReverse: isReversed });
  const showResetButton = sortBy || isReversed;

  function resetButton() {
    setSortBy('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortBy !== SORT_BY_ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortBy !== SORT_BY_LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetButton}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visiableGoods} />
    </div>
  );
};
