import cn from 'classnames';
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
  const [reversed, setReversed] = useState(false);

  let visibleGoods = goodsFromServer;

  visibleGoods = visibleGoods.toSorted((good1, good2) => {
    switch (sortType) {
      case 'sortAlphabetically':
        return good1.localeCompare(good2);
      case 'sortByLength':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const handleSortAlphabetically = () => {
    setSortType('sortAlphabetically');
  };

  const handleSortByLength = () => {
    setSortType('sortByLength');
  };

  const handleReverseButton = () => {
    if (reversed) {
      setReversed(false);
    } else {
      setReversed(true);
    }
  };

  const handleResetButton = () => {
    setSortType('');
    setReversed(false);
  };

  const isVisibleReset = reversed || sortType !== '';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'sortAlphabetically',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== 'sortByLength',
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
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
