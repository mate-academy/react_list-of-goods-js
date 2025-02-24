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
  const [selectedSortAlph, setSelectedSortAlph] = useState(false);
  const [selectedSortLength, setSelectedSortLength] = useState(false);
  const [reversed, setReversed] = useState(false);
  let goods = [...goodsFromServer];

  if (selectedSortAlph) {
    goods = goods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (selectedSortLength) {
    goods = goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    goods = goods.reverse();
  }

  const hasChanges = selectedSortAlph || selectedSortLength || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedSortAlph ? '' : 'is-light'}`}
          onClick={() => {
            setSelectedSortAlph(!selectedSortAlph);
            setSelectedSortLength(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectedSortLength ? '' : 'is-light'}`}
          onClick={() => {
            setSelectedSortLength(!selectedSortLength);
            setSelectedSortAlph(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSelectedSortAlph(false);
              setSelectedSortLength(false);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
