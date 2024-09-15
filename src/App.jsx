import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { SortingButtons } from './components/SortingButtons';

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
  const visibleGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(visibleGoods);
  const [sortType, setSortType] = useState({ type: '', direction: 'straight' });

  const sortGoods = type => {
    let sortedGoods = [];

    switch (type) {
      case 'alphabet':
        if (sortType.direction === 'reversed') {
          sortedGoods = [...goods].sort((a, b) => b.localeCompare(a));
        } else {
          sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
        }

        break;
      case 'length':
        if (sortType.direction === 'reversed') {
          sortedGoods = [...goods].sort((a, b) => b.length - a.length);
        } else {
          sortedGoods = [...goods].sort((a, b) => a.length - b.length);
        }

        break;
      default:
        break;
    }

    setGoods(sortedGoods);
    setSortType({
      ...sortType,
      type,
    });
  };

  const revSort = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setSortType({
      ...sortType,
      direction: sortType.direction === 'straight' ? 'reversed' : 'straight',
    });
  };

  const resetSort = () => {
    setGoods(visibleGoods);
    setSortType({
      type: '',
      direction: 'straight',
    });
  };

  return (
    <div className="section content">
      <SortingButtons
        sortGoods={sortGoods}
        sortType={sortType}
        revSort={revSort}
        resetSort={resetSort}
      />
      <GoodsList goods={goods} />
    </div>
  );
};
