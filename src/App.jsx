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
  const [sortLength, setSortLength] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [reversed, setReversed] = useState(false);

  let goods = [...goodsFromServer];

  if (sortAlphabetically) {
    goods = goods.toSorted((a, b) => a.localeCompare(b)); // Сортировка по алфавиту
  } else if (sortLength) {
    goods = goods.toSorted((a, b) => a.length - b.length); // Сортировка по длине
  }

  // Применяем реверс после сортировки
  if (reversed) {
    goods = goods.reverse();
  }

  const hasChanges = sortAlphabetically || sortLength || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortAlphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortAlphabetically(!sortAlphabetically);
            setSortLength(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortLength ? '' : 'is-light'}`}
          onClick={() => {
            setSortLength(!sortLength);
            setSortAlphabetically(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortAlphabetically(false);
              setSortLength(false);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
