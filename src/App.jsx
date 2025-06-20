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
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  // Вычисляем текущий список товаров в зависимости от сортировки и реверса
  const displayGoods = (() => {
    let result = [...goodsFromServer];

    if (activeSort === 'ads') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (activeSort === 'leng') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result = result.toReversed();
    }

    return result;
  })();

  const alphabetically = () => setActiveSort('ads');
  const length = () => setActiveSort('leng');
  const reverse = () => setIsReversed(prev => !prev);
  const reset = () => {
    setActiveSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${activeSort === 'ads' ? 'is-info' : 'is-info is-light'}`}
          onClick={alphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${activeSort === 'leng' ? 'is-info' : 'is-info is-light'}`}
          onClick={length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-info' : 'is-info is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReversed) && (
          <button type="button" className="button is-info" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
