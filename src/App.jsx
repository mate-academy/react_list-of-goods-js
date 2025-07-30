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
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [initialState, setInitialState] = useState(true);
  const [type, setType] = useState('');

export const App = () => {
  const resetFunction = () => {setSortedGoods([...goodsFromServer]); setInitialState(true); setType('');};
  const sortFunction = sortType  => {
    setType(sortType );
    setInitialState(false);
    switch (sortType ) {
      case 'alphabetical': {
        setSortedGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
        break;
      }
      case 'length':
        setSortedGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
        break;
      case 'reverse':
        setSortedGoods([...sortedGoods].reverse());
        break;
      default:
        setSortedGoods([...goodsFromServer]);
    }
  };
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${type === 'alphabetical' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${type === 'length' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${type === 'reverse' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction('reverse')}
        >
          Reverse
        </button>

        {!initialState&&<button
          type="button"
          className="button is-danger is-light"
          onClick={() => resetFunction()}
        >
          Reset
        </button>}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
