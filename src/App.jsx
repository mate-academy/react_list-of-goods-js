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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

function sortGoods(goods, sortField, makeReverse = false) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return makeReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isReset, setIsReset] = useState(false);

  console.log(`
    Reverse - ${isReversed}
    Reset - ${isReset}`);

  const resetClick = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReset(false);
    setIsReversed(!isReversed);
  };

  const sortAlphabeticallyClick = () => {
    if (isReversed) {
      setVisibleGoods(sortGoods(visibleGoods, SORT_FIELD_ALPHABETICALLY, true));
    } else {
      setVisibleGoods(sortGoods(visibleGoods, SORT_FIELD_ALPHABETICALLY));
    }

    setSortField(SORT_FIELD_ALPHABETICALLY);
    setIsReset(true);
  };

  const sortByLengthClick = () => {
    if (isReversed) {
      setVisibleGoods(sortGoods(visibleGoods, SORT_FIELD_BY_LENGTH, true));
    } else {
      setVisibleGoods(sortGoods(visibleGoods, SORT_FIELD_BY_LENGTH));
    }

    setSortField(SORT_FIELD_BY_LENGTH);
    setIsReset(true);
  };

  const reverseClick = () => {
    setVisibleGoods(sortGoods(visibleGoods, '', true));
    setIsReversed(!isReversed);
    setIsReset(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
            },
          )}
          onClick={sortAlphabeticallyClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortField !== SORT_FIELD_BY_LENGTH,
            },
          )}
          onClick={sortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed || !isReset,
            },
          )}
          onClick={reverseClick}
        >
          Reverse
        </button>

        {isReset
        && JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
