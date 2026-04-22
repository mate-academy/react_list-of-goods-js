import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodsList';
import { SortTypes } from './constants/sortTypes';
import { getVisibleGoods } from './helpers/getVisibleGoods';

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

const initialGoods = goodsFromServer.map((name, idx) => ({ idx, name }));

export const App = () => {
  const [sortBy, setSortBy] = useState(SortTypes.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const updateIsReversed = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortBy(SortTypes.NONE);
    setIsReversed(false);
  };

  let visibleGoods = [...initialGoods];

  visibleGoods = getVisibleGoods(visibleGoods, { sortBy, isReversed });

  const hasChanges = sortBy !== SortTypes.NONE || isReversed;

  return (
    <GoodList
      goods={visibleGoods}
      sortBy={sortBy}
      isReversed={isReversed}
      onSort={setSortBy}
      onReverse={updateIsReversed}
      onReset={reset}
      hasChanges={hasChanges}
    />
  );
};
