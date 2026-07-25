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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            if (sortType === 'alphabet') {
              // reset para original
              setGoods([...goodsFromServer]);
              setSortType('');
              setIsReversed(false);
            } else {
              // aplica ordenação
              const sorted = [...goodsFromServer].sort();

              setGoods(isReversed ? sorted.reverse() : sorted);
              setSortType('alphabet');
            }
          }}
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => {
            if (sortType === 'length') {
              // reset para original
              setGoods([...goodsFromServer]);
              setSortType('');
              setIsReversed(false);
            } else {
              // aplica ordenação
              const sorted = [...goodsFromServer].sort(
                (a, b) => a.length - b.length,
              );

              setGoods(isReversed ? sorted.reverse() : sorted);
              setSortType('length');
            }
          }}
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>
        <button
          onClick={() => {
            setGoods([...goods].reverse());
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button
            onClick={() => {
              setGoods([...goodsFromServer]);
              setSortType('');
              setIsReversed(false);
            }}
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
