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
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function sortBy(type) {
    const copy = [...goods];

    switch (type) {
      case 'alphabetically':
        copy.sort((a, b) => a.localeCompare(b));
        setActiveSort('alphabetically');
        setIsReversed(false);
        break;

      case 'by-length':
        copy.sort((a, b) => a.length - b.length);
        setActiveSort('by-length');
        setIsReversed(false);
        break;

      case 'reverse':
        copy.reverse();
        setIsReversed(!isReversed);
        break;

      case 'reset':
        setGoods(goodsFromServer);
        setActiveSort('');
        setIsReversed(false);

        return;

      default:
        break;
    }

    setGoods(copy);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => sortBy('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'by-length' ? '' : 'is-light'}`}
          onClick={() => sortBy('by-length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => sortBy('reverse')}
        >
          Reverse
        </button>

        {(activeSort || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => sortBy('reset')}
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
