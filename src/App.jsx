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

function getSortedGoods(good, goodStyle, isRevers) {
  const items = [...good];

  if (goodStyle === 'alpha') items.sort((a, b) => a.localeCompare(b));
  if (goodStyle === 'length') items.sort((a, b) => a.length - b.length);
  if (isRevers) items.reverse();

  return items;
}

export const App = () => {
  const [goodStyle, setGoodStyle] = useState(null);
  const [isRevers, setIsReverse] = useState(false);
  const items = getSortedGoods(goodsFromServer, goodStyle, isRevers);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${goodStyle !== 'alpha' ? 'is-light' : ''}`}
          onClick={() => {
            setGoodStyle('alpha');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${goodStyle !== 'length' ? 'is-light' : ''}`}
          onClick={() => {
            setGoodStyle('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isRevers ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isRevers);
          }}
        >
          Reverse
        </button>

        {(goodStyle !== null || isRevers) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setGoodStyle(null);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {items.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
