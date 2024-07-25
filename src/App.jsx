import { useState } from 'react';
import classNames from 'classnames';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = (goods, valueSortField, valueIsReversed) => {
    let sortedGoods = [...goods];

    if (valueSortField === SORT_FIELD_ALPHABET) {
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (valueSortField === SORT_FIELD_LENGTH) {
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (valueIsReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const sortByAlphabet = () => {
    setSortField(SORT_FIELD_ALPHABET);
  };

  const sortByLength = () => {
    setSortField(SORT_FIELD_LENGTH);
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {visibleGoods.map(visibleGood => (
          <li key={visibleGood} data-cy="Good">
            {visibleGood}
          </li>
        ))}
      </ul>
    </div>
  );
};
