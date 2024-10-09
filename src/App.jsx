import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/goodsList/goodsList';

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

function getSorted(obj, way) {
  const currentGoods = [...obj];

  currentGoods.sort((el1, el2) => {
    switch (way) {
      case 'is-info':
        return el1.localeCompare(el2);
      case 'is-success':
        return el1.length - el2.length;
      default:
        return 0;
    }
  });

  return currentGoods;
}

export const App = () => {
  const [selectItem, setSelectItem] = useState('');
  const [selReverse, setselReverse] = useState('');
  const goods = getSorted(goodsFromServer, selectItem);

  function reset() {
    setselReverse('');
    setSelectItem('');
  }

  if (selReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectItem === 'is-info' ? null : 'is-light'}`}
          onClick={() => setSelectItem('is-info')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectItem === 'is-success' ? null : 'is-light'}`}
          onClick={() => setSelectItem('is-success')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${selReverse === 'is-warning' ? null : 'is-light'}`}
          onClick={() =>
            selReverse ? setselReverse('') : setselReverse('is-warning')
          }
        >
          Reverse
        </button>

        {(selectItem || selReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
