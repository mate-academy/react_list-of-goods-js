import 'bulma/css/bulma.css';
import { useState } from 'react';

import './App.scss';
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
  const [curGoods, setCurGoods] = useState(goodsFromServer);
  const [activeClass, setActiveClass] = useState(false);

  const toggler = () => (
    setActiveClass(!activeClass)
  );

  const sortByName = () => {
    setCurGoods(
      [...curGoods].sort((a, b) => a.localeCompare(b)),
    );
    toggler();
  };

  const sortByLength = () => {
    setCurGoods(
      [...curGoods].sort((a, b) => a.length - b.length),
    );
    toggler();
  };

  const reversed = () => {
    setCurGoods(
      [...curGoods].reverse(),
    );
    toggler();
  };

  const reset = () => {
    setCurGoods(goodsFromServer);
    toggler();
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={`button is-info ${activeClass ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-succsess ${activeClass ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reversed}
          type="button"
          className={`button is-warning ${!activeClass ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        <button
          onClick={reset}
          type="button"
          className={`button is-danger ${activeClass ? '' : 'is-light'}`}
        >
          Reset
        </button>
      </div>

      <GoodList goods={curGoods} />
    </div>
  );
};
