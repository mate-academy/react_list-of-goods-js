import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function sortByAlphabet(goodsList) {
    return goodsList.sort((a, b) => a.localeCompare(b));
  }

  function sortByLength(goodsList) {
    return goodsList.sort((a, b) => a.length - b.length);
  }

  function reverseGoods(goodsList) {
    return goodsList.reverse();
  }

  if (sortType === 'alphabetically') {
    sortByAlphabet(visibleGoods);
  }

  if (sortType === 'length') {
    sortByLength(visibleGoods);
  }

  if (isReversed) {
    reverseGoods(visibleGoods);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setSortType('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType === '' && !isReversed) || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
