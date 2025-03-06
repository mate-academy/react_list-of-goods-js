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
  const [goods, setGoods] = useState('');
  const [reverse, setReverse] = useState(false);

  let sortedGoods = [];

  if (goods && goods !== 'reverse') {
    sortedGoods = [...goodsFromServer].sort((goods1, goods2) => {
      switch (goods) {
        case 'alphabetically':
          return goods1.localeCompare(goods2);
        case 'length':
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  } else if (!goods) {
    sortedGoods = [...goodsFromServer];
  }

  if (reverse) {
    sortedGoods = [...sortedGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${goods === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setGoods('alphabetically');
            setReverse(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${goods === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setGoods('length');
            setReverse(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(prevReverse => !prevReverse)}
        >
          Reverse
        </button>

        {goods && (
          <button
            type="button"
            className={`button is-danger ${goods === '' ? '' : 'is-light'}`}
            onClick={() => {
              setGoods('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
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
