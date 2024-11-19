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

const SORT_FIELD_ABC = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPrepereGoods(goods, { sortField, isReversed }) {
  let prepareGoods = [...goods];

  if (sortField === SORT_FIELD_ABC) {
    prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    prepareGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepereGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleSortAlphabetically = () => setSortField(SORT_FIELD_ABC);
  const handleSortByLength = () => setSortField(SORT_FIELD_LENGTH);
  const toggleReversed = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const alphabeticallyButtonClass = cn('button is-info', {
    'is-light': sortField !== SORT_FIELD_ABC,
  });

  const lengthButtonClass = cn('button is-success', {
    'is-light': sortField !== SORT_FIELD_LENGTH,
  });

  const reversedButtonClass = cn('button is-warning', {
    'is-light': !isReversed,
  });

  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={alphabeticallyButtonClass}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={lengthButtonClass}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReversed}
          type="button"
          className={reversedButtonClass}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
