import { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { SORT_BY } from './constants/sortBy';
import { ProductList } from './components/ProductList';
import { Buttons } from './components/Buttons';

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

let sortedGoods = [...goodsFromServer];

const getPreperedData = (goods, sortedBy, set) => {
  const preperedGoods = [...goodsFromServer];

  if (sortedBy === SORT_BY.REVERSE_A || sortedBy === SORT_BY.REVERSE_B) {
    return sortedGoods.reverse();
  }

  if (sortedBy !== '') {
    sortedGoods = preperedGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SORT_BY.ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortedBy === '') {
    sortedGoods = [...goodsFromServer];

    return sortedGoods;
  }

  return preperedGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const goods = getPreperedData(goodsFromServer, sortedBy);

  return (
    <div className="section content">
      <Buttons
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />

      <ProductList goods={goods} />
    </div>
  );
};
