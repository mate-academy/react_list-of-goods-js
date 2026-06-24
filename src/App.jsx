import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortButtons, SortType } from './SortButtons/SortButtons';
import { GoodsList } from './GoogsList/GoodsList';
import { getSortedGoods } from './GetSortedGoods/GetSortedGoods';

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
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortType, isReversed);

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <SortButtons
        sortType={sortType}
        isReversed={isReversed}
        onSort={setSortType}
        onReverse={() => setIsReversed(prev => !prev)}
        onReset={handleReset}
      />

      <GoodsList goods={visibleGoods} />
    </div>
  );
  // <div className="section content">
  //   <div className="buttons">
  //     <button type="button" className="button is-info is-light">
  //       Sort alphabetically
  //     </button>

  //     <button type="button" className="button is-success is-light">
  //       Sort by length
  //     </button>

  //     <button type="button" className="button is-warning is-light">
  //       Reverse
  //     </button>

  //     <button type="button" className="button is-danger is-light">
  //       Reset
  //     </button>
  //   </div>

  //   <ul>
  //     <li data-cy="Good">Dumplings</li>
  //     <li data-cy="Good">Carrot</li>
  //     <li data-cy="Good">Eggs</li>
  //     <li data-cy="Good">Ice cream</li>
  //     <li data-cy="Good">Apple</li>
  //     <li data-cy="Good">...</li>
  //   </ul>
  // </div>
};
