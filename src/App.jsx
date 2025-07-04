import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodList from './components/GoodList/GoodList';

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
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlph = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setSort('alp');
    setVisibleGoods(sorted);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted.reverse();
    }

    setSort('len');
    setVisibleGoods(sorted);
  };

  const reverseArray = () => {
    const base = [...goodsFromServer];

    if (sort === 'alp') {
      base.sort((a, b) => a.localeCompare(b));
    } else if (sort === 'len') {
      base.sort((a, b) => a.length - b.length);
    }

    const reversed = isReversed ? base : base.reverse();

    setIsReversed(!isReversed);
    setVisibleGoods(reversed);
  };

  const reset = () => {
    setSort('');
    setIsReversed(false);
    setVisibleGoods(goodsFromServer);
  };

  const isModified =
    JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sort === 'alp' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sort === 'len' ? 'button is-success' : 'button is-success is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={reverseArray}
        >
          Reverse
        </button>

        {isModified && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <GoodList goodsFromServer={visibleGoods} />
    </div>
  );
};
