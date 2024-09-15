import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

import {
  RESET_VALUE,
  SORT_BY_LENGTH,
  SORT_BY_NAME,
  REVERSE,
} from './variables';
import { Buttons } from './components/Buttons';
import { Goods } from './components/Goods';

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

function sortGoods(goods, { sortBy: criteria, reverse }) {
  let sortedGoods;

  switch (true) {
    case criteria === SORT_BY_NAME:
      sortedGoods = goods.toSorted((a, b) => a.localeCompare(b));
      break;
    case criteria === SORT_BY_LENGTH:
      sortedGoods = goods.toSorted((a, b) => a.length - b.length);
      break;

    default:
      sortedGoods = [...goods];
  }

  if (reverse) {
    sortedGoods = sortedGoods.toReversed();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(RESET_VALUE);
  const [reverse, setReversed] = useState(REVERSE);

  const sortedGoods = sortGoods(goodsFromServer, { sortBy, reverse });

  return (
    <div className="section content">
      <Buttons
        sortBy={sortBy}
        onSort={setSortBy}
        reverse={reverse}
        onReverse={setReversed}
      />

      <Goods goods={sortedGoods} />
    </div>
  );
};
