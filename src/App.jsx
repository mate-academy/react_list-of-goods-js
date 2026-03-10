import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Good } from './components/Good';

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
  const [sortedGoods, setSortedGoods] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);

  let visibleGoods = [...goodsFromServer];

  const sortGoods = () => {
    return [...goodsFromServer].sort((good1, good2) => {
      switch (sortedGoods) {
        case 'alp':
          return good1.localeCompare(good2);
        case 'len':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  };

  const resetGoods = () => {
    setSortedGoods('');
    setReverseGoods('');
  };

  if (sortedGoods) {
    visibleGoods = sortGoods();
  }

  if (reverseGoods) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedGoods === 'alp' ? '' : 'is-light'}`}
          onClick={() => setSortedGoods('alp')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedGoods === 'len' ? '' : 'is-light'}`}
          onClick={() => setSortedGoods('len')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseGoods ? '' : 'is-light'}`}
          onClick={() => setReverseGoods(!reverseGoods)}
        >
          Reverse
        </button>

        {sortedGoods || reverseGoods ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetGoods()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>{' '}
    </div>
  );
};
