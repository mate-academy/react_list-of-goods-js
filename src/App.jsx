import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

import { SortButtons } from './components/SortButtons/SortButtons';
import { GoodList } from './components/GoodList/GoodList';

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

  return (
    <div className="section content">
      <SortButtons
        visibleGoods={visibleGoods}
        setVisibleGoods={setVisibleGoods}
        goods={goodsFromServer}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
