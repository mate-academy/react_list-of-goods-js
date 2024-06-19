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
  const copyGoods = [...goodsFromServer];
  const [sortOrder, serSortOrder] = useState('');
  const [isReversed, setSortReversed] = useState(false);

  copyGoods.sort((good1, good2) => {
    switch (sortOrder) {
      case 'Sort by length':
        return good1.length - good2.length;
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });
  if (isReversed) {
    copyGoods.reverse();
  }

  const getButtonClass = buttonType => {
    return sortOrder === buttonType ? '' : 'is-light';
  };

  const reset = () => {
    setSortReversed(false);
    serSortOrder('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => serSortOrder('Sort alphabetically')}
          type="button"
          className={`button is-info ${getButtonClass('Sort alphabetically')}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => serSortOrder('Sort by length')}
          type="button"
          className={`button is-success ${getButtonClass('Sort by length')}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortReversed(!isReversed)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortOrder || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger ${getButtonClass('Reset')}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
