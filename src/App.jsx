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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
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
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodList goodsList={visibleGoods} />
      </ul>
    </div>
  );
};
