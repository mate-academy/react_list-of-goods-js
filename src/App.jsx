import 'bulma/css/bulma.css';
import { useState } from 'react';
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
  const [list, setList] = useState([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState(null);

  const sortList = type => {
    setActiveSort(type);

    const listCopy = [...list];

    if (type === 'reset') {
      setList([...goodsFromServer]);
      setActiveSort(null);

      return;
    }

    switch (type) {
      case 'reverse':
        listCopy.reverse();
        break;

      case 'alphabetically':
        listCopy.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        listCopy.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    setList(listCopy);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sortList('alphabetically')}
          className={`button is-info ${activeSort !== 'alphabetically' && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => sortList('length')}
          className={`button is-success ${activeSort !== 'length' && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => sortList('reverse')}
          className={`button is-warning ${activeSort !== 'reverse' && 'is-light'}`}
        >
          Reverse
        </button>
        {activeSort !== null && (
          <button
            type="button"
            onClick={() => sortList('reset')}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
