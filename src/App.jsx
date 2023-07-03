import 'bulma/css/bulma.css';
import { useState } from 'react';

import './App.scss';
import { SORT_FIELD } from './constants';
import { GoodList } from './components/GoodList';
import { SortPanel } from './components/SortPanel';

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

const getPreparedGoods = (goods, { sortField, isReverse }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabet':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <SortPanel sortPanelData={{
        SORT_FIELD,
        sortField,
        isReverse,
        setSortField,
        setIsReverse,
      }}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
