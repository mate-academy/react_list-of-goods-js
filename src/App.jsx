import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const [isReverse, setIsReverse] = useState(false);

  const applySorting = (type, reversed) => {
    let sortedGoods  = [...goodsFromServer];
    if (type === 'alphabet'){
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }
    if (type === 'length'){
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
    }
    if (reversed) {
      sortedGoods.reverse();
    }
    setVisibleGoods(sortedGoods);
  }

  const sortAlphabetically  = () => {
    applySorting('alphabet', isReverse);
    setActiveSort('alphabet');
  };

  const sortByLength = () => {
    applySorting('length', isReverse)
    setActiveSort('length');
  };

  const reverseGoods = () => {
    const next = !isReverse;
    setIsReverse(next);
    applySorting(activeSort, next);
  };

  const resetGoods = () => {
    setVisibleGoods (
    goodsFromServer
    )
    setActiveSort(null);
    setIsReverse(false);
  };


  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className={cn('button is-info',{'is-light' : activeSort !== 'alphabet'})} onClick={sortAlphabetically}>
          Sort alphabetically
        </button>

        <button type="button" className={cn('button is-success',{'is-light' : activeSort !== 'length'})} onClick={sortByLength}> 
          Sort by length
        </button>

        <button type="button" className={cn('button is-warning',{'is-light' : isReverse !== true})} onClick={reverseGoods}>
          Reverse
        </button>

        {(activeSort !== null || isReverse === true)  && <button type="button" className={cn('button is-danger')} onClick={resetGoods}>
          Reset
        </button>}
      </div>

      <ul>
        {visibleGoods.map(good => (
      <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
}