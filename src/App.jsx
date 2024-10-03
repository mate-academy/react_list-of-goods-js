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
  const [sortField, setsortField] = useState('');
  const [isReversed, setReverse] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const reset = () => {
    visibleGoods = goodsFromServer;
    setsortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length'].map(field => (
          <button
            type="button"
            className={`button is-info ${sortField !== field ? 'is-light' : ''}`}
            onClick={() => setsortField(field)}
          >
            {field}
          </button>
        ))}
        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={() => setReverse(!isReversed)}
        >
          Reversed
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
