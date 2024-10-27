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

function sortingElements(goods, sortField, isReversed) {
  const sortedGoods = [...goods];

  switch (sortField) {
    case 'alphabetic':
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case 'length':
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case 'reset':
      return goodsFromServer;
    default:
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = sortingElements(goodsFromServer, sortField, isReversed);

  const handleSort = field => {
    if (field === 'reverse') {
      setIsReversed(!isReversed);
    } else {
      setSortField(field);
    }
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== 'alphabetic' ? 'is-light' : ''}`}
          onClick={() => handleSort('alphabetic')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort('reverse')}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
