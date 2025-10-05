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
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const [initialGoods] = useState(goodsFromServer);

  const list = [...initialGoods];

  const handleSortAlphabetically = () => {
    setSortType('alpha');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleToggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType('none');
    setIsReversed(false);
  };

  if (sortType === 'alpha') {
    list.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    list.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    list.reverse();
  }

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((item, i) => item === b[i]);

  const isChanged = !arraysEqual(list, initialGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={`button is-info ${sortType === 'alpha' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleToggleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged && (
          <button type="button" onClick={handleReset} className="button is-danger is-light">
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
