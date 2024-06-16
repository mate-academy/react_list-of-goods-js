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
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let GoodsCopy = [...goodsFromServer];

  if (sortOrder) {
    GoodsCopy = [...goodsFromServer].sort((a, b) => {
      switch (sortOrder) {
        case 'alphabetically':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    GoodsCopy = [...GoodsCopy].reverse();
  }

  const GoodList = ({ goodsList }) => {
    return goodsList.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSortOrder('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortOrder('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortOrder('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodList goodsList={GoodsCopy} />
      </ul>
    </div>
  );
};
