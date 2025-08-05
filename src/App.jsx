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

function getPreparedGoods(goods, sortMethod) {
  const goodsCopy = [...goods];

  if (sortMethod) {
    goodsCopy.sort((good1, good2) => {
      switch (sortMethod) {
        case 'Sort alphabetically':
          return good1.localeCompare(good2);

        case 'Sort by length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return goodsCopy;
}

export const App = () => {
  const [currentSort, setCurrentSort] = useState('');
  let renderedGoods = getPreparedGoods(goodsFromServer, currentSort);
  const [isReversed, setIsReversed] = useState(false);

  if (isReversed) {
    renderedGoods = renderedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort === 'Sort alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setCurrentSort('Sort alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${currentSort === 'Sort by length' ? '' : 'is-light'}`}
          onClick={() => {
            setCurrentSort('Sort by length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(currentSort || isReversed) && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setCurrentSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
