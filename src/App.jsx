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
  const [sortBy, setSortBy] = useState('');
  const [reverseStatus, setReverseStatus] = useState(false);

  let sortGoods = goodsFromServer.toSorted((good1, good2) => {
    switch (sortBy) {
      case 'alphabetically':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseStatus) {
    sortGoods = sortGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortBy('alphabetically');
          }}
          type="button"
          className={`button is-success ${sortBy === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortBy('length');
          }}
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseStatus(!reverseStatus);
          }}
          type="button"
          className={`button is-success ${reverseStatus ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortBy !== '' || reverseStatus) && (
          <button
            onClick={() => {
              setSortBy('');
              setReverseStatus(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
