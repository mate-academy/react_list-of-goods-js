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
  const [reversed, setReversed] = useState(false);

  const getSortedBy = () => {
    const preparedGoods = [...goodsFromServer];

    if (activeSort === 'alphabetic') {
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (activeSort === 'length') {
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (reversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const sortedGoods = getSortedBy();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetic' ? '' : 'is-light'}`}
          onClick={() => setActiveSort('alphabetic')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success  ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={() => setActiveSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(previous => !previous)}
        >
          Reverse
        </button>

        {(activeSort || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActiveSort('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
