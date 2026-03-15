import { useState } from 'react';
import cn from 'classnames';

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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [curentSort, setCurentSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const applySort = (sort, reversed) => {
    let result = [...goodsFromServer];

    if (sort === 'alphabet') {
      result.sort((good1, good2) => good1.localeCompare(good2));
    } else if (sort === 'length') {
      result.sort((good1, good2) => good1.length - good2.length);
    }

    if (reversed) {
      result.reverse();
    }

    setGoods(result);
  };

   const handleAlphabet = () => {
    setCurentSort('alphabet');
    applySort('alphabet', isReversed);
   };
  
  const handleLength = () => {
    setCurentSort('length');
    applySort('length', isReversed);
  };

  const handleReverse = () => {
    setIsReversed(prev => {
      const next = !prev;
      applySort(curentSort, next);
      return next;
    });
  };
  
  const handleReset = () => {
    setCurentSort('');
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };
 
  
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': curentSort !== 'alphabet',
          })}
          onClick={handleAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': curentSort !== 'length',
          })}
          onClick={handleLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {goods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': false,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
