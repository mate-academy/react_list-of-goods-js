import { useState } from 'react';
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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortType === 'alphabet' ? '' : ' is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success${sortType === 'length' ? '' : ' is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button type="button" className="button is-danger is-light" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
