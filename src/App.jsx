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

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <li data-cy="Good">{good}</li>
    ))}
  </ul>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let displayedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'length':
        return good1.length - good2.length;
      case 'alphabetically':
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (reversed) {
    displayedGoods = displayedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField('alphabetically')}
          className={`button is-info ${sortField !== 'alphabetically' ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField('length')}
          className={`button is-success ${sortField !== 'length' ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {reversed || sortField !== '' ? (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={displayedGoods} />
    </div>
  );
};
