import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodsList } from './Components/GoodsList';

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

const LENGTH = 'length';
const ALPHABETICAL = 'alphabetical';

const sortGoods = (goods, sortType, reverseFlag) => {
  goods.sort((goodA, goodB) => {
    switch (sortType) {
      default:
        return 0;
      case ALPHABETICAL:
        return goodA.localeCompare(goodB);
      case LENGTH:
        return goodA.length - goodB.length;
    }
  });

  if (reverseFlag) {
    goods.reverse();
  }
};

export const App = () => {
  const currentGoods = [...goodsFromServer];
  const [sorting, setSorting] = useState('');
  const [reverseFlag, setReverseFlag] = useState(false);

  const resetGoods = () => {
    setSorting('');
    setReverseFlag(false);
  };

  sortGoods(currentGoods, sorting, reverseFlag);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sorting !== ALPHABETICAL,
          })}
          onClick={() => setSorting(ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sorting !== LENGTH,
          })}
          onClick={() => setSorting(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseFlag,
          })}
          onClick={() => setReverseFlag(!reverseFlag)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={{
            visibility: sorting !== '' || reverseFlag
              ? 'visible'
              : 'hidden',
          }}
          onClick={resetGoods}
        >
          Reset
        </button>
      </div>
      <GoodsList goods={currentGoods} />
    </div>
  );
};
