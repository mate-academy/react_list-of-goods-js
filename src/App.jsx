import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect, useMemo } from 'react';

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
  const [order, setOrder] = useState('none');
  const [reversed, setReversed] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const buildGoods = (initialGoods, sortOrder, isReversed = false) => {
    const result = [...initialGoods];

    switch (sortOrder) {
      case 'alphabet':
        result.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        result.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  useEffect(() => {
    setGoods(buildGoods(goodsFromServer, order, reversed));
  }, [order, reversed]);

  const isInitialOrder = useMemo(() => {
    return (
      JSON.stringify(goods) === JSON.stringify(goodsFromServer) &&
      order === 'none' &&
      !reversed
    );
  }, [goods, order, reversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${order !== 'alphabet' ? 'is-light' : ''}`}
          onClick={() => setOrder('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${order !== 'length' ? 'is-light' : ''}`}
          onClick={() => setOrder('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setOrder('none');
              setReversed(false);
            }}
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
