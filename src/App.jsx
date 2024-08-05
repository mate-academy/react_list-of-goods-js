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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type, reverse = isReversed) => {
    let sortedGoods = [...goods];

    switch (type) {
      case 'alphabetically':
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      case 'reset':
        sortedGoods = [...goodsFromServer];
        break;
      default:
        break;
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  };

  const handleSort = type => {
    if (type === 'reverse') {
      setIsReversed(!isReversed);
      setGoods(current => [...current].reverse());
    } else if (type === 'reset') {
      setSortType('');
      setIsReversed(false);
      setGoods([...goodsFromServer]);
    } else {
      setSortType(type);
      sortGoods(type, isReversed);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('alphabetically')}
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => handleSort('length')}
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>
        <button
          onClick={() => handleSort('reverse')}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button
            onClick={() => handleSort('reset')}
            type="button"
            className="button is-danger"
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
