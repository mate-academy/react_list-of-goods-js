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
function sortGoods(curentButton, reverse) {
  const sortArr = [...goodsFromServer];

  if (curentButton) {
    sortArr.sort((good1, good2) => {
      switch (curentButton) {
        case 'is-info':
          return good1.localeCompare(good2);
        case 'is-success':
          return good1.length - good2.length;
        default:
          return null;
      }
    });
  }

  if (reverse) {
    sortArr.reverse();
  }

  return sortArr;
}

export const App = () => {
  const [curentButton, setButton] = useState('');
  const [reverse, setReverse] = useState(false);
  const currentGoods = sortGoods(curentButton, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setButton('is-info')}
          type="button"
          className={`button is-info ${curentButton !== 'is-info' && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setButton('is-success')}
          type="button"
          className={`button is-success ${curentButton !== 'is-success' && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
        >
          Reverse
        </button>

        {(curentButton || reverse)
          && (
            <button
              onClick={() => {
                setButton('');
                setReverse(false);
              }
              }
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
