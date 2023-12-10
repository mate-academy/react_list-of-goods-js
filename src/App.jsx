import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Buttons } from './components/Buttons';
import { GoodList } from './components/GoodList';
import { ORDER, DIRECTION } from './constants';

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

const prepareGoods = (goods, sortOrder, sortDirection) => {
  const goodsCopy = [...goods];

  switch (sortOrder) {
    case ORDER.ALPHABETICALLY:
      goodsCopy.sort((next, prev) => next.localeCompare(prev));
      break;
    case ORDER.BY_LENGTH:
      goodsCopy.sort((next, prev) => next.length - prev.length);
      break;
    default:
      break;
  }

  if (sortDirection === DIRECTION.OPPOSITE) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [order, setOrder] = useState(ORDER.BY_DEFAULT);
  const [direction, setDirection] = useState(DIRECTION.DIRECTLY);

  const switchDirection = () => {
    setDirection(
      direction === DIRECTION.DIRECTLY
        ? DIRECTION.OPPOSITE
        : DIRECTION.DIRECTLY,
    );
  };

  const resetSortSettings = () => {
    setOrder(ORDER.BY_DEFAULT);
    setDirection(DIRECTION.DIRECTLY);
  };

  const preparedGoods = prepareGoods(
    goodsFromServer, order, direction,
  );

  return (
    <div className="section content">
      <Buttons
        sortAlphabetically={() => setOrder(ORDER.ALPHABETICALLY)}
        sortByLength={() => setOrder(ORDER.BY_LENGTH)}
        reverse={() => switchDirection()}
        reset={() => resetSortSettings()}
        order={order}
        direction={direction}
      />
      <GoodList goods={preparedGoods} />
    </div>
  );
};
