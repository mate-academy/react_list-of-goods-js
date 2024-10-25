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
  const [sort, setSort] = useState([...goodsFromServer]);
  const [reverse, setReverse] = useState(false);
  const [active, setActive] = useState('');

  const handleSort = good => {
    let newSort;

    switch (good) {
      case 'abc':
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.localeCompare(a));
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.localeCompare(b));
          setActive(good);
        }

        break;
      case 'length':
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.length - a.length);
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.length - b.length);
          setActive(good);
        }

        break;
      case 'reverse':
        if (active === 'abc' || active === 'length') {
          setReverse(!reverse);
        } else if (active === 'reverse') {
          setReverse(!reverse);
          setActive('');
        } else {
          setReverse(!reverse);
          setActive('reverse');
        }

        newSort = [...sort].reverse();
        break;
      default:
        setActive('');
        setReverse(false);
        newSort = [...goodsFromServer];
    }

    setSort(newSort);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${(active !== 'abc' ? 'is-light' : '') || (active !== 'abc' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort('abc')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${(active !== 'length' ? 'is-light' : '') || (active !== 'length' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => handleSort('reverse')}
        >
          Reverse
        </button>
        {active && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sort.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
